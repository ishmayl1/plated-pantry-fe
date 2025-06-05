<template>
    <v-navigation-drawer
        v-if="!isMobile"
        :permanent="true"
        app
        width="256"
        class="navdrawer-responsive"
    >
        <v-list nav dense>
            <v-list-item class="py-6 nav-header-item">
                <v-avatar
                    size="72"
                    class="mb-2 nav-header-avatar"
                    color="#ffe4e1"
                >
                    <AppSvgIcon name="basket" :size="48" color="#f57274" />
                </v-avatar>
                <div
                    class="font-weight-bold text-h5 mt-2 nav-header-title brand-font"
                >
                    Plated Pantry
                </div>
            </v-list-item>
            <v-divider class="my-2" />
            <v-list-item
                class="nav-list-item"
                value="dashboard"
                :active="$route.name === 'Dashboard'"
                @click="$router.push({ name: 'Dashboard' })"
            >
                <template #prepend>
                    <v-icon>mdi-home</v-icon>
                </template>
                <div class="nav-list-title">Dashboard</div>
            </v-list-item>
            <v-list-item
                class="nav-list-item"
                value="plans"
                :active="$route.name === 'Plans'"
                @click="$router.push({ name: 'Plans' })"
            >
                <template #prepend>
                    <v-icon>mdi-format-list-bulleted</v-icon>
                </template>
                <div class="nav-list-title">My Plans</div>
            </v-list-item>
            <v-list-item
                class="nav-list-item"
                value="orders"
                :active="$route.name === 'Orders'"
                @click="$router.push({ name: 'Orders' })"
            >
                <template #prepend>
                    <v-icon>mdi-bag-personal</v-icon>
                </template>
                <div class="nav-list-title">Orders</div>
            </v-list-item>
            <v-list-item
                class="nav-list-item"
                value="recipes"
                :active="$route.name === 'Recipes'"
                @click="$router.push({ name: 'Recipes' })"
            >
                <template #prepend>
                    <v-icon>mdi-book-open-page-variant</v-icon>
                </template>
                <div class="nav-list-title">Recipes</div>
            </v-list-item>
            <v-list-item
                class="nav-list-item"
                value="support"
                :active="$route.name === 'Support'"
                @click="$router.push({ name: 'Support' })"
            >
                <template #prepend>
                    <v-icon>mdi-headset</v-icon>
                </template>
                <div class="nav-list-title">Support</div>
            </v-list-item>
            <v-spacer />
        </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer
        v-else-if="isMobile && drawerOpen"
        v-model="drawerOpen"
        :permanent="false"
        :temporary="true"
        app
        width="256"
        class="navdrawer-responsive"
        @click:outside="drawerOpen = false"
    >
        <v-list nav dense>
            <v-list-item
                class="nav-list-item"
                style="margin-top: 10vh"
                value="dashboard"
                :active="$route.name === 'Dashboard'"
                @click="
                    $router.push({ name: 'Dashboard' });
                    drawerOpen = false;
                    emit('update:drawerOpen', false);
                "
            >
                <template #prepend>
                    <v-icon>mdi-home</v-icon>
                </template>
                <div class="nav-list-title">Dashboard</div>
            </v-list-item>
            <v-list-item
                class="nav-list-item"
                value="plans"
                :active="$route.name === 'Plans'"
                @click="
                    $router.push({ name: 'Plans' });
                    drawerOpen = false;
                    emit('update:drawerOpen', false);
                "
            >
                <template #prepend>
                    <v-icon>mdi-format-list-bulleted</v-icon>
                </template>
                <div class="nav-list-title">My Plans</div>
            </v-list-item>
            <v-list-item
                class="nav-list-item"
                value="orders"
                :active="$route.name === 'Orders'"
                @click="
                    $router.push({ name: 'Orders' });
                    drawerOpen = false;
                    emit('update:drawerOpen', false);
                "
            >
                <template #prepend>
                    <v-icon>mdi-bag-personal</v-icon>
                </template>
                <div class="nav-list-title">Orders</div>
            </v-list-item>
            <v-list-item
                class="nav-list-item"
                value="recipes"
                :active="$route.name === 'Recipes'"
                @click="
                    $router.push({ name: 'Recipes' });
                    drawerOpen = false;
                    emit('update:drawerOpen', false);
                "
            >
                <template #prepend>
                    <v-icon>mdi-book-open-page-variant</v-icon>
                </template>
                <div class="nav-list-title">Recipes</div>
            </v-list-item>
            <v-list-item
                class="nav-list-item"
                value="support"
                :active="$route.name === 'Support'"
                @click="
                    $router.push({ name: 'Support' });
                    drawerOpen = false;
                    emit('update:drawerOpen', false);
                "
            >
                <template #prepend>
                    <v-icon>mdi-headset</v-icon>
                </template>
                <div class="nav-list-title">Support</div>
            </v-list-item>
            <v-spacer />
        </v-list>
    </v-navigation-drawer>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import AppSvgIcon from '@/components/AppSvgIcon.vue';
import { useDevice } from '@/composables/useDevice.js';

const props = defineProps({
    drawerOpen: Boolean
});
const emit = defineEmits(['update:drawerOpen']);

const { isMobile } = useDevice();
const drawerOpen = ref(props.drawerOpen);

watch(
    () => props.drawerOpen,
    (val) => {
        drawerOpen.value = val;
    }
);
</script>

<style scoped>
.v-navigation-drawer {
    background: var(--color-navdrawer-bg) !important;
    color: var(--color-navdrawer-text) !important;
    transition:
        background 0.2s,
        color 0.2s;
    box-shadow:
        0 4px 24px 0 rgba(40, 40, 60, 0.18),
        0 1.5px 4px 0 rgba(40, 40, 60, 0.1);
    width: 256px;
    min-width: 200px;
    max-width: 100vw;
}
@media (max-width: 768px) {
    .v-navigation-drawer {
        width: 100vw !important;
        min-width: 0 !important;
        max-width: 100vw !important;
        position: fixed !important;
        left: 0;
        top: 0 !important;
        min-height: 100vh !important;
        max-height: 100vh !important;
        /* Remove any margin or padding from parent and children */
        margin: 0 !important;
        padding: 0 !important;
    }
    .v-navigation-drawer .v-list,
    .v-navigation-drawer__content {
        margin: 0 !important;
        padding: 0 !important;
        padding-top: 0 !important;
    }
    .nav-header-item {
        margin-top: 0 !important;
        padding-top: 0 !important;
    }
    .v-navigation-drawer .nav-list {
        align-items: flex-start;
        margin-top: 0 !important;
        flex: 1 1 auto;
        height: 100%;
        padding-top: 0 !important;
    }
    .v-navigation-drawer .nav-list-item {
        justify-content: flex-start !important;
        text-align: left;
        width: 90%;
        margin-left: auto;
        margin-right: auto;
    }
    .v-navigation-drawer .nav-list-title {
        text-align: left !important;
        margin-left: 8px !important;
    }
    .nav-header-item {
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        padding: 12px 8px !important;
    }
    .nav-header-avatar {
        margin-bottom: 0 !important;
        margin-right: 12px;
    }
    .nav-header-title {
        font-size: 1.1rem !important;
        margin-top: 0 !important;
    }
    .nav-list-item {
        padding: 10px 8px !important;
        font-size: 1rem !important;
    }
}
@media (max-width: 480px) {
    .v-navigation-drawer {
        width: 100vw !important;
        min-width: 0 !important;
        max-width: 100vw !important;
        padding: 0 !important;
        height: 100vh !important;
        min-height: 100vh !important;
        max-height: 100vh !important;
        margin: 0 !important;
        padding: 0 !important;
    }
    .v-navigation-drawer .v-list,
    .v-navigation-drawer__content {
        margin: 0 !important;
        padding: 0 !important;
        padding-top: 0 !important;
    }
    .nav-header-item {
        margin-top: 0 !important;
        padding-top: 0 !important;
    }
    .nav-header-title {
        font-size: 1rem !important;
    }
    .nav-list-title {
        font-size: 0.95rem !important;
    }
    .v-avatar {
        width: 40px !important;
        height: 40px !important;
    }
    .brand-font {
        font-size: 1.1rem !important;
    }
}
.v-navigation-drawer a,
.v-navigation-drawer .v-list-item__content {
    color: var(--color-navdrawer-text) !important;
}
.v-navigation-drawer .v-list-item--active {
    background: rgba(127, 64, 191, 0.12) !important;
}
.nav-list-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    padding: 12px 16px;
    border-radius: 6px;
    cursor: pointer;
    transition:
        background 0.18s,
        color 0.18s;
}
.nav-list-item:hover {
    background: rgba(127, 64, 191, 0.1);
}
.nav-list-item[active],
.nav-list-item.v-list-item--active {
    background: rgba(127, 64, 191, 0.18);
    color: var(--color-primary) !important;
}
.nav-list-item[active] .v-icon,
.nav-list-item.v-list-item--active .v-icon,
.nav-list-item[active] .nav-list-title,
.nav-list-item.v-list-item--active .nav-list-title {
    color: var(--color-primary) !important;
}
.nav-list-title {
    flex: 1;
    text-align: left;
    margin-left: 8px;
}
</style>
