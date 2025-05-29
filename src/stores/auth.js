import { defineStore } from 'pinia';
import { useUserStore } from '@/stores/user';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('jwt') || null,
        error: '',
        success: ''
    }),
    actions: {
        setToken(token, rememberMe) {
            this.token = token;
            if (rememberMe) {
                localStorage.setItem('jwt', token);
                sessionStorage.removeItem('jwt');
            } else {
                sessionStorage.setItem('jwt', token);
                localStorage.removeItem('jwt');
            }
        },
        clearToken() {
            this.token = null;
            localStorage.removeItem('jwt');
            sessionStorage.removeItem('jwt');
        },
        initialize() {
            this.token =
                localStorage.getItem('jwt') || sessionStorage.getItem('jwt');
            const userStore = useUserStore();
            userStore.initialize();
        },
        async login(email, password, rememberMe) {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_AUTH_ENDPOINT}/login`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, password })
                    }
                );
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Login failed');
                }
                this.setToken(data.token, rememberMe);

                // Save user data if present
                if (data.user) {
                    const userStore = useUserStore();
                    userStore.setUser(data.user, rememberMe);
                }
                return { success: true };
            } catch (err) {
                return { success: false, message: err.message };
            }
        },
        async register({
            email,
            firstName,
            lastName,
            password,
            acceptedTerms
        }) {
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
                            password,
                            acceptedTerms
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
            // Clear user store
            const userStore = useUserStore();
            userStore.clearUser();
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
