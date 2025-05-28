import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('jwt') || null,
        error: '',
        success: ''
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
        },
        async register({ email, firstName, lastName, password }) {
            this.error = '';
            this.success = '';
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_AUTH_ENDPOINT}/register`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email,
                            firstName,
                            lastName,
                            password
                        })
                    }
                );
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || 'Registration failed');
                }
                this.success = 'Account created! You can now log in.';
                return { success: true };
            } catch (err) {
                this.error = err.message;
                return { success: false, error: err.message };
            }
        },
        logout() {
            // Remove JWT and user info from localStorage/sessionStorage
            localStorage.removeItem('jwt');
            localStorage.removeItem('user');
            this.token = null;
            this.user = null;
            // Optionally, redirect to login or home page
            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }
        }
    },
    getters: {
        isAuthenticated: (state) => !!state.token
    }
});
