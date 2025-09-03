-- First, let me check if there are any problematic triggers or functions related to user_logins
-- and create a proper function to handle login tracking

-- Create or replace a function to handle user login tracking
CREATE OR REPLACE FUNCTION public.handle_user_login()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert into user_logins table when user signs in
  INSERT INTO public.user_logins (user_id, email, login_time)
  VALUES (NEW.id, NEW.email, NOW())
  ON CONFLICT DO NOTHING;
  
  -- Update profiles table with login info if profile exists
  UPDATE public.profiles 
  SET 
    login_count = COALESCE(login_count, 0) + 1,
    last_login_at = NOW()
  WHERE id = NEW.id;
  
  RETURN NEW;
END;
$$;

-- Remove any existing problematic triggers
DROP TRIGGER IF EXISTS on_auth_user_login ON auth.users;

-- Create a new, safe trigger for login tracking
CREATE TRIGGER on_auth_user_login
  AFTER UPDATE OF last_sign_in_at ON auth.users
  FOR EACH ROW
  WHEN (OLD.last_sign_in_at IS DISTINCT FROM NEW.last_sign_in_at)
  EXECUTE FUNCTION public.handle_user_login();

-- Also ensure we have proper RLS policies for user_logins
ALTER TABLE public.user_logins ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_logins
CREATE POLICY "Users can view their own login records"
ON public.user_logins
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "System can insert login records"
ON public.user_logins
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Add missing UPDATE and DELETE policies for profiles table
CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can delete their own profile"
ON public.profiles
FOR DELETE
TO authenticated
USING (auth.uid() = id);