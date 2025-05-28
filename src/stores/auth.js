import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('jwt') || null
    }),
    actions: {
        setToken(token) {
            this.token = token;
            localStorage.setItem('jwt', token);
        },
        clearToken() {
            this.token = null;
            localStorage.removeItem('jwt');
        },
        initialize() {
            this.token = localStorage.getItem('jwt');
        },
        async login(username, password) {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_AUTH_ENDPOINT}/login`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username, password })
                    }
                );
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || 'Login failed');
                }
                this.setToken(data.token);
                return { success: true };
            } catch (err) {
                return { success: false, message: err.message };
            }
        }
    },
    getters: {
        isAuthenticated: (state) => !!state.token
    }
});
