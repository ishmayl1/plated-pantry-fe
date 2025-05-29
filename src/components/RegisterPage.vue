<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import AppInput from '@/components/AppInput.vue';
import AppButton from '@/components/AppButton.vue';
import AppIconButton from '@/components/AppIconButton.vue';
import { useInputValidation } from '@/composables/useInputValidation';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const firstName = ref('');
const lastName = ref('');
const acceptedTerms = ref(false);
const loading = ref(false);
const error = ref('');
const success = ref('');
const router = useRouter();
const auth = useAuthStore();

const {
    emailError,
    passwordError,
    firstNameError,
    lastNameError,
    confirmPasswordError
} = useInputValidation({
    email,
    password,
    confirmPassword,
    firstName,
    lastName
});

const isFormValid = computed(() => {
    return (
        firstName.value.trim() &&
        lastName.value.trim() &&
        email.value.trim() &&
        password.value &&
        confirmPassword.value &&
        acceptedTerms.value &&
        !firstNameError.value &&
        !lastNameError.value &&
        !emailError.value &&
        !passwordError.value &&
        !confirmPasswordError.value
    );
});

let submitTimeout = null;

async function handleRegister() {
    if (submitTimeout) {
        clearTimeout(submitTimeout);
    }

    // Debounce the form submission to prevent multiple clicks
    submitTimeout = setTimeout(async () => {
        error.value = '';
        success.value = '';
        // Trim all form values before using them
        const trimmedFirstName = firstName.value.trim();
        const trimmedLastName = lastName.value.trim();
        const trimmedEmail = email.value.trim();
        const trimmedPassword = password.value; // Don't trim password
        const trimmedConfirmPassword = confirmPassword.value; // Don't trim password

        if (trimmedPassword !== trimmedConfirmPassword) {
            error.value = 'Passwords do not match.';
            return;
        }
        loading.value = true;
        const result = await auth.register({
            email: trimmedEmail,
            firstName: trimmedFirstName,
            lastName: trimmedLastName,
            password: trimmedPassword,
            acceptedTerms: acceptedTerms.value
        });
        if (result.success) {
            success.value = 'Account created! You can now log in.';
            setTimeout(() => router.push({ name: 'Login' }), 1200);
        } else {
            error.value = result.error;
        }
        loading.value = false;
    }, 500);
}
</script>

<template>
    <div class="register-container">
        <form @submit.prevent="handleRegister" class="register-form">
            <div class="d-flex align-center justify-start back-btn">
                <AppIconButton @click="router.push({ name: 'Login' })">
                    mdi-arrow-left
                </AppIconButton>
            </div>
            <div class="mb-5">
                <v-avatar
                    size="64"
                    class="mb-2 nav-header-avatar"
                    color="#ffe4e1"
                >
                    <v-icon size="x-large" color="#f57274"
                        >mdi-silverware-variant</v-icon
                    >
                </v-avatar>
                <div
                    class="font-weight-bold text-h6 mt-2 nav-header-title brand-font"
                >
                    Plated Pantry
                </div>
            </div>
            <span class="text-h5 font-weight-bold mb-5"
                >Create Your Account</span
            >
            <div class="form-group">
                <AppInput
                    id="firstName"
                    v-model="firstName"
                    label="First Name"
                    type="text"
                    required
                    autocomplete="given-name"
                    :error="!!firstNameError"
                    :error-messages="firstNameError || undefined"
                />
            </div>
            <div class="form-group">
                <AppInput
                    id="lastName"
                    v-model="lastName"
                    label="Last Name"
                    type="text"
                    required
                    autocomplete="family-name"
                    :error="!!lastNameError"
                    :error-messages="lastNameError || undefined"
                />
            </div>
            <div class="form-group">
                <AppInput
                    id="email"
                    v-model="email"
                    label="Email"
                    type="email"
                    required
                    autocomplete="email"
                    :error="!!emailError"
                    :error-messages="emailError || undefined"
                />
            </div>
            <div class="form-group">
                <AppInput
                    id="password"
                    v-model="password"
                    label="Password"
                    type="password"
                    required
                    autocomplete="new-password"
                    :error="!!passwordError"
                    :error-messages="passwordError || undefined"
                />
            </div>
            <div class="form-group">
                <AppInput
                    id="confirmPassword"
                    v-model="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    required
                    autocomplete="new-password"
                    :error="!!confirmPasswordError"
                    :error-messages="confirmPasswordError || undefined"
                />
            </div>
            <div class="form-group terms-group">
                <label class="terms-label">
                    <input type="checkbox" v-model="acceptedTerms" required />
                    <span
                        >I accept the
                        <a href="#" target="_blank">Terms of Service</a></span
                    >
                </label>
            </div>
            <v-divider class="mt-5"></v-divider>
            <AppButton type="submit" :disabled="loading || !isFormValid">
                {{ loading ? 'Creating...' : 'Create Account' }}
            </AppButton>
            <p v-if="error" class="error">{{ error }}</p>
            <p v-if="success" class="success">{{ success }}</p>
        </form>
    </div>
</template>

<style scoped lang="scss">
.register-container {
    min-height: 100vh;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}
.register-form {
    background: var(--color-surface);
    color: var(--color-text);
    border-radius: 20px;
    padding: 2rem 2.5rem;
    min-width: 320px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    box-shadow:
        0 4px 24px 0 rgba(40, 40, 60, 0.12),
        0 1.5px 4px 0 rgba(40, 40, 60, 0.08);
    width: 100%;
    max-width: 400px;
    align-items: stretch;
    position: relative;
}
.back-btn {
    position: absolute;
    top: 1.2rem;
    left: 1.2rem;
    z-index: 2;
}
.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    align-items: stretch;
    width: 100%;
    max-width: 100%;
}
button {
    background: var(--color-primary);
    color: var(--color-background);
    border: none;
    border-radius: 4px;
    padding: 0.7em 1.2em;
    font-size: 1em;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
}
button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}
.error {
    color: #d32f2f;
    font-size: 0.95em;
    margin-top: 0.5rem;
}
.success {
    color: #388e3c;
    font-size: 0.95em;
    margin-top: 0.5rem;
}
.terms-group {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
}
.terms-label {
    display: flex;
    align-items: center;
    font-size: 0.97em;
    color: var(--color-text);
    gap: 0.5em;
    font-weight: 400;
}
.terms-label input[type='checkbox'] {
    margin-right: 0.5em;
    accent-color: var(--color-primary);
}
.terms-label a {
    text-decoration: underline;
    cursor: pointer;
}
</style>
