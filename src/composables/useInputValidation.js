// src/composables/useInputValidation.js
import { ref, watch } from 'vue';
import {
    validateEmail,
    validatePassword,
    validateName
} from '../utils/validation';

export function useInputValidation({
    email,
    password,
    confirmPassword,
    firstName,
    lastName
}) {
    const emailError = ref('');
    const passwordError = ref('');
    const firstNameError = ref('');
    const lastNameError = ref('');
    const confirmPasswordError = ref('');

    watch(email, (val) => {
        emailError.value =
            val && !validateEmail(val) ? 'Enter a valid email address.' : '';
    });
    watch(password, (val) => {
        passwordError.value =
            val && !validatePassword(val)
                ? 'Password must be at least 6 characters and include a letter and a number.'
                : '';
        confirmPasswordError.value =
            confirmPassword.value && val !== confirmPassword.value
                ? 'Passwords do not match.'
                : '';
    });
    watch(confirmPassword, (val) => {
        confirmPasswordError.value =
            val && val !== password.value ? 'Passwords do not match.' : '';
    });
    watch(firstName, (val) => {
        firstNameError.value =
            val && !validateName(val) ? 'Enter a valid first name.' : '';
    });
    watch(lastName, (val) => {
        lastNameError.value =
            val && !validateName(val) ? 'Enter a valid last name.' : '';
    });

    return {
        emailError,
        passwordError,
        firstNameError,
        lastNameError,
        confirmPasswordError
    };
}
