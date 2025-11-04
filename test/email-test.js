import 'dotenv/config';
import { sendVerificationEmail, verifyEmailToken } from '../src/index.js';

console.log('\n🧪 Email Verification Test\n');
console.log('==========================\n');

// Get test email from environment or use default
const testEmail = 'mmsalmanfaris@outlook.com';

console.log(`📧 Test Email: ${testEmail}`);
console.log(`🔧 SMTP Host: ${process.env.SMTP_HOST}`);
console.log(`🔗 Base URL: ${process.env.BASE_URL}\n`);

async function runTest() {
    try {
        // Step 1: Send verification email
        console.log('📤 Step 1: Sending verification email...');
        const token = await sendVerificationEmail(testEmail);
        console.log('✅ Email sent successfully!');
        console.log(`🔑 Token: ${token.substring(0, 50)}...\n`);

        // Step 2: Verify the token
        console.log('🔍 Step 2: Verifying token...');
        const decoded = verifyEmailToken(token);
        console.log('✅ Token verified!');
        console.log(`📧 Email: ${decoded.email}`);
        console.log(`⏰ Expires: ${new Date(decoded.exp * 1000).toLocaleString()}\n`);

        console.log('🎉 All tests passed!\n');
        console.log('📬 Check your inbox at:', testEmail);
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        process.exit(1);
    }
}

runTest();
