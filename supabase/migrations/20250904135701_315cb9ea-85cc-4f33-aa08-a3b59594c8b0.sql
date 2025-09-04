-- Create verification_codes table for email verification
CREATE TABLE public.verification_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  code TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '15 minutes'),
  used BOOLEAN NOT NULL DEFAULT false
);

-- Enable RLS
ALTER TABLE public.verification_codes ENABLE ROW LEVEL SECURITY;

-- Create policies for verification codes
CREATE POLICY "Users can view their own verification codes" 
ON public.verification_codes 
FOR SELECT 
USING (auth.uid()::text = user_id::text);

CREATE POLICY "System can insert verification codes" 
ON public.verification_codes 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "System can update verification codes" 
ON public.verification_codes 
FOR UPDATE 
USING (true);

-- Create index for better performance
CREATE INDEX idx_verification_codes_user_id ON public.verification_codes(user_id);
CREATE INDEX idx_verification_codes_code ON public.verification_codes(code);

-- Add helper function to generate verification codes
CREATE OR REPLACE FUNCTION public.generate_verification_code()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
END;
$$;