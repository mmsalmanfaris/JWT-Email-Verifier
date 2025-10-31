export function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

export function isNonEmptyString(str) {
    return typeof str === 'string' && str.trim().length > 0;
}