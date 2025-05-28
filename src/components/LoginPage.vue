<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth.js';

const auth = useAuthStore();

const username = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');

async function handleLogin() {
    error.value = '';
    loading.value = true;
    const result = await auth.login(username.value, password.value);
    if (result.success) {
        alert('Login successful!');
    } else {
        error.value = result.message;
    }
    loading.value = false;
}
</script>

<template>
    <div class="login-container">
        <form @submit.prevent="handleLogin" class="login-form">
            <h2>Login</h2>
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
                    autocomplete="current-password"
                />
            </div>
            <button type="submit" :disabled="loading">
                {{ loading ? 'Logging in...' : 'Login' }}
            </button>
            <p v-if="error" class="error">{{ error }}</p>
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
</style>
