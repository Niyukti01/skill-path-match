-- Add login tracking to profiles table
ALTER TABLE public.profiles 
ADD COLUMN last_login_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN login_count INTEGER DEFAULT 0,
ADD COLUMN last_login_ip TEXT,
ADD COLUMN last_user_agent TEXT;

-- Create login_sessions table for detailed tracking
CREATE TABLE public.login_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  login_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address TEXT,
  user_agent TEXT,
  device_info JSONB
);

-- Enable RLS on login_sessions
ALTER TABLE public.login_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for login_sessions (admin only)
CREATE POLICY "Admin can view all login sessions" 
ON public.login_sessions 
FOR SELECT 
USING (public.is_admin(auth.uid()));

CREATE POLICY "System can insert login sessions" 
ON public.login_sessions 
FOR INSERT 
WITH CHECK (true);

-- Update the handle_new_user function to include login tracking
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (
    user_id, 
    user_type, 
    name, 
    email,
    user_role,
    last_login_at,
    login_count
  )
  VALUES (
    new.id,
    COALESCE((new.raw_user_meta_data ->> 'user_type')::public.user_type, 'student'),
    COALESCE(new.raw_user_meta_data ->> 'name', 'User'),
    new.email,
    'user',
    now(),
    1
  );
  RETURN new;
END;
$$;

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
  WHERE user_id = user_uuid;
  
  -- Insert login session record
  INSERT INTO public.login_sessions (user_id, ip_address, user_agent, device_info)
  VALUES (user_uuid, ip_addr, user_agent_str, device_data);
END;
$$;

-- Enable realtime for profiles table
ALTER TABLE public.profiles REPLICA IDENTITY FULL;
ALTER TABLE public.login_sessions REPLICA IDENTITY FULL;