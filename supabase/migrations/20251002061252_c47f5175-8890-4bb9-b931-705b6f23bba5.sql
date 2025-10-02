-- Create a function to check if user is a company
CREATE OR REPLACE FUNCTION public.is_company(user_uuid uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_uuid AND user_type = 'company'
  );
$$;

-- Update profiles RLS policies to allow companies to see students
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
FOR SELECT USING (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles" ON public.profiles
FOR SELECT USING (get_current_user_role() = 'admin');

-- Companies can view student profiles
CREATE POLICY "Companies can view student profiles" ON public.profiles
FOR SELECT USING (
  is_company(auth.uid()) AND user_type = 'student'
);

-- Students can only view their own profile (already covered by first policy)

-- Update user_logins policies for better access control
DROP POLICY IF EXISTS "Users can view own login history" ON public.user_logins;
DROP POLICY IF EXISTS "Admins can view all login history" ON public.user_logins;

CREATE POLICY "Users can view own login history" ON public.user_logins
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all login history" ON public.user_logins
FOR SELECT USING (get_current_user_role() = 'admin');

CREATE POLICY "Companies can view student login history" ON public.user_logins
FOR SELECT USING (
  is_company(auth.uid()) AND user_type = 'student'
);