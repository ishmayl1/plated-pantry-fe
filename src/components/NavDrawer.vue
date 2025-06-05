<template>
    <v-navigation-drawer app permanent width="256">
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
            <v-list-item class="nav-list-item" value="dashboard" active>
                <template #prepend>
                    <v-icon>mdi-home</v-icon>
                </template>
                <div class="nav-list-title">Dashboard</div>
            </v-list-item>
            <v-list-item class="nav-list-item" value="plans">
                <template #prepend>
                    <v-icon>mdi-format-list-bulleted</v-icon>
                </template>
                <div class="nav-list-title">My Plans</div>
            </v-list-item>
            <v-list-item class="nav-list-item" value="orders">
                <template #prepend>
                    <v-icon>mdi-bag-personal</v-icon>
                </template>
                <div class="nav-list-title">Orders</div>
            </v-list-item>
            <v-list-item class="nav-list-item" value="recipes">
                <template #prepend>
                    <v-icon>mdi-book-open-page-variant</v-icon>
                </template>
                <div class="nav-list-title">Recipes</div>
            </v-list-item>
            <v-list-item class="nav-list-item" value="support">
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
import AppSvgIcon from '@/components/AppSvgIcon.vue';
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
