-- ============================================
-- CRITICAL SECURITY: Proper Role Management
-- ============================================

-- 1. Create enum for roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- 2. Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role public.app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    UNIQUE (user_id, role)
);

-- 3. Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 4. Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role_v2(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- 5. Create helper function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin_v2(user_uuid UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role_v2(user_uuid, 'admin'::app_role);
$$;

-- 6. RLS Policies for user_roles table
CREATE POLICY "Users can view own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
USING (public.is_admin_v2(auth.uid()));

CREATE POLICY "System can insert roles"
ON public.user_roles
FOR INSERT
WITH CHECK (true);

-- 7. Migrate existing role data from profiles to user_roles
INSERT INTO public.user_roles (user_id, role)
SELECT 
  user_id, 
  CASE 
    WHEN role = 'admin' THEN 'admin'::app_role 
    ELSE 'user'::app_role 
  END as role
FROM public.profiles
WHERE user_id IS NOT NULL
ON CONFLICT (user_id, role) DO NOTHING;

-- 8. Update handle_new_user function to create user_role entry
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert into profiles
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
    new.id,
    new.id,
    COALESCE((new.raw_user_meta_data ->> 'user_type')::text, 'student'),
    COALESCE(new.raw_user_meta_data ->> 'name', 'User'),
    new.email,
    'user',
    '',
    '',
    '',
    '',
    now()
  );
  
  -- Create user role entry (default to 'user')
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new.id, 'user'::app_role)
  ON CONFLICT (user_id, role) DO NOTHING;
  
  -- Log successful signup
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
  RAISE;
END;
$$;

-- 9. Update RLS policies on profiles to use new role system
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
USING (public.is_admin_v2(auth.uid()));

-- 10. Add index for performance
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON public.user_roles(role);