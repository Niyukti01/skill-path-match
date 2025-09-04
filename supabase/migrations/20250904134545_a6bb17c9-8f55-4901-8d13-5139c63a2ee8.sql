-- Clean up conflicting functions and policies
DROP FUNCTION IF EXISTS public.log_user_login() CASCADE;
DROP TRIGGER IF EXISTS log_user_login_trigger ON auth.users;

-- Drop existing policies that might conflict
DROP POLICY IF EXISTS "Users can view their own login records" ON public.user_logins;
DROP POLICY IF EXISTS "System can insert login records" ON public.user_logins;

-- Ensure RLS is enabled
ALTER TABLE public.user_logins ENABLE ROW LEVEL SECURITY;

-- Create proper RLS policies for user_logins
CREATE POLICY "Enable select for own records" 
ON public.user_logins 
FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Enable insert for authenticated users" 
ON public.user_logins 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- Fix the profiles table - add missing columns and fix the is_admin function
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS user_id uuid;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS user_type text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS name text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS user_role text DEFAULT 'user';

-- Update the is_admin function to use the correct column names
CREATE OR REPLACE FUNCTION public.is_admin(user_uuid uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_uuid AND role = 'admin'
  );
$$;

-- Create trigger for new user creation if it doesn't exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();