-- Enable real-time updates for the tables we want to monitor
ALTER TABLE public.profiles REPLICA IDENTITY FULL;
ALTER TABLE public.user_logins REPLICA IDENTITY FULL;

-- Add tables to the realtime publication to enable real-time subscriptions
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_logins;