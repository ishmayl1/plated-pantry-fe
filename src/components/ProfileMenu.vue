<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';

const authStore = useAuthStore();
const userStore = useUserStore();
const { user } = userStore;

const isDark = ref(false);
const menuOpen = ref(false);

onMounted(() => {
    // Set theme based on user preference if available
    if (user && typeof user.darkMode === 'boolean') {
        isDark.value = user.darkMode;
    } else {
        isDark.value = document.documentElement.classList.contains('dark-mode');
    }
    const html = document.documentElement;
    if (isDark.value) {
        html.classList.add('dark-mode');
        html.classList.remove('light-mode');
    } else {
        html.classList.remove('dark-mode');
        html.classList.add('light-mode');
    }
});

async function toggleTheme() {
    const html = document.documentElement;
    isDark.value = !isDark.value;
    if (isDark.value) {
        html.classList.add('dark-mode');
        html.classList.remove('light-mode');
    } else {
        html.classList.remove('dark-mode');
        html.classList.add('light-mode');
    }
    // Persist darkMode preference to backend and local user store
    await userStore.updateUser({ darkMode: isDark.value });
}

function onLogout() {
    authStore.logout();
}
</script>

<template>
    <v-menu offset-y v-model="menuOpen">
        <template #activator="activatorSlot">
            <button class="profile-menu-btn" v-bind="activatorSlot.props">
                <v-avatar size="36" class="profile-avatar">
                    <img
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg"
                        alt="User Avatar"
                    />
                </v-avatar>
                <span class="profile-name">{{ user.fullName }}</span>
                <v-icon
                    size="20"
                    color="#49B583"
                    class="profile-chevron"
                    :class="{ open: menuOpen }"
                >
                    {{ menuOpen ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                </v-icon>
            </button>
        </template>
        <v-list class="py-0 profile-menu-content">
            <v-list-item class="profile-menu-item">
                <v-icon size="20" color="#FF6B6B" class="mr-2">
                    mdi-account
                </v-icon>
                <span>My Profile</span>
            </v-list-item>
            <v-list-item class="profile-menu-item">
                <v-icon size="20" color="#49B583" class="mr-2">
                    mdi-cog
                </v-icon>
                <span>Settings</span>
            </v-list-item>
            <v-list-item class="profile-menu-item" @click="toggleTheme">
                <v-icon size="20" color="#7f40bf" class="mr-2">
                    mdi-theme-light-dark
                </v-icon>
                <span>{{ isDark ? 'Light Mode' : 'Dark Mode' }}</span>
            </v-list-item>
            <v-list-item class="profile-menu-item logout" @click="onLogout">
                <v-icon size="20" class="mr-2 icon-primary">
                    mdi-logout
                </v-icon>
                <span>Log Out</span>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<style scoped>
.profile-menu-btn {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: var(--color-navdrawer-bg);
    border-radius: 999px;
    border: 1px solid var(--color-navdrawer-bg);
    box-shadow: 0 1px 4px 0 rgba(40, 40, 60, 0.08);
    padding: 6px 18px 6px 10px;
    cursor: pointer;
    transition:
        background 0.18s,
        border 0.18s;
}
.profile-menu-btn:hover {
    background: var(--color-light-charcoal);
    border-color: var(--color-light-charcoal);
}
.profile-avatar {
    border: 2px solid var(--color-primary);
}
.profile-name {
    font-weight: 600;
    color: var(--color-navdrawer-text);
    font-size: 1rem;
    letter-spacing: 0.01em;
}
.profile-chevron {
    margin-left: 2px;
    transition: transform 0.18s;
    color: var(--color-action);
}
.profile-menu-content {
    background: var(--color-menu-bg) !important;
    color: var(--color-text) !important;
}
.profile-menu-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-text);
    font-weight: 500;
    padding: 10px 20px;
    border-radius: 0.75rem;
    transition: background 0.18s;
    cursor: pointer;
}
.profile-menu-item:hover {
    background: var(--color-light-charcoal);
}
.profile-menu-item.logout {
    color: var(--color-primary);
}
@media (max-width: 900px) {
    .profile-menu-btn {
        padding: 6px 10px 6px 8px;
        gap: 0.5rem;
    }
    .profile-name {
        font-size: 0.95rem;
    }
    .profile-avatar {
        width: 32px !important;
        height: 32px !important;
    }
}
@media (max-width: 600px) {
    .profile-menu-btn {
        padding: 4px 8px 4px 6px;
        gap: 0.4rem;
    }
    .profile-name {
        font-size: 0.9rem;
        display: none;
    }
    .profile-avatar {
        width: 28px !important;
        height: 28px !important;
    }
    .profile-chevron {
        margin-left: 0;
    }
    .profile-menu-content {
        min-width: 140px !important;
    }
    .profile-menu-item {
        padding: 8px 12px;
        font-size: 0.97em;
    }
}
</style>
