import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: any | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: any) => Promise<{ error: any; user?: User }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const isAdmin = profile?.role === 'admin';

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user profile after auth state change
          setTimeout(async () => {
            try {
              const { data: profileData } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
              setProfile(profileData);
            } catch (error) {
              console.error('Error fetching profile:', error);
            }
          }, 0);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // Fetch user profile for existing session
        setTimeout(async () => {
          try {
            const { data: profileData } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
            setProfile(profileData);
          } catch (error) {
            console.error('Error fetching profile:', error);
          }
          setLoading(false);
        }, 0);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: userData.name,
            user_type: userData.userType
          }
        }
      });

      if (error) {
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive"
        });
        return { error };
      }

      if (data.user) {
        // Log successful signup
        await supabase.rpc('log_communication_event', {
          p_user_id: data.user.id,
          p_type: 'signup',
          p_content: `User signed up: ${userData.name} (${email})`,
          p_status: 'success'
        });

        toast({
          title: "Account created successfully!",
          description: "You can now sign in with your credentials."
        });

        return { error: null, user: data.user };
      }

      return { error };
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive"
      });
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        // Provide more helpful error messages
        let errorMessage = "Incorrect email or password. Please try again.";
        
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = "Incorrect email or password. Please try again.";
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = "Please verify your email address before signing in.";
        } else if (error.message.includes('Too many requests')) {
          errorMessage = "Too many login attempts. Please wait a moment and try again.";
        }
        
        toast({
          title: "Sign in failed",
          description: errorMessage,
          variant: "destructive"
        });

        // Log failed login attempt
        try {
          const { data: userData } = await supabase.from('profiles').select('id').eq('email', email).single();
          if (userData) {
            await supabase.rpc('log_communication_event', {
              p_user_id: userData.id,
              p_type: 'login_attempt',
              p_content: `Failed login attempt for ${email}`,
              p_status: 'failed'
            });
          }
        } catch (logError) {
          console.error('Error logging failed login:', logError);
        }
      } else {
        // Success - track login details and log event
        setTimeout(async () => {
          try {
            const { data } = await supabase.auth.getUser();
            if (data.user) {
              // Update login tracking
              await supabase.rpc('update_login_details', {
                user_uuid: data.user.id,
                ip_addr: null, // IP will be captured server-side if needed
                user_agent_str: navigator.userAgent,
                device_data: {
                  platform: navigator.platform,
                  language: navigator.language,
                  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
                }
              });

              // Log successful login
              await supabase.rpc('log_communication_event', {
                p_user_id: data.user.id,
                p_type: 'login',
                p_content: `Successful login for ${email}`,
                p_status: 'success'
              });

              toast({
                title: "Login successful",
                description: "Redirecting to your dashboard...",
              });
            }
          } catch (trackingError) {
            console.error('Error tracking login:', trackingError);
          }
        }, 0);
      }

      return { error };
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setProfile(null);
      toast({
        title: "Signed out successfully"
      });
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      loading,
      signUp,
      signIn,
      signOut,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};