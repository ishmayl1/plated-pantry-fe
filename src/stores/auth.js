import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/user';

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('jwt') || null);
    const error = ref('');
    const success = ref('');

    function setToken(newToken, rememberMe) {
        token.value = newToken;
        if (rememberMe) {
            localStorage.setItem('jwt', newToken);
            sessionStorage.removeItem('jwt');
        } else {
            sessionStorage.setItem('jwt', newToken);
            localStorage.removeItem('jwt');
        }
    }

    function clearToken() {
        token.value = null;
        localStorage.removeItem('jwt');
        sessionStorage.removeItem('jwt');
    }

    function initialize() {
        token.value =
            localStorage.getItem('jwt') || sessionStorage.getItem('jwt');
        const userStore = useUserStore();
        userStore.initialize();
    }

    async function login(email, password, rememberMe) {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BE_ENDPOINT}/auth/login`,
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
            setToken(data.token, rememberMe);
            if (data.user) {
                const userStore = useUserStore();
                userStore.setUser(data.user, rememberMe);
            }
            return { success: true };
        } catch (err) {
            return { success: false, message: err.message };
        }
    }

    async function register({
        email,
        firstName,
        lastName,
        password,
        acceptedTerms
    }) {
        error.value = '';
        success.value = '';
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BE_ENDPOINT}/auth/register`,
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
            success.value = 'Account created! You can now log in.';
            return { success: true };
        } catch (err) {
            error.value = err.message;
            return { success: false, error: err.message };
        }
    }

    function logout() {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        token.value = null;
        // Clear user store
        const userStore = useUserStore();
        userStore.clearUser();
        if (typeof window !== 'undefined') {
            window.location.href = '/login';
        }
    }

    const isAuthenticated = computed(() => !!token.value);

    return {
        token,
        error,
        success,
        setToken,
        clearToken,
        initialize,
        login,
        register,
        logout,
        isAuthenticated
    };
});
