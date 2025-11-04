# Email Testing

Simple test script to verify email functionality works correctly.

## Quick Test

```bash
npm run test:email
```

This will:
1. Send a verification email to the test address
2. Generate and verify a JWT token
3. Display the results

## Configuration

The test uses your `.env` file settings:

- `TEST_EMAIL` - Where to send test emails (optional, defaults to test@example.com)
- `JWT_SECRET` - For token generation
- `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` - For sending emails

## Example Output

```
🧪 Email Verification Test

📧 Test Email: your@email.com
🔧 SMTP Host: mail.example.com
🔗 Base URL: http://localhost:3000

📤 Step 1: Sending verification email...
✅ Email sent successfully!
🔑 Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

🔍 Step 2: Verifying token...
✅ Token verified!
📧 Email: your@email.com
⏰ Expires: 11/4/2025, 10:30:00 AM

🎉 All tests passed!

📬 Check your inbox at: your@email.com
```

## Add Test Email (Optional)

Add this to your `.env` file:

```env
TEST_EMAIL=your-real-email@example.com
```

If not set, it defaults to `test@example.com`.
