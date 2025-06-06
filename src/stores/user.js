import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUserStore = defineStore('user', () => {
    const user = ref(null);

    function setUser(userData, rememberMe) {
        user.value = userData;
        user.value.fullName =
            `${userData.firstName} ${userData.lastName}`.trim();
        if (rememberMe) {
            localStorage.setItem('user', JSON.stringify(userData));
            sessionStorage.removeItem('user');
        } else {
            sessionStorage.setItem('user', JSON.stringify(userData));
            localStorage.removeItem('user');
        }
    }

    function clearUser() {
        user.value = null;
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
    }

    function initialize() {
        const stored =
            localStorage.getItem('user') || sessionStorage.getItem('user');
        user.value = stored ? JSON.parse(stored) : null;
    }

    const isLoggedIn = computed(() => !!user.value);

    return {
        user,
        setUser,
        clearUser,
        initialize,
        isLoggedIn
    };
});
