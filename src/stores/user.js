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

    async function updateUser({ firstName, lastName, darkMode }) {
        const token =
            localStorage.getItem('jwt') || sessionStorage.getItem('jwt');
        if (!token) throw new Error('Not authenticated');
        const updateFields = {};
        if (firstName !== undefined) updateFields.firstName = firstName;
        if (lastName !== undefined) updateFields.lastName = lastName;
        if (darkMode !== undefined) updateFields.darkMode = darkMode;
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BE_ENDPOINT}/auth/user`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(updateFields)
                }
            );
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Failed to update user');
            }
            // Update local user state
            user.value = {
                ...user.value,
                ...data,
                fullName: `${data.firstName} ${data.lastName}`.trim()
            };
            // Persist updated user
            const rememberMe = !!localStorage.getItem('jwt');
            setUser(user.value, rememberMe);
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    }

    return {
        user,
        setUser,
        clearUser,
        initialize,
        isLoggedIn,
        updateUser
    };
});
