import 'dotenv/config';
import { generateToken, verifyToken } from '../src/token.js';
import { sendEmail } from '../src/mailer.js';

// Example email address
const email = process.env.TEST_EMAIL || 'user@example.com';

// Generate a verification token and send email
const token = generateToken(email);
console.log('Generated Token:', token);

sendEmail(email, token)
    .then(() => console.log('Verification email sent successfully!'))
    .catch((error) => console.error('Error sending verification email:', error));

// Example token verification
const userInfo = verifyToken(token);
if (userInfo) {
    console.log('Token verified. User info:', userInfo);
} else {
    console.error('Token verification failed');
}
