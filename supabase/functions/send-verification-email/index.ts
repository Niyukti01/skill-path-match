import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface VerificationEmailRequest {
  email: string;
  name: string;
  code: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name, code }: VerificationEmailRequest = await req.json();

    console.log(`Sending verification email to ${email} with code ${code}`);

    const emailResponse = await resend.emails.send({
      from: "InternLink <noreply@resend.dev>",
      to: [email],
      subject: "Your InternLink Verification Code",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
            .verification-code { background: white; border: 2px solid #667eea; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; }
            .code { font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 8px; font-family: 'Courier New', monospace; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to InternLink!</h1>
              <p>Connecting students with amazing internship opportunities</p>
            </div>
            <div class="content">
              <h2>Hello ${name}!</h2>
              <p>Thank you for signing up for InternLink. To complete your registration, please verify your email address using the 6-digit code below:</p>
              
              <div class="verification-code">
                <p><strong>Your 6-digit verification code:</strong></p>
                <div class="code">${code}</div>
              </div>
              
              <p><strong>Important:</strong></p>
              <ul style="margin: 16px 0; padding-left: 20px;">
                <li>Enter this code on the verification page to activate your account</li>
                <li>This code expires in 10 minutes for security</li>
                <li>Keep this code confidential - don't share it with anyone</li>
              </ul>
              
              <p>If you didn't create an account with InternLink, please ignore this email or contact support.</p>
              
              <div style="margin-top: 30px; padding: 20px; background: #f0f0f0; border-radius: 8px; border-left: 4px solid #667eea;">
                <p style="margin: 0; font-size: 14px; color: #555;">
                  <strong>Trouble receiving emails?</strong><br>
                  • Check your spam/junk folder<br>
                  • Add noreply@resend.dev to your contacts<br>
                  • Make sure ${email} is correct
                </p>
              </div>
            </div>
            <div class="footer">
              <p>© 2024 InternLink - Connecting talent with opportunity</p>
              <p style="font-size: 12px; color: #999; margin-top: 10px;">
                This email was sent to ${email}. If you believe this was sent in error, please ignore this message.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Verification email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-verification-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);