-- Fix the user registration issue by creating the missing trigger
-- and updating the handle_new_user function

-- First, update the handle_new_user function to properly handle user metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert into profiles with proper user_type handling
  INSERT INTO public.profiles (
    id,
    user_id, 
    user_type, 
    name, 
    email,
    role,
    created_at
  )
  VALUES (
    new.id,  -- Use the auth user id as profile id
    new.id,  -- Also store as user_id for reference
    COALESCE((new.raw_user_meta_data ->> 'user_type')::text, 'student'),
    COALESCE(new.raw_user_meta_data ->> 'name', 'User'),
    new.email,
    'user',  -- Default role is 'user', not 'admin'
    now()
  );
  
  -- Log the successful signup
  INSERT INTO public.communication_log (
    user_id,
    type,
    content,
    status,
    created_at
  )
  VALUES (
    new.id,
    'signup',
    'User profile created: ' || COALESCE(new.raw_user_meta_data ->> 'name', 'User') || ' (' || new.email || ')',
    'success',
    now()
  );
  
  RETURN new;
EXCEPTION WHEN OTHERS THEN
  -- Log any errors during profile creation
  INSERT INTO public.communication_log (
    user_id,
    type,
    content,
    status,
    created_at
  )
  VALUES (
    new.id,
    'signup_error',
    'Failed to create profile: ' || SQLERRM,
    'failed',
    now()
  );
  
  -- Re-raise the exception to prevent user creation if profile creation fails
  RAISE;
END;
$$;

-- Create the missing trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Fix existing users who don't have profiles
INSERT INTO public.profiles (
  id,
  user_id,
  user_type,
  name,
  email,
  role,
  created_at
)
SELECT 
  au.id,
  au.id,
  COALESCE((au.raw_user_meta_data ->> 'user_type')::text, 'student'),
  COALESCE(au.raw_user_meta_data ->> 'name', 'User'),
  au.email,
  'user',
  au.created_at
FROM auth.users au
LEFT JOIN public.profiles p ON p.id = au.id
WHERE p.id IS NULL;

-- Ensure the profiles table has the correct structure
ALTER TABLE IF EXISTS public.profiles 
  ALTER COLUMN user_type SET DEFAULT 'student',
  ALTER COLUMN role SET DEFAULT 'user',
  ALTER COLUMN name SET DEFAULT 'User';

-- Add index for better performance on user lookups
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_user_type ON public.profiles(user_type);