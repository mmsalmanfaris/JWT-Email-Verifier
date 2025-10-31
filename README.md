# JWT Email Verifier

[![npm version](https://img.shields.io/npm/v/jwt-email-verifier.svg)](https://www.npmjs.com/package/jwt-email-verifier)
[![npm downloads](https://img.shields.io/npm/dm/jwt-email-verifier.svg)](https://www.npmjs.com/package/jwt-email-verifier)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/jwt-email-verifier.svg)](https://nodejs.org)
[![GitHub repo](https://img.shields.io/badge/github-repo-blue.svg)](https://github.com/mmsalmanfaris/JWT-Email-Verifier)

A lightweight, secure email verification library for Node.js that uses JWT (JSON Web Tokens) for token generation and Nodemailer for sending verification emails.

## ✨ Features

- 🔐 **Secure JWT Tokens** - Generate cryptographically secure verification tokens
- 📧 **Easy Email Sending** - Built-in Nodemailer integration for hassle-free email delivery
- 🎨 **Customizable Templates** - Supports both HTML and plain text email formats
- ⚡ **Simple API** - Just two functions to handle the entire verification flow
- 🛡️ **Token Validation** - Automatic token expiration and signature verification
- 🔧 **Flexible Configuration** - Environment variable-based setup

---

## 📦 Installation

```bash
npm install jwt-email-verifier
```

---

## 🚀 Quick Start

### Step 1: Set Up Environment Variables

Create a `.env` file in your project root with the following configuration:

```env
# JWT Configuration
JWT_SECRET=your_super_secret_key_min_32_characters
JWT_EXPIRATION=10m

# Application Base URL
BASE_URL=http://localhost:3000

# SMTP Configuration (Email Server)
SMTP_HOST=mail.example.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=noreply@example.com
SMTP_PASS=your_email_password
```

> **Note:** For Gmail, use `smtp.gmail.com` with an [App Password](https://support.google.com/accounts/answer/185833). For cPanel hosting, typically use `mail.yourdomain.com` on port 465 (SSL) or 587 (TLS).

### Step 2: Load Environment Variables

**Option A: Using dotenv (Recommended for development)**

```javascript
import 'dotenv/config';  // Add this at the very top of your entry file
import { sendVerificationEmail, verifyEmailToken } from 'jwt-email-verifier';
```

**Option B: Set environment variables in production**

In production environments (like Heroku, AWS, etc.), set environment variables through your hosting platform's dashboard.

### Step 3: Use the Library

```javascript
import { sendVerificationEmail, verifyEmailToken } from 'jwt-email-verifier';

// Send verification email
async function registerUser(email) {
    try {
        // This sends an email and returns the token
        const token = await sendVerificationEmail(email);
        console.log('Verification email sent successfully!');
        // Note: Token is embedded in the email link, no need to store it
        return token;
    } catch (error) {
        console.error('Failed to send verification email:', error.message);
    }
}

// Verify the token when user clicks the link
function verifyUser(token) {
    try {
        const decoded = verifyEmailToken(token);
        console.log('Email verified for:', decoded.email);
        // Mark user as verified in your database
        return decoded;
    } catch (error) {
        console.error('Token verification failed:', error.message);
        // Handle expired or invalid token
    }
}
```

---

## 📚 Complete Usage Example

Here's a complete example with an Express.js server:

```javascript
import express from 'express';
import 'dotenv/config';
import { 
    sendVerificationEmail, 
    verifyEmailToken,
} from 'jwt-email-verifier';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

// Registration endpoint
app.post('/register', async (req, res) => {
    const { email } = req.body;
    
    try {
        const token = await sendVerificationEmail(email);
        // Token is sent via email, no need to store it in database
        res.json({ 
            success: true, 
            message: 'Verification email sent! Check your inbox.' 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Verification endpoint (user clicks link in email)
app.get('/verify', async (req, res) => {
    const { token } = req.query;
    
    try {
        const decoded = verifyEmailToken(token);
        // Update user verification status in database
        
        // Send success confirmation email

    } catch (error) {
        // Determine the reason for failure
        const reason = error.name === 'TokenExpiredError' ? 'expired' : 'invalid';
        
        // Extract email from token if possible (for expired tokens)
        let email = null;
        if (error.name === 'TokenExpiredError') {
            try {
                const decoded = jwt.decode(token);
                email = decoded?.email;
            } catch (e) {
                // Could not decode token
            }
        }
        
        // Send failure notification if we have the email

    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
```

---

## 🔧 API Reference

### `sendVerificationEmail(email)`

Generates a JWT token and sends a verification email to the specified address.

**Parameters:**
- `email` (string) - The email address to send the verification link to

**Returns:**
- `Promise<string>` - The generated JWT token

**Throws:**
- `Error` if `JWT_SECRET` is not configured
- `Error` if SMTP configuration is incomplete
- `Error` if email sending fails

**Example:**
```javascript
const token = await sendVerificationEmail('user@example.com');
```

---

### `verifyEmailToken(token)`

Verifies a JWT token and returns the decoded payload.

**Parameters:**
- `token` (string) - The JWT token to verify

**Returns:**
- `Object` - The decoded token payload containing `{ email: string }`

**Throws:**
- `Error` if `JWT_SECRET` is not configured
- `JsonWebTokenError` if token is invalid
- `TokenExpiredError` if token has expired

**Example:**
```javascript
try {
    const decoded = verifyEmailToken(token);
    console.log(decoded.email); // 'user@example.com'
} catch (error) {
    if (error.name === 'TokenExpiredError') {
        console.log('Token expired, please request a new one');
    }
}
```

---

## ⚙️ Configuration Options

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `JWT_SECRET` | ✅ Yes | - | Secret key for signing tokens (min 32 characters recommended) |
| `JWT_EXPIRATION` | No | `10m` | Token expiration time (e.g., `10m`, `1h`, `7d`) |
| `BASE_URL` | No | `http://localhost:3000` | Base URL for verification links |
| `SMTP_HOST` | ✅ Yes | - | SMTP server hostname |
| `SMTP_PORT` | No | `465` | SMTP server port |
| `SMTP_SECURE` | No | `true` | Use SSL/TLS (`true` for port 465, `false` for 587) |
| `SMTP_USER` | ✅ Yes | - | SMTP username (usually your email) |
| `SMTP_PASS` | ✅ Yes | - | SMTP password or app-specific password |

---

## 🎨 Email Templates

The library includes default email templates, but you can customize them by modifying the template files in your installed package:

- **HTML Template**: `node_modules/jwt-email-verifier/src/templates/verification.html`
- **Text Template**: `node_modules/jwt-email-verifier/src/templates/verification.txt`

The verification link is automatically generated as: `${BASE_URL}/verify?token=${token}`

---

## 🔒 Security Best Practices

1. **Strong JWT Secret**: Use a random, complex secret at least 32 characters long
2. **Short Expiration**: Keep token expiration short (e.g., 10-30 minutes)
3. **HTTPS Only**: Always use HTTPS in production for `BASE_URL`
4. **Environment Variables**: Never commit `.env` files to version control
5. **Token Storage**: JWT tokens are self-contained and sent via email - no database storage needed
6. **Rate Limiting**: Implement rate limiting on verification endpoints

---

## 🚧 Roadmap & Future Updates

We're constantly working to improve `jwt-email-verifier`! Here's what's planned:

###  Core Improvements
- [ ] **TypeScript Support** - Full TypeScript rewrite or `.d.ts` type definitions for better IDE autocompletion
- [ ] **Express Middleware** - `verifyEmailRoute()` middleware for one-line token verification
- [ ] **Custom Templates** - Allow developers to pass custom HTML files or inline templates
- [ ] **Enhanced Error Handling** - Meaningful error codes and detailed error messages
- [ ] **Test Coverage** - Comprehensive tests with Jest or Vitest
- [ ] **Code Quality** - Prettier + ESLint for consistent code style

###  Integrations & Adapters
- [ ] **Framework Adapters** - Native support for NestJS, Fastify, Koa
- [ ] **Email Providers** - Support for SendGrid, AWS SES, Mailgun, Postmark
- [ ] **Multi-language Templates** - Internationalization (i18n) for email content
- [ ] **Callback Hooks** - Optional `onEmailSent`, `onVerified`, `onError` callbacks
- [ ] **Token Store Options** - Redis or database integration for token revocation

###  Documentation & Examples
- [ ] **Documentation Site** - Dedicated docs site using Docusaurus or VitePress
- [ ] **Video Tutorials** - Step-by-step implementation guides
- [ ] **FAQ Section** - Common questions and solutions

###  Developer Tools
- [ ] **CLI Tool** - `npx jwt-email-verifier init` to quickly generate configuration
- [ ] **GitHub Actions** - Automated lint, test, and publish workflows
- [ ] **Web Dashboard** - Monitor email delivery and verification status (separate project)
- [ ] **Analytics Hooks** - Optional webhook support for tracking metrics

###  Community & Growth
- [ ] **"Good First Issue"** labels for new contributors
- [ ] **Contribution Guide** - Detailed guidelines for contributing (see [CONTRIBUTING.md](CONTRIBUTING.md))
- [ ] **Sponsor Program** - Support ongoing development
- [ ] **Badge System** - Recognition for contributors

Want to contribute? Check out our [Contributing Guide](CONTRIBUTING.md) and help us build these features!

---

## 🐛 Troubleshooting

### Email not sending?

- ✅ Check SMTP credentials are correct
- ✅ For Gmail: Enable 2FA and generate an [App Password](https://support.google.com/accounts/answer/185833)
- ✅ Check firewall/network allows SMTP connections
- ✅ Verify `SMTP_HOST` and `SMTP_PORT` match your provider's settings

### Token verification failing?

- ✅ Ensure `JWT_SECRET` is identical for generating and verifying
- ✅ Check if token has expired (`JWT_EXPIRATION`)
- ✅ Verify the token wasn't modified or corrupted

### "JWT_SECRET is not set" error?

- ✅ Load environment variables before importing the library
- ✅ Use `import 'dotenv/config'` at the very top of your entry file
- ✅ In production, set environment variables through your hosting platform

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! We'd love your help to make this library even better.

Please read our [Contributing Guide](CONTRIBUTING.md) for details on:
- Code of conduct
- Development setup
- How to submit pull requests
- Coding standards and best practices
- Testing requirements

---

## 💬 Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/mmsalmanfaris/JWT-Email-Verifier/issues)
- **npm Package**: [jwt-email-verifier](https://www.npmjs.com/package/jwt-email-verifier)