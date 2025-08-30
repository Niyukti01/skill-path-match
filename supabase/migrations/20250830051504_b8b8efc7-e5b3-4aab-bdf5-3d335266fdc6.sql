-- First, let's make id a primary key if it isn't already
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE table_name = 'profiles' AND constraint_type = 'PRIMARY KEY'
  ) THEN
    ALTER TABLE public.profiles ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);
  END IF;
END $$;

-- Add login tracking to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS login_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_login_ip TEXT,
ADD COLUMN IF NOT EXISTS last_user_agent TEXT;

-- Create login_sessions table for detailed tracking
CREATE TABLE IF NOT EXISTS public.login_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  login_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address TEXT,
  user_agent TEXT,
  device_info JSONB
);

-- Enable RLS on login_sessions if not already enabled
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'login_sessions'
  ) THEN
    ALTER TABLE public.login_sessions ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Drop policies if they exist and recreate them
DROP POLICY IF EXISTS "Admin can view all login sessions" ON public.login_sessions;
DROP POLICY IF EXISTS "System can insert login sessions" ON public.login_sessions;

-- Create policies for login_sessions (admin only)
CREATE POLICY "Admin can view all login sessions" 
ON public.login_sessions 
FOR SELECT 
USING (public.is_admin(auth.uid()));

CREATE POLICY "System can insert login sessions" 
ON public.login_sessions 
FOR INSERT 
WITH CHECK (true);

-- Create function to update login details
CREATE OR REPLACE FUNCTION public.update_login_details(
  user_uuid UUID,
  ip_addr TEXT DEFAULT NULL,
  user_agent_str TEXT DEFAULT NULL,
  device_data JSONB DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Update profiles table
  UPDATE public.profiles 
  SET 
    last_login_at = now(),
    login_count = COALESCE(login_count, 0) + 1,
    last_login_ip = COALESCE(ip_addr, last_login_ip),
    last_user_agent = COALESCE(user_agent_str, last_user_agent)
  WHERE id = user_uuid;
  
  -- Insert login session record
  INSERT INTO public.login_sessions (user_id, ip_address, user_agent, device_info)
  VALUES (user_uuid, ip_addr, user_agent_str, device_data);
END;
$$;