-- Fix the profiles table structure and create the trigger properly

-- First, make the profiles table more flexible by allowing nulls for optional fields
-- or providing defaults for required fields
ALTER TABLE public.profiles 
  ALTER COLUMN skills SET DEFAULT '',
  ALTER COLUMN goals SET DEFAULT '',
  ALTER COLUMN requirements SET DEFAULT '',
  ALTER COLUMN industry SET DEFAULT '';

-- Update existing null values
UPDATE public.profiles 
SET 
  skills = COALESCE(skills, ''),
  goals = COALESCE(goals, ''),
  requirements = COALESCE(requirements, ''),
  industry = COALESCE(industry, '')
WHERE skills IS NULL OR goals IS NULL OR requirements IS NULL OR industry IS NULL;

-- Now update the handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert into profiles with all required fields
  INSERT INTO public.profiles (
    id,
    user_id, 
    user_type, 
    name, 
    email,
    role,
    skills,
    goals,
    requirements,
    industry,
    created_at
  )
  VALUES (
    new.id,  -- Use the auth user id as profile id
    new.id,  -- Also store as user_id for reference
    COALESCE((new.raw_user_meta_data ->> 'user_type')::text, 'student'),
    COALESCE(new.raw_user_meta_data ->> 'name', 'User'),
    new.email,
    'user',  -- Default role is 'user'
    '',      -- Empty skills initially
    '',      -- Empty goals initially  
    '',      -- Empty requirements initially
    '',      -- Empty industry initially
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
  skills,
  goals,
  requirements,
  industry,
  created_at
)
SELECT 
  au.id,
  au.id,
  COALESCE((au.raw_user_meta_data ->> 'user_type')::text, 'student'),
  COALESCE(au.raw_user_meta_data ->> 'name', 'User'),
  au.email,
  'user',
  '',  -- Empty skills
  '',  -- Empty goals
  '',  -- Empty requirements
  '',  -- Empty industry
  au.created_at
FROM auth.users au
LEFT JOIN public.profiles p ON p.id = au.id
WHERE p.id IS NULL;