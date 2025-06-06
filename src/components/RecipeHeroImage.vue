<script setup>
import AppCard from '@/components/AppCard.vue';
</script>

<template>
    <app-card darkLevel="3">
        <v-card-title class="d-flex align-center justify-space-between">
            <span class="text-h6 font-weight-bold">
                Garlic Butter Shrimp Pasta
            </span>
        </v-card-title>
        <div class="portrait-img-wrapper">
            <v-img
                src="https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=500&q=80"
                height="420"
                width="320"
                aspect-ratio="3/4"
                cover
                class="portrait-hero-img mx-auto"
            />
        </div>

        <v-card-text>
            <v-row>
                <v-col cols="3" class="text-center">
                    <v-icon color="#ff6b6b" size="24">mdi-fire</v-icon>
                    <div class="text-caption">Calories</div>
                    <div class="font-weight-bold">580 kcal</div>
                </v-col>
                <v-col cols="3" class="text-center">
                    <v-icon color="#49b583" size="24">mdi-account-group</v-icon>
                    <div class="text-caption">Servings</div>
                    <div class="font-weight-bold">4 people</div>
                </v-col>
                <v-col cols="3" class="text-center">
                    <v-icon color="#ffd166" size="24">mdi-speedometer</v-icon>
                    <div class="text-caption">Difficulty</div>
                    <div class="font-weight-bold">Easy</div>
                </v-col>
                <v-col cols="3" class="text-center">
                    <v-icon color="#e50046" size="24">mdi-timer</v-icon>
                    <div class="text-caption">Cooking Time</div>
                    <div class="font-weight-bold">35 mins</div>
                </v-col>
            </v-row>
        </v-card-text>
    </app-card>
</template>

<style scoped>
.portrait-img-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 1rem;
    padding-bottom: 0.5rem;
}
.portrait-hero-img {
    border-radius: 1.2rem;
    object-fit: cover;
    width: 320px;
    height: 420px;
    max-width: 90vw;
    box-shadow: 0 2px 12px rgba(127, 64, 191, 0.08);
}
</style>
