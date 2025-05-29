<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth.js';
import AppInput from '@/components/AppInput.vue';
import AppButton from '@/components/AppButton.vue';
import { useInputValidation } from '@/composables/useInputValidation.js';

const auth = useAuthStore();

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const loading = ref(false);
const error = ref('');

const { emailError } = useInputValidation({
    email: email
});

async function handleLogin() {
    error.value = '';
    loading.value = true;
    const result = await auth.login(
        email.value,
        password.value,
        rememberMe.value
    );
    if (result.success) {
        // Redirect to home or dashboard after successful login
        window.location.href = '/';
    } else {
        error.value = 'Failed to login. Please check your credentials.';
        console.error('Login error:', result.error);
    }
    loading.value = false;
}
</script>

<template>
    <div class="login-container">
        <form @submit.prevent="handleLogin" class="login-form">
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
            <span class="text-h5 font-weight-bold mb-5">Welcome Back!</span>
            <div class="form-group">
                <AppInput
                    id="email"
                    v-model="email"
                    label="Email Address"
                    type="text"
                    required
                    autocomplete="email"
                    :error="!!emailError"
                    :error-messages="emailError || undefined"
                />
            </div>
            <div class="form-group mb-8">
                <AppInput
                    id="password"
                    v-model="password"
                    label="Password"
                    type="password"
                    required
                />
            </div>
            <div
                class="form-group"
                style="flex-direction: row; align-items: center"
            >
                <input type="checkbox" v-model="rememberMe" class="mr-2" />
                <label for="rememberMe" style="font-size: 0.97em">
                    Remember Me
                </label>
            </div>
            <AppButton type="submit" :disabled="loading" class="mb-3">
                {{ loading ? 'Logging in...' : 'Sign In' }}
            </AppButton>
            <p v-if="error" class="error">{{ error }}</p>
            <p class="register-link">
                Don't have an account?
                <router-link to="/register">Create one</router-link>
            </p>
        </form>
    </div>
</template>

<style scoped lang="scss">
.login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-background);
}
.login-form {
    background: var(--color-surface);
    color: var(--color-text);
    border-radius: 20px;
    padding: 2rem 2.5rem 3rem 2.5rem;
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
}
.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
}
input {
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--color-secondary);
    border-radius: 4px;
    background: var(--color-background);
    color: var(--color-text);
    font-size: 1rem;
}
input:focus {
    outline: 2px solid var(--color-primary);
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
.register-link {
    font-size: 0.9em;
    color: var(--color-primary);
    text-align: center;
}
</style>
