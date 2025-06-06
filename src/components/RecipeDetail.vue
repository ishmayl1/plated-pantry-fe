<script setup>
import { ref } from 'vue';

import { useDevice } from '@/composables/useDevice';

import RecipeHeroImage from '@/components/RecipeHeroImage.vue';
import InstructionsCard from '@/components/InstructionsCard.vue';
import IngredientsCard from '@/components/IngredientsCard.vue';

const { isMobile } = useDevice();

const ingredients = [
    '8 oz linguine or spaghetti',
    '1 lb large shrimp, peeled & deveined',
    '3 tbsp unsalted butter',
    '4 cloves garlic, minced',
    '1/4 cup fresh parsley, chopped',
    '1 lemon, juiced',
    'Salt & pepper to taste',
    'Parmesan cheese, for serving'
];
const checked = ref(Array(ingredients.length).fill(false));
const steps = [
    'Boil pasta according to package instructions. Reserve 1 cup of pasta water.',
    'In a large pan, melt butter and sauté minced garlic until fragrant.',
    'Add shrimp and cook until pink, about 2-3 minutes per side.',
    'Add cooked pasta, parsley, and lemon juice. Toss to combine.',
    'Season with salt and pepper to taste. Serve hot with parmesan cheese.'
];

function printRecipe() {
    window.print();
}
function markCompleted() {
    alert('Meal marked as cooked!');
}
function goToTomorrow() {
    // Replace with actual navigation logic
    alert("Navigating to tomorrow's meal plan...");
}
function goToWeek() {
    // Replace with actual navigation logic
    alert("Navigating to this week's meal plan...");
}
</script>

<template>
    <div
        v-if="!isMobile"
        class="dashboard-header d-flex justify-space-between align-baseline flex-wrap mb-6 pr-5 pt-5"
    >
        <h2 class="text-h5 font-weight-bold text-left mb-1">
            Hi, Jon! Ready to cook?
        </h2>
        <div class="dashboard-date text-caption mb-2">
            Thursday, June 5, 2025
        </div>
    </div>
    <div
        v-else
        class="dashboard-header d-flex flex-column justify-center align-center mb-4"
    >
        <h2 class="text-h5 font-weight-bold text-left mb-1">
            Hi, Jon! Ready to cook?
        </h2>
        <div class="dashboard-date text-caption mb-2">
            Thursday, June 5, 2025
        </div>
    </div>
    <RecipeHeroImage />
    <div class="dashboard-details mt-6 mb-4">
        <IngredientsCard :ingredients="ingredients" />
        <InstructionsCard :steps="steps" />
    </div>
</template>

<style scoped>
.dashboard-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
}
.dashboard-date {
    color: #888;
}
.dashboard-actions .app-btn {
    min-width: 160px;
}
.dashboard-navigation .app-btn {
    min-width: 180px;
}
.dashboard-support-link {
    color: var(--color-primary);
    text-decoration: underline;
}
</style>
