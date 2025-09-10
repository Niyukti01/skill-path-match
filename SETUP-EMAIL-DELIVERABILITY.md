# InternLink Email Deliverability Setup Guide

## Overview
Your InternLink app currently uses a custom OTP (6-digit code) system with Resend for email delivery. This guide ensures reliable email delivery to Gmail and other providers.

## Current Status ✅
- ✅ Custom OTP system is already implemented (not using Supabase magic links)
- ✅ Resend integration is configured  
- ✅ Edge function `send-verification-email` is deployed
- ✅ Database tables are properly set up

## What You Need to Do

### 1. Verify Your Resend API Key ⚠️ CRITICAL
1. Go to [Resend API Keys](https://resend.com/api-keys)
2. Create a new API key if needed
3. Copy the key and update it in Supabase:
   - Go to: https://supabase.com/dashboard/project/agtwvazyopjxvlaxkzct/settings/functions
   - Update the `RESEND_API_KEY` secret with your valid key

### 2. Set Up Your Own Domain (Recommended) 📧
For maximum deliverability, use your own domain instead of `resend.dev`:

#### Domain Setup in Resend:
1. Go to [Resend Domains](https://resend.com/domains)
2. Click "Add Domain" 
3. Enter your domain (e.g., `internlink.com`)
4. Resend will provide DNS records to add:

#### DNS Records to Add (at your domain registrar):
```dns
# SPF Record (TXT)
Domain: internlink.com
Type: TXT  
Value: v=spf1 include:spf.resend.com ~all

# DKIM Records (CNAME) - Resend provides exact values
Domain: resend._domainkey.internlink.com
Type: CNAME
Value: [provided by Resend]

Domain: resend2._domainkey.internlink.com  
Type: CNAME
Value: [provided by Resend]

# DMARC Record (Optional but recommended)
Domain: _dmarc.internlink.com
Type: TXT
Value: v=DMARC1; p=quarantine; rua=mailto:postmaster@internlink.com; pct=100
```

#### Update Email Address:
Once domain is verified, update the edge function:
```typescript
from: "InternLink <noreply@internlink.com>",
```

### 3. Alternative: Use Resend's Default Domain (Quick Fix)
If you don't have your own domain yet, ensure you're using a verified Resend address:
- Current: `noreply@resend.dev` ✅ (should work)
- Alternative: `onboarding@resend.dev` ✅

### 4. Test Email Delivery 🧪
Use the test function (see below) to verify emails are working before user signups.

## Troubleshooting Common Issues

### Gmail Not Receiving Emails:
1. **Check Spam Folder** - Most common issue
2. **Domain Verification** - Ensure your domain shows "Verified" in Resend
3. **API Key** - Invalid key causes 401 errors
4. **Rate Limits** - Resend free tier: 100 emails/day, 3000/month

### Edge Function Errors:
- Check function logs: https://supabase.com/dashboard/project/agtwvazyopjxvlaxkzct/functions/send-verification-email/logs
- Common errors:
  - `401 Unauthorized` = Invalid API key
  - `400 Bad Request` = From address not verified
  - `429 Too Many Requests` = Rate limit exceeded

### User Not Getting Verification Codes:
1. Check if edge function is being called (logs)
2. Verify Resend API key is valid
3. Check domain verification status
4. Look for spam filtering

## DNS Propagation Time
- **SPF/DKIM records**: 5-15 minutes typically
- **Full propagation**: Up to 48 hours maximum  
- **Test with**: `dig TXT internlink.com` or online DNS checker

## Production Checklist
- [ ] Valid Resend API key configured
- [ ] Domain verified in Resend (if using custom domain)
- [ ] DNS records added and propagated
- [ ] Test email sent successfully
- [ ] Spam folder checked
- [ ] Rate limits understood (100/day free tier)

## Support Resources
- [Resend Documentation](https://resend.com/docs)
- [DNS Checker Tool](https://dnschecker.org/)
- [Supabase Edge Function Logs](https://supabase.com/dashboard/project/agtwvazyopjxvlaxkzct/functions/send-verification-email/logs)

---

**Next Steps**: Follow the setup above, then test with the `test-email` function to verify everything works before user signups.