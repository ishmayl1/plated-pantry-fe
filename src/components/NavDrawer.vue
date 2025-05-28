<template>
    <v-navigation-drawer app permanent width="256">
        <v-list nav dense>
            <v-list-item class="py-6">
                <v-avatar size="48" class="mb-2" color="#ffe4e1">
                    <v-icon color="#f57274">f4a6</v-icon>
                </v-avatar>
                <div class="font-weight-bold text-h6 mt-2">Plated Pantry</div>
            </v-list-item>
            <v-divider class="my-2" />
            <v-list-item
                prepend-icon="mdi-home"
                title="Dashboard"
                value="dashboard"
                active
            />
            <v-list-item
                prepend-icon="mdi-format-list-bulleted"
                title="My Plans"
                value="plans"
            />
            <v-list-item
                prepend-icon="mdi-bag-personal"
                title="Orders"
                value="orders"
            />
            <v-list-item
                prepend-icon="mdi-book-open-page-variant"
                title="Recipes"
                value="recipes"
            />
            <v-list-item
                prepend-icon="mdi-headset"
                title="Support"
                value="support"
            />
            <v-spacer />
            <v-list-item
                prepend-icon="mdi-logout"
                title="Log Out"
                value="logout"
                color="error"
            />
        </v-list>
    </v-navigation-drawer>
</template>

<script setup>
// No script needed for static nav drawer
</script>

<style scoped>
.v-list-item {
    justify-content: center;
    text-align: center;
}
.v-list-item .v-list-item__prepend,
.v-list-item .v-list-item__content {
    justify-content: center;
    display: flex;
    width: 100%;
}
.v-list-item .v-list-item__content {
    flex-direction: column;
    align-items: center;
}
.v-list-item .v-list-item__title {
    width: 100%;
    text-align: center;
    justify-content: center;
    display: flex;
}
.v-list-item .v-avatar {
    margin-left: auto;
    margin-right: auto;
}
</style>
