import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AlertCircle, CheckCircle, Mail } from "lucide-react";

export const EmailTest = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
    emailId?: string;
  } | null>(null);
  const { toast } = useToast();

  const testEmailDelivery = async () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter an email address to test",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setTestResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('test-email', {
        body: { email }
      });

      if (error) {
        throw error;
      }

      setTestResult({
        success: true,
        message: data.message,
        emailId: data.emailId
      });

      toast({
        title: "Test email sent!",
        description: "Check your inbox (and spam folder). If you received the email, the system is working correctly.",
      });
    } catch (error: any) {
      console.error('Email test error:', error);
      
      let errorMessage = "Failed to send test email";
      let troubleshooting = "";
      
      if (error.message?.includes('Invalid API key') || error.context?.json?.error?.includes('401')) {
        errorMessage = "Invalid Resend API key";
        troubleshooting = "Please update RESEND_API_KEY in Supabase secrets";
      } else if (error.context?.json?.troubleshooting) {
        troubleshooting = error.context.json.troubleshooting;
      }

      setTestResult({
        success: false,
        message: `${errorMessage}${troubleshooting ? ': ' + troubleshooting : ''}`
      });

      toast({
        title: "Test failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Email System Test
        </CardTitle>
        <CardDescription>
          Test if your InternLink email delivery is working properly
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Enter your email to test"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>
        
        <Button 
          onClick={testEmailDelivery} 
          disabled={isLoading || !email}
          className="w-full"
        >
          {isLoading ? "Sending Test Email..." : "Send Test Email"}
        </Button>

        {testResult && (
          <div className={`p-4 rounded-lg border ${
            testResult.success 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <div className="flex items-center gap-2">
              {testResult.success ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600" />
              )}
              <span className="flex-1 text-sm">
                {testResult.message}
              </span>
            </div>
            {testResult.emailId && (
              <p className="text-xs mt-2 opacity-75">
                Email ID: {testResult.emailId}
              </p>
            )}
          </div>
        )}

        <div className="text-xs text-muted-foreground space-y-1">
          <p><strong>What this tests:</strong></p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Resend API key validity</li>
            <li>Email delivery to your inbox</li>
            <li>Spam filtering behavior</li>
          </ul>
          <p className="mt-2">
            <strong>If test fails:</strong> Check the setup guide for DNS configuration and API key issues.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};