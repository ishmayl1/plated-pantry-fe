<script setup>
import NavDrawer from '@/components/NavDrawer.vue';
import AppBar from '@/components/AppBar.vue';
import MainContent from '@/components/MainContent.vue';
const steps = [
    'Boil pasta according to package instructions. Reserve 1 cup of pasta water.',
    'In a large pan, melt butter and sauté minced garlic until fragrant.',
    'Add shrimp and cook until pink, about 2-3 minutes per side.',
    'Add cooked pasta, parsley, and lemon juice. Toss to combine.',
    'Season with salt and pepper to taste. Serve hot with parmesan cheese.'
];
</script>

<template>
    <v-app>
        <div class="main-layout-flex">
            <NavDrawer />
            <v-main>
                <v-container fluid class="pa-0 main-content-flex">
                    <AppBar />
                    <MainContent>
                        <router-view />
                    </MainContent>

                    <v-footer class="main-footer" color="transparent" padless>
                        <v-col class="text-center text-caption" cols="12"
                            >© 2025 Plated Pantry. All rights reserved.</v-col
                        >
                    </v-footer>
                </v-container>
            </v-main>
        </div>
    </v-app>
</template>

<style scoped>
.main-layout-flex {
    display: flex;
    min-height: 100vh;
}

.main-content-flex {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    flex: 1;
    padding: 0;
}

.footer-spacer {
    flex: 1 1 auto;
}

.main-footer {
    margin-top: 0;
    text-align: center;
    color: #a0b2bd;
    font-size: 0.95em;
    padding-bottom: 1.5rem;
}

.v-application {
    font-family: 'Inter', sans-serif;
}

@media (max-width: 900px) {
    .main-layout-flex {
        flex-direction: column;
    }
    .main-content-flex {
        padding-left: 0 !important;
        padding-right: 0 !important;
    }
}
@media (max-width: 600px) {
    .main-content-flex {
        padding: 0 0.5rem !important;
    }
    .main-footer {
        font-size: 0.85em;
        padding-bottom: 1rem;
    }
}
</style>
