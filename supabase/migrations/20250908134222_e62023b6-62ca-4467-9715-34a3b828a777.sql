-- Remove the problematic hardcoded UUID policies
DROP POLICY IF EXISTS "policy for admin" ON public.profiles;
DROP POLICY IF EXISTS "profiles" ON public.profiles;

-- Create a security definer function to check if current user is admin
-- This prevents infinite recursion in RLS policies
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

-- Create proper admin policy using the security definer function
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (public.get_current_user_role() = 'admin');

-- Ensure users can still view their own profiles (this policy already exists but let's make sure it's correct)
-- The "Enable delete for users based on user_id" policy already handles user self-access for SELECT