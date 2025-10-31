const parseBoolean = (v, fallback = false) => {
    if (typeof v === 'undefined') return fallback;
    return String(v).toLowerCase() === 'true';
};

// cPanel commonly provides SMTP on ports 465 (secure) or 587 (STARTTLS)
const defaultPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 465;

const config = {
    // jwtSecret intentionally left undefined if not set — callers must validate
    jwtSecret: process.env.JWT_SECRET || null,
    // default token lifetime for verification tokens
    jwtExpiration: process.env.JWT_EXPIRATION || '10m',
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    nodemailer: {
        host: process.env.SMTP_HOST || null,
        port: defaultPort,
        secure: parseBoolean(process.env.SMTP_SECURE, defaultPort === 465),
        auth: {
            user: process.env.SMTP_USER || null,
            pass: process.env.SMTP_PASS || null,
        },
    },
};

export default config;