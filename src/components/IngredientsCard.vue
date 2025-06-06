<script setup>
import { ref, watch, toRefs } from 'vue';

import AppCard from '@/components/AppCard.vue';

const props = defineProps({
    ingredients: {
        type: Array,
        required: true
    }
});

const checked = ref(Array(props.ingredients.length).fill(false));

// Keep checked array in sync if ingredients prop changes
watch(
    () => props.ingredients.length,
    (newLen) => {
        checked.value = Array(newLen).fill(false);
    }
);
</script>

<template>
    <AppCard class="ingredients-card mb-4" darkLevel="3">
        <h3 class="text-h6 font-weight-bold mb-2">Ingredients</h3>
        <div class="ingredient-list-grid">
            <div
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
            </div>
        </div>
    </AppCard>
</template>

<style lang="scss" scoped>
.ingredient-list-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.7rem 1.2rem;
    background: rgba(127, 64, 191, 0.04);
    border-radius: 18px;
    padding: 1.2rem 1.2rem 0.7rem 1.2rem;
    box-shadow: 0 2px 12px rgba(127, 64, 191, 0.06);
    margin: 0 0 1rem 0;
}
@media (max-width: 1100px) {
    .ingredient-list-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
@media (max-width: 800px) {
    .ingredient-list-grid {
        grid-template-columns: 1fr;
    }
}
.ingredient-item {
    margin-bottom: 0.2rem;
    display: flex;
    align-items: center;
    min-width: 0;
    max-width: 100%;
}
.ingredient-checkbox {
    background-color: var(--color-peach);
    color: black;
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
</style>
