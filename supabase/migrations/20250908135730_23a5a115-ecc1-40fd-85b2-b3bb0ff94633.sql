-- Update OTP expiry from 15 minutes to 10 minutes
ALTER TABLE public.verification_codes ALTER COLUMN expires_at SET DEFAULT (now() + '00:10:00'::interval);

-- Add function to log communication events
CREATE OR REPLACE FUNCTION public.log_communication_event(
  p_user_id uuid,
  p_type text,
  p_content text,
  p_status text DEFAULT 'success'
)
RETURNS void AS $$
BEGIN
  INSERT INTO public.communication_log (user_id, type, content, status, created_at)
  VALUES (p_user_id, p_type, p_content, p_status, now());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;