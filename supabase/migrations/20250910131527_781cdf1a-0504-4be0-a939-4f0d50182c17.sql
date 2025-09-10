-- Fix critical security vulnerability in communication_log table
-- Remove hardcoded UUID policy and implement proper user-specific access control

-- Drop the problematic hardcoded policy
DROP POLICY IF EXISTS "communication" ON public.communication_log;

-- Create proper user-specific RLS policies
CREATE POLICY "Users can view their own communication logs" 
ON public.communication_log 
FOR SELECT 
USING (auth.uid() = user_id);

-- Allow admins to view all communication logs for administrative purposes
CREATE POLICY "Admins can view all communication logs" 
ON public.communication_log 
FOR SELECT 
USING (get_current_user_role() = 'admin');

-- Allow system to insert communication logs (for automated logging)
CREATE POLICY "System can insert communication logs" 
ON public.communication_log 
FOR INSERT 
WITH CHECK (true);

-- Allow users to insert their own communication logs
CREATE POLICY "Users can insert their own communication logs" 
ON public.communication_log 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);