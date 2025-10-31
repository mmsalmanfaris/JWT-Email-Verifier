import jwt from 'jsonwebtoken';
import config from './config.js';

export function generateToken(email) {
    if (!config.jwtSecret) {
        throw new Error('JWT_SECRET is not set. Set process.env.JWT_SECRET before calling generateToken.');
    }

    const payload = { email };
    return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiration });
}

export function verifyToken(token) {
    if (!config.jwtSecret) {
        throw new Error('JWT_SECRET is not set. Set process.env.JWT_SECRET before calling verifyToken.');
    }

    // let jwt.throw if invalid
    const decoded = jwt.verify(token, config.jwtSecret);
    return decoded;
}