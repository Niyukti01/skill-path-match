-- Update profiles table to ensure it has all required fields
ALTER TABLE public.profiles 
  ALTER COLUMN role SET NOT NULL,
  ALTER COLUMN name SET NOT NULL,
  ALTER COLUMN email SET NOT NULL,
  ALTER COLUMN user_type SET NOT NULL;

-- Update profiles table to set default role if not already set
UPDATE public.profiles 
SET role = 'user' 
WHERE role IS NULL OR role = '';

UPDATE public.profiles 
SET name = 'User' 
WHERE name IS NULL OR name = '';

-- Ensure user_logins table has the right structure for tracking
DROP TABLE IF EXISTS public.user_logins;
CREATE TABLE public.user_logins (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  email text NOT NULL,
  role text NOT NULL,
  user_type text NOT NULL,
  login_time timestamp with time zone NOT NULL DEFAULT now(),
  ip_address text,
  user_agent text
);

-- Enable RLS on user_logins
ALTER TABLE public.user_logins ENABLE ROW LEVEL SECURITY;

-- Create policies for user_logins
CREATE POLICY "Users can view own login history" 
ON public.user_logins 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all login history" 
ON public.user_logins 
FOR SELECT 
USING (get_current_user_role() = 'admin');

CREATE POLICY "System can insert login records" 
ON public.user_logins 
FOR INSERT 
WITH CHECK (true);

-- Update the handle_user_login function to work with simplified auth
CREATE OR REPLACE FUNCTION public.handle_user_login()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Update profiles table with login info
  UPDATE public.profiles 
  SET 
    last_login_at = NOW(),
    login_count = COALESCE(login_count, 0) + 1
  WHERE user_id = NEW.id;
  
  -- Insert into user_logins table with role and user_type
  INSERT INTO public.user_logins (user_id, email, role, user_type, login_time)
  SELECT NEW.id, NEW.email, p.role, p.user_type, NOW()
  FROM public.profiles p 
  WHERE p.user_id = NEW.id;
  
  RETURN NEW;
END;
$$;

-- Create trigger for login tracking
DROP TRIGGER IF EXISTS on_auth_user_login ON auth.users;
CREATE TRIGGER on_auth_user_login
  AFTER UPDATE OF last_sign_in_at ON auth.users
  FOR EACH ROW
  WHEN (OLD.last_sign_in_at IS DISTINCT FROM NEW.last_sign_in_at)
  EXECUTE FUNCTION public.handle_user_login();

-- Create function to get user statistics
CREATE OR REPLACE FUNCTION public.get_user_statistics()
RETURNS TABLE(
  total_students bigint,
  total_companies bigint,
  total_users bigint,
  students_today bigint,
  companies_today bigint,
  logins_today bigint
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT 
    (SELECT COUNT(*) FROM public.profiles WHERE user_type = 'student') as total_students,
    (SELECT COUNT(*) FROM public.profiles WHERE user_type = 'company') as total_companies,
    (SELECT COUNT(*) FROM public.profiles) as total_users,
    (SELECT COUNT(*) FROM public.profiles WHERE user_type = 'student' AND created_at >= CURRENT_DATE) as students_today,
    (SELECT COUNT(*) FROM public.profiles WHERE user_type = 'company' AND created_at >= CURRENT_DATE) as companies_today,
    (SELECT COUNT(*) FROM public.user_logins WHERE login_time >= CURRENT_DATE) as logins_today;
$$;

-- Create function to get recent login activity
CREATE OR REPLACE FUNCTION public.get_recent_logins(days_back integer DEFAULT 7)
RETURNS TABLE(
  login_date date,
  student_logins bigint,
  company_logins bigint,
  total_logins bigint
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT 
    DATE(login_time) as login_date,
    COUNT(*) FILTER (WHERE user_type = 'student') as student_logins,
    COUNT(*) FILTER (WHERE user_type = 'company') as company_logins,
    COUNT(*) as total_logins
  FROM public.user_logins 
  WHERE login_time >= CURRENT_DATE - INTERVAL '1 day' * days_back
  GROUP BY DATE(login_time)
  ORDER BY login_date DESC;
$$;