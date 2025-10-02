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

-- Drop all existing policies on profiles
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Companies can view student profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can delete own profile" ON public.profiles;

-- Recreate profiles policies with proper access control
CREATE POLICY "Users can view own profile" ON public.profiles
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
FOR SELECT USING (get_current_user_role() = 'admin');

CREATE POLICY "Companies can view student profiles" ON public.profiles
FOR SELECT USING (
  is_company(auth.uid()) AND user_type = 'student'
);

CREATE POLICY "Users can insert own profile" ON public.profiles
FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can delete own profile" ON public.profiles
FOR DELETE USING (auth.uid() = id);

-- Drop existing user_logins policies
DROP POLICY IF EXISTS "Users can view own login history" ON public.user_logins;
DROP POLICY IF EXISTS "Admins can view all login history" ON public.user_logins;
DROP POLICY IF EXISTS "System can insert login records" ON public.user_logins;
DROP POLICY IF EXISTS "Companies can view student login history" ON public.user_logins;

-- Recreate user_logins policies
CREATE POLICY "Users can view own login history" ON public.user_logins
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all login history" ON public.user_logins
FOR SELECT USING (get_current_user_role() = 'admin');

CREATE POLICY "Companies can view student login history" ON public.user_logins
FOR SELECT USING (
  is_company(auth.uid()) AND user_type = 'student'
);

CREATE POLICY "System can insert login records" ON public.user_logins
FOR INSERT WITH CHECK (true);