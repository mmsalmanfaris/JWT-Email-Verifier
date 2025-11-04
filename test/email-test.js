import 'dotenv/config';
import { sendVerificationEmail, verifyEmailToken } from '../src/index.js';

console.log('\n🧪 Email Verification Test\n');
console.log('==========================\n');

// Get test email from environment or use default
const testEmail = process.env.TEST_MAIL;

const args = process.argv.slice(2);
const count = parseInt(args[0] || '1', 20);

console.log(`📧 Test Email: ${testEmail}`);
console.log(`🔧 SMTP Host: ${process.env.SMTP_HOST}`);
console.log(`🔗 Base URL: ${process.env.BASE_URL}`);
console.log(`🔢 Number of emails to send: ${count}\n`);

async function sendSingleEmail(index) {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`📨 Email ${index} of ${count}`);
    console.log(`${'='.repeat(50)}\n`);
    
    // Step 1: Send verification email
    console.log('📤 Sending verification email...');
    const startTime = Date.now();
    const token = await sendVerificationEmail(testEmail);
    const duration = Date.now() - startTime;
    
    console.log(`✅ Email sent in ${duration}ms`);
    console.log(`🔑 Token: ${token.substring(0, 50)}...\n`);

    // Step 2: Verify the token
    console.log('🔍 Verifying token...');
    const decoded = verifyEmailToken(token);
    console.log('✅ Token verified!');
    console.log(`📧 Email: ${decoded.email}`);
    console.log(`⏰ Expires: ${new Date(decoded.exp * 1000).toLocaleString()}`);
    
    return { token, decoded, duration };
}

async function runTest() {
    const results = [];
    let successCount = 0;
    let failCount = 0;
    const startTime = Date.now();
    
    try {
        for (let i = 1; i <= count; i++) {
            try {
                const result = await sendSingleEmail(i);
                results.push(result);
                successCount++;
                
                // Add delay between emails to avoid rate limiting (if sending multiple)
                if (i < count) {
                    const delay = 1000; // 1 second delay
                    console.log(`\n⏱️  Waiting ${delay}ms before next email...\n`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            } catch (error) {
                console.error(`❌ Email ${i} failed:`, error.message);
                failCount++;
            }
        }
        
        const totalTime = Date.now() - startTime;
        
        // Summary
        console.log(`\n${'='.repeat(50)}`);
        console.log(`📊 Test Summary`);
        console.log(`${'='.repeat(50)}\n`);
        console.log(`✅ Successful: ${successCount}/${count}`);
        console.log(`❌ Failed: ${failCount}/${count}`);
        console.log(`⏱️  Total time: ${(totalTime / 1000).toFixed(2)}s`);
        
        if (successCount > 0) {
            const avgTime = results.reduce((sum, r) => sum + r.duration, 0) / results.length;
            console.log(`⚡ Average time per email: ${avgTime.toFixed(0)}ms`);
        }
        
        console.log(`\n📬 Check your inbox at: ${testEmail}`);
        
        if (failCount > 0) {
            process.exit(1);
        }
        
    } catch (error) {
        console.error('\n❌ Test suite failed:', error.message);
        process.exit(1);
    }
}

runTest();
