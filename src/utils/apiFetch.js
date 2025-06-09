import { useAuthStore } from '@/stores/auth';

export async function apiFetch(url, options = {}) {
    const token = localStorage.getItem('jwt') || sessionStorage.getItem('jwt');
    options.headers = {
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        'Content-Type': 'application/json'
    };

    const response = await fetch(url, options);

    if (response.status === 403) {
        let data = {};
        try {
            data = await response.clone().json();
        } catch {}
        if (data.error && data.error.toLowerCase().includes('token')) {
            // Logout and redirect
            const authStore = useAuthStore();
            authStore.logout();
            window.location.href = '/login';
            return Promise.reject(
                new Error('Session expired. Redirecting to login.')
            );
        }
    }

    return response;
}
