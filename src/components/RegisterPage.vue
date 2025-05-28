<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);
const error = ref('');
const success = ref('');
const router = useRouter();

async function handleRegister() {
    error.value = '';
    success.value = '';
    if (password.value !== confirmPassword.value) {
        error.value = 'Passwords do not match.';
        return;
    }
    loading.value = true;
    try {
        const response = await fetch(
            `${import.meta.env.VITE_AUTH_ENDPOINT}/register`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username.value,
                    password: password.value
                })
            }
        );
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }
        success.value = 'Account created! You can now log in.';
        setTimeout(() => router.push({ name: 'Login' }), 1200);
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <div class="register-container">
        <form @submit.prevent="handleRegister" class="register-form">
            <h2>Create Account</h2>
            <div class="form-group">
                <label for="username">Username</label>
                <input
                    id="username"
                    v-model="username"
                    type="text"
                    required
                    autocomplete="username"
                />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input
                    id="password"
                    v-model="password"
                    type="password"
                    required
                    autocomplete="new-password"
                />
            </div>
            <div class="form-group">
                <label for="confirmPassword">Confirm Password</label>
                <input
                    id="confirmPassword"
                    v-model="confirmPassword"
                    type="password"
                    required
                    autocomplete="new-password"
                />
            </div>
            <button type="submit" :disabled="loading">
                {{ loading ? 'Creating...' : 'Create Account' }}
            </button>
            <p v-if="error" class="error">{{ error }}</p>
            <p v-if="success" class="success">{{ success }}</p>
        </form>
    </div>
</template>

<style scoped lang="scss">
.register-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-background);
}
.register-form {
    background: var(--color-surface);
    color: var(--color-text);
    border: 1px solid var(--color-secondary);
    border-radius: 8px;
    padding: 2rem 2.5rem;
    min-width: 320px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
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
.success {
    color: #388e3c;
    font-size: 0.95em;
    margin-top: 0.5rem;
}
</style>
