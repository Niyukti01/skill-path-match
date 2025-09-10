import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface TestEmailRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: TestEmailRequest = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email address is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log(`Testing email delivery to ${email}`);

    // Test the Resend API key and email delivery
    const testCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    const emailResponse = await resend.emails.send({
      from: "InternLink <noreply@resend.dev>",
      to: [email],
      subject: "InternLink Email Test - Please Ignore",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
            .test-code { background: white; border: 2px solid #28a745; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; }
            .code { font-size: 32px; font-weight: bold; color: #28a745; letter-spacing: 8px; font-family: 'Courier New', monospace; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📧 Email Delivery Test</h1>
              <p>InternLink Email System Test</p>
            </div>
            <div class="content">
              <h2>✅ Email Delivery Working!</h2>
              <p>If you received this email, your InternLink email system is configured correctly.</p>
              
              <div class="test-code">
                <p><strong>Test Code (ignore this):</strong></p>
                <div class="code">${testCode}</div>
              </div>
              
              <div style="margin-top: 30px; padding: 20px; background: #d4edda; border-radius: 8px; border-left: 4px solid #28a745;">
                <p style="margin: 0; font-size: 14px; color: #155724;">
                  <strong>✅ Email System Status: WORKING</strong><br>
                  • Resend API key is valid<br>
                  • Email delivery is functional<br>
                  • Ready for user signups<br>
                  • Check spam folder if this went there
                </p>
              </div>
              
              <p><strong>Next Steps:</strong></p>
              <ul style="margin: 16px 0; padding-left: 20px;">
                <li>If this email is in spam, add noreply@resend.dev to contacts</li>
                <li>Consider setting up your own domain for better deliverability</li>
                <li>Test user signup flow</li>
              </ul>
            </div>
            <div class="footer">
              <p>© 2024 InternLink - Email Test</p>
              <p style="font-size: 12px; color: #999; margin-top: 10px;">
                This is a test email sent to ${email}. You can safely ignore this message.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Test email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Test email sent successfully! Check your inbox (and spam folder).",
      emailId: emailResponse.data?.id,
      resendResponse: emailResponse
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in test-email function:", error);
    
    let errorMessage = error.message;
    let troubleshooting = "";
    
    if (error.message.includes('401')) {
      errorMessage = "Invalid Resend API key";
      troubleshooting = "Please update your RESEND_API_KEY in Supabase secrets";
    } else if (error.message.includes('403') || error.message.includes('400')) {
      errorMessage = "Email address not verified or rate limit exceeded";  
      troubleshooting = "Check your Resend dashboard for domain verification status";
    }
    
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        troubleshooting: troubleshooting,
        fullError: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);