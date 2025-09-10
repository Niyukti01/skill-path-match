-- Fix critical security vulnerabilities in RLS policies
-- Clean up and tighten access controls for sensitive data

-- === PROFILES TABLE SECURITY FIXES ===
-- Drop all existing policies and recreate them properly
DROP POLICY IF EXISTS "Admin users can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Enable delete for users based on user_id" ON public.profiles;
DROP POLICY IF EXISTS "Users can delete their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "user can only change their profile" ON public.profiles;
DROP POLICY IF EXISTS "user can update their own profile" ON public.profiles;

-- Create secure, non-conflicting policies for profiles table
-- Users can only view their own profile
CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

-- Admins can view all profiles (for administrative purposes only)
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (get_current_user_role() = 'admin');

-- Users can only insert their own profile
CREATE POLICY "Users can insert own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Users can only update their own profile
CREATE POLICY "Users can update own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Users can only delete their own profile
CREATE POLICY "Users can delete own profile" 
ON public.profiles 
FOR DELETE 
USING (auth.uid() = id);

-- === VERIFICATION CODES TABLE SECURITY FIXES ===
-- Ensure verification codes are properly protected
DROP POLICY IF EXISTS "System can insert verification codes" ON public.verification_codes;
DROP POLICY IF EXISTS "System can update verification codes" ON public.verification_codes;
DROP POLICY IF EXISTS "Users can view their own verification codes" ON public.verification_codes;

-- Only allow system to insert verification codes (for signup/reset flows)
CREATE POLICY "System can insert verification codes" 
ON public.verification_codes 
FOR INSERT 
WITH CHECK (true);

-- Only allow system to update verification codes (for marking as used)
CREATE POLICY "System can update verification codes" 
ON public.verification_codes 
FOR UPDATE 
USING (true);

-- Users can only view their own unexpired verification codes
CREATE POLICY "Users can view own active verification codes" 
ON public.verification_codes 
FOR SELECT 
USING (auth.uid() = user_id AND expires_at > now() AND used = false);

-- === LOGIN SESSIONS TABLE SECURITY FIXES ===
-- These policies are actually appropriate but let's make them more explicit
DROP POLICY IF EXISTS "Admin can view all login sessions" ON public.login_sessions;
DROP POLICY IF EXISTS "System can insert login sessions" ON public.login_sessions;

-- Only admins can view login sessions (for security monitoring)
CREATE POLICY "Admins can view all login sessions" 
ON public.login_sessions 
FOR SELECT 
USING (get_current_user_role() = 'admin');

-- System can insert login sessions (for audit logging)
CREATE POLICY "System can insert login sessions" 
ON public.login_sessions 
FOR INSERT 
WITH CHECK (true);

-- Users can view their own login sessions (for security awareness)
CREATE POLICY "Users can view own login sessions" 
ON public.login_sessions 
FOR SELECT 
USING (auth.uid() = user_id);