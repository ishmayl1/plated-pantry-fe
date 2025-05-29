import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null
    }),
    actions: {
        setUser(userData, rememberMe) {
            this.user = userData;
            this.user.fullName =
                `${userData.firstName} ${userData.lastName}`.trim();
            if (rememberMe) {
                localStorage.setItem('user', JSON.stringify(userData));
                sessionStorage.removeItem('user');
            } else {
                sessionStorage.setItem('user', JSON.stringify(userData));
                localStorage.removeItem('user');
            }
        },
        clearUser() {
            this.user = null;
            localStorage.removeItem('user');
            sessionStorage.removeItem('user');
        },
        initialize() {
            const stored =
                localStorage.getItem('user') || sessionStorage.getItem('user');
            this.user = stored ? JSON.parse(stored) : null;
        }
    },
    getters: {
        isLoggedIn: (state) => !!state.user
    }
});
