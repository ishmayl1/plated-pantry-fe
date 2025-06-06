<script setup>
import { ref, onMounted } from 'vue';
import ProfileMenu from '@/components/ProfileMenu.vue';
import NavDrawer from '@/components/NavDrawer.vue';
import AppSvgIcon from '@/components/AppSvgIcon.vue';
import { useDevice } from '@/composables/useDevice.js';

const navDrawerRef = ref(null);
const { isMobile } = useDevice();
const drawerOpen = ref(true);

function checkDrawer() {
    if (isMobile.value) drawerOpen.value = false;
    else drawerOpen.value = true;
}

onMounted(() => {
    checkDrawer();
});
</script>

<template>
    <v-app-bar
        flat
        style="background-color: var(--color-background)"
        class="px-8 py-4"
    >
        <v-btn
            icon
            class="mr-2 d-md-none"
            v-if="isMobile"
            @click="drawerOpen = !drawerOpen"
        >
            <v-icon v-if="!drawerOpen">mdi-menu</v-icon>
            <v-icon v-else>mdi-close</v-icon>
        </v-btn>
        <div v-if="isMobile" class="mobile-brand-center">
            <!-- <AppSvgIcon name="basket" :size="36" color="#f57274" class="mr-2" /> -->
            <span class="font-weight-bold brand-font mobile-brand-title">
                Plated Pantry
            </span>
        </div>
        <v-spacer v-else />
        <ProfileMenu />
    </v-app-bar>
    <NavDrawer
        v-if="isMobile"
        ref="navDrawerRef"
        v-model:drawerOpen="drawerOpen"
        v-model:isMobile="isMobile"
    />
</template>

<style scoped>
.v-app-bar {
    padding-left: 2rem;
    padding-right: 2rem;
    min-height: 64px;

    color: var(--color-text) !important;
    transition:
        background 0.2s,
        color 0.2s;
    display: flex;
    align-items: center;
}
.mobile-brand-center {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
}
.mobile-brand-title {
    font-size: 1.2rem;
    margin-left: 0.5rem;
}
@media (min-width: 769px) {
    .mobile-brand-center {
        display: none;
    }
}
@media (max-width: 900px) {
    .v-app-bar {
        padding-left: 1rem;
        padding-right: 1rem;
        min-height: 56px;
    }
}
@media (max-width: 600px) {
    .v-app-bar {
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        min-height: 48px;
    }
    .mobile-brand-title {
        font-size: 1rem;
    }
}
</style>
