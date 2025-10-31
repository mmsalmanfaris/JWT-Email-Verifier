import { sendEmail } from './mailer.js';
import { generateToken, verifyToken } from './token.js';

export async function sendVerificationEmail(email) {
    const token = generateToken(email);
    await sendEmail(email, token);
    return token;
}

export function verifyEmailToken(token) {
    return verifyToken(token);
}

const defaultExport = { sendVerificationEmail, verifyEmailToken };
export default defaultExport;