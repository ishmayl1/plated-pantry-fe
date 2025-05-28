// src/utils/validation.js

export function validateEmail(email) {
    // RFC 5322 Official Standard
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
        email
    );
}

export function validatePassword(password) {
    // At least 6 chars, must include a letter and a number
    return /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(password);
}

export function validateName(name) {
    // Letters, spaces, hyphens, apostrophes, 2+ chars
    return /^[A-Za-z\s'-]{2,}$/.test(name);
}
