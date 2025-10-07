-- ============================================
-- SECURITY FIX: Replace deprecated get_current_user_role() with is_admin_v2()
-- This prevents potential RLS recursion issues
-- ============================================

-- Step 1: Drop policies that depend on get_current_user_role()
DROP POLICY IF EXISTS "Admins can view all communication logs" ON public.communication_log;
DROP POLICY IF EXISTS "Admins can view all login sessions" ON public.login_sessions;
DROP POLICY IF EXISTS "Admins can view all login history" ON public.user_logins;

-- Step 2: Drop the deprecated function
DROP FUNCTION IF EXISTS public.get_current_user_role();

-- Step 3: Recreate policies using is_admin_v2()
CREATE POLICY "Admins can view all communication logs"
ON public.communication_log
FOR SELECT
USING (public.is_admin_v2(auth.uid()));

CREATE POLICY "Admins can view all login sessions"
ON public.login_sessions
FOR SELECT
USING (public.is_admin_v2(auth.uid()));

CREATE POLICY "Admins can view all login history"
ON public.user_logins
FOR SELECT
USING (public.is_admin_v2(auth.uid()));

-- Step 4: Create helper function to check if user is a company (for future use)
CREATE OR REPLACE FUNCTION public.is_company_user(_user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = _user_id
      AND user_type = 'company'
  )
$$;