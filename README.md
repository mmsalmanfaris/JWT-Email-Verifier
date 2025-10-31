# Lightweight Email Verification Library

This project is a lightweight email verification library built with Node.js, utilizing JSON Web Tokens (JWT) for secure token generation and Nodemailer for sending verification emails. 

## Features

- Generate JWT tokens for email verification.
- Send verification emails with customizable templates (HTML and plain text).
- Verify tokens to confirm user email addresses.
- Simple and easy-to-use API.

## Installation

To install the library, clone the repository and run the following command:

```
npm install
```

## Usage

### Example

Here is a basic example of how to use the email verification library (ESM imports):

```javascript
import { sendVerificationEmail, verifyEmailToken } from './src/index.js';

// Send verification email and receive token
const token = await sendVerificationEmail('user@example.com');

// Verify the token
const userInfo = verifyEmailToken(token);
```

Important: the library does not auto-load a `.env` file. Consumers should provide configuration via environment variables or explicitly load dotenv in their application (for local development). For local testing you can run your app with:

```bash
# load .env automatically when running node
node -r dotenv/config your-app.js
```

Or add at the top of your app's entry point (DEV ONLY):

```javascript
import 'dotenv/config';
```

### API

- `generateToken(email)`: Generates a JWT token for the provided email.
- `sendEmail(email, token)`: Sends a verification email to the specified email address containing the verification link.
- `verifyToken(token)`: Verifies the provided token and returns the user information if valid.

## Configuration

You can configure the library by creating a `.env` file based on the `.env.example` template. The configuration includes:

- `JWT_SECRET`: Secret key for signing JWT tokens.
- `JWT_EXPIRATION`: Expiration time for the tokens.
- `BASE_URL`: Base URL for the verification link.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`: SMTP settings. For cPanel-hosted mailboxes use your hosting mail server (often `mail.yourdomain.com`) and port 465 for SSL or 587 for TLS/STARTTLS. See `.env.example`.

Note: `.env.example` is provided in the repository as a reference for developers but it is not included in the published npm package. For publishing, users should create their own `.env` locally or set environment variables in their deployment environment.

Minimal example `.env` (for local dev only):

```
JWT_SECRET=your_strong_jwt_secret_here
JWT_EXPIRATION=10m
BASE_URL=http://localhost:3000
SMTP_HOST=mail.example.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=no-reply@example.com
SMTP_PASS=supersecretpassword
```

## Testing

To run the tests, use the following command:

```
npm test
```

## License

This project is licensed under the MIT License. See the LICENSE file for more details.