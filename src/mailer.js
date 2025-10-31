import nodemailer from 'nodemailer';
import config from './config.js';

export const sendEmail = async (email, token) => {
    const verificationUrl = `${config.baseUrl}/verify?token=${token}`;

    const mailOptions = {
        from: config.nodemailer.auth.user,
        to: email,
        subject: 'Email Verification',
        text: `Please verify your email by clicking on the following link: ${verificationUrl}`,
        html: `<p>Please verify your email by clicking on the following link: <a href="${verificationUrl}">Verify Email</a></p>`
    };

    // In test environment, avoid real SMTP calls and return a mock response
    if (process.env.NODE_ENV === 'test') {
        console.log('Test env: skipping real email send');
        return { accepted: [email] };
    }

    // Validate transporter config before attempting to send
    if (!config.nodemailer.host || !config.nodemailer.auth.user || !config.nodemailer.auth.pass) {
        throw new Error('SMTP configuration is incomplete. Set SMTP_HOST, SMTP_USER and SMTP_PASS in environment.');
    }

    const transporter = nodemailer.createTransport(config.nodemailer);

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Verification email sent successfully');
        return info;
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw error;
    }
};