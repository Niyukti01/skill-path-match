import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { AlertCircle, CheckCircle } from "lucide-react";

const VerifyAccount = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds
  
  const email = searchParams.get("email");
  const name = searchParams.get("name");

  useEffect(() => {
    if (!email) {
      navigate("/auth");
      return;
    }

    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [email, navigate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code.trim() || code.length !== 6) {
      toast({
        title: "Invalid code",
        description: "Please enter a valid 6-digit verification code.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign up again to get a new verification code.",
          variant: "destructive"
        });
        navigate("/auth");
        return;
      }

      // Check verification code
      const { data: verificationData, error: fetchError } = await supabase
        .from('verification_codes')
        .select('*')
        .eq('user_id', user.id)
        .eq('code', code.trim())
        .eq('used', false)
        .gt('expires_at', new Date().toISOString())
        .single();

      if (fetchError || !verificationData) {
        toast({
          title: "Invalid or expired code",
          description: "The verification code is invalid or has expired. Please request a new one.",
          variant: "destructive"
        });
        return;
      }

      // Mark code as used
      const { error: updateError } = await supabase
        .from('verification_codes')
        .update({ used: true })
        .eq('id', verificationData.id);

      if (updateError) {
        console.error('Error marking code as used:', updateError);
        toast({
          title: "Verification failed",
          description: "There was an error processing your verification. Please try again.",
          variant: "destructive"
        });
        return;
      }

      // Update user email confirmation status
      const { error: confirmError } = await supabase.auth.updateUser({
        data: { email_confirmed_at: new Date().toISOString() }
      });

      if (confirmError) {
        console.error('Error confirming email:', confirmError);
      }

      // Log successful verification
      await supabase.rpc('log_communication_event', {
        p_user_id: user.id,
        p_type: 'email_verification',
        p_content: `Email verified successfully for ${email}`,
        p_status: 'success'
      });

      toast({
        title: "Account verified successfully!",
        description: "Welcome to InternLink. Your account is now active.",
      });

      // Redirect to dashboard
      navigate("/dashboard");
      
    } catch (error: any) {
      console.error('Verification error:', error);
      toast({
        title: "Verification failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email || !name) return;
    
    setResendLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign up again to get a verification code.",
          variant: "destructive"
        });
        navigate("/auth");
        return;
      }

      // Generate new verification code
      const { data: newCodeData, error: codeError } = await supabase.rpc('generate_verification_code');
      
      if (codeError || !newCodeData) {
        throw new Error('Failed to generate verification code');
      }

      // Store new code in database (10-minute expiry)
      const { error: insertError } = await supabase
        .from('verification_codes')
        .insert({
          user_id: user.id,
          code: newCodeData,
          expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 minutes from now
        });

      if (insertError) {
        throw insertError;
      }

      // Send verification email
      const { error: emailError } = await supabase.functions.invoke('send-verification-email', {
        body: { email, name, code: newCodeData }
      });

      if (emailError) {
        console.error('Email sending error:', emailError);
        toast({
          title: "Failed to send email",
          description: "Could not send verification code. Please try again or contact support.",
          variant: "destructive"
        });
        return;
      }

      // Log resend event
      await supabase.rpc('log_communication_event', {
        p_user_id: user.id,
        p_type: 'email_verification',
        p_content: `Verification code resent to ${email}`,
        p_status: 'success'
      });

      toast({
        title: "Verification code sent!",
        description: "A new verification code has been sent to your email.",
      });

      // Reset timer
      setTimeLeft(10 * 60);
      
    } catch (error: any) {
      console.error('Error resending code:', error);
      toast({
        title: "Failed to resend code",
        description: "Please try again or contact support if the problem persists.",
        variant: "destructive"
      });
    } finally {
      setResendLoading(false);
    }
  };

  if (!email) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-10 bg-gradient-to-br from-background via-background/95 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="shadow-elegant border-border/50">
              <CardHeader className="text-center pb-2">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <AlertCircle className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold">Verify Your Account</CardTitle>
                <CardDescription>
                  We've sent a 6-digit verification code to <strong>{email}</strong>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleVerify} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="code">Verification Code</Label>
                    <Input
                      id="code"
                      type="text"
                      placeholder="000000"
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      maxLength={6}
                      className="text-center text-2xl font-mono tracking-widest"
                      required
                    />
                    <div className="text-sm text-muted-foreground text-center">
                      {timeLeft > 0 ? (
                        <span>Code expires in {formatTime(timeLeft)}</span>
                      ) : (
                        <span className="text-destructive">Code has expired</span>
                      )}
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading || timeLeft === 0}>
                    {loading ? (
                      <>
                        <LoadingSpinner className="mr-2 h-4 w-4" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Verify Account
                      </>
                    )}
                  </Button>

                  <div className="text-center space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Didn't receive the code?
                    </p>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleResendCode}
                      disabled={resendLoading || timeLeft > 8 * 60} // Allow resend after 2 minutes
                      className="text-primary hover:text-primary/80"
                    >
                      {resendLoading ? (
                        <>
                          <LoadingSpinner className="mr-2 h-4 w-4" />
                          Sending...
                        </>
                      ) : (
                        "Resend Code"
                      )}
                    </Button>
                  </div>

                  <div className="text-center">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => navigate("/auth")}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Back to Sign In
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VerifyAccount;