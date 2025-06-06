<script setup>
import { ref } from 'vue';
import AppCard from '@/components/AppCard.vue';
import RecipeHeroImage from '@/components/RecipeHeroImage.vue';
import InstructionsCard from '@/components/InstructionsCard.vue';
import AppButton from '@/components/AppButton.vue';

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
    <AppCard class="pt-5 px-3" darkLevel="2">
        <div
            class="dashboard-header d-flex justify-space-between align-baseline flex-wrap mb-6 pr-5 pt-5"
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
            <AppCard class="ingredients-card mb-4" darkLevel="3">
                <h3 class="text-h6 font-weight-bold mb-2">Ingredients</h3>
                <ul class="ingredient-list stylish-ingredients">
                    <li
                        v-for="(ingredient, i) in ingredients"
                        :key="i"
                        class="ingredient-item"
                    >
                        <v-checkbox
                            v-model="checked[i]"
                            :label="ingredient"
                            hide-details
                            density="compact"
                            class="ingredient-checkbox"
                        />
                    </li>
                </ul>
            </AppCard>
            <InstructionsCard :steps="steps" />
        </div>
        <div class="dashboard-navigation mt-8 mb-2 d-flex align-center gap-4">
            <AppButton @click="goToTomorrow" color="secondary">
                <v-icon left>mdi-arrow-right-bold</v-icon> Tomorrow’s Meal
            </AppButton>
        </div>
        <div class="dashboard-support mt-8 text-caption text-center">
            Need help?
            <a href="/support" class="dashboard-support-link"
                >Contact support</a
            >
            or check our <a href="/support">FAQs</a>.
        </div>
    </AppCard>
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
.dashboard-message {
    color: #7f40bf;
    font-weight: 500;
}
.ingredient-list {
    list-style: none;
    padding: 0;
    margin: 0 0 1rem 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem 1.2rem;
    background: rgba(127, 64, 191, 0.04);
    border-radius: 18px;
    padding: 1.2rem 1.2rem 0.7rem 1.2rem;
    box-shadow: 0 2px 12px rgba(127, 64, 191, 0.06);
}
.ingredient-item {
    flex: 1 1 220px;
    min-width: 180px;
    max-width: 320px;
    margin-bottom: 0.2rem;
    display: flex;
    align-items: center;
}
.ingredient-checkbox {
    background: #fff;
    border-radius: 999px;
    padding: 0.2rem 1.2rem 0.2rem 0.2rem;
    box-shadow: 0 1px 4px rgba(127, 64, 191, 0.07);
    transition:
        box-shadow 0.18s,
        background 0.18s;
}
.ingredient-checkbox:hover {
    background: #f5e6ff;
    box-shadow: 0 2px 8px rgba(127, 64, 191, 0.13);
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
