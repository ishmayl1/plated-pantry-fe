<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRecipesStore } from '@/stores/recipes.js';
import AppCard from '@/components/AppCard.vue';
import AppButton from '@/components/AppButton.vue';

const recipesStore = useRecipesStore();
const { recipes, loading, error } = storeToRefs(recipesStore);

function viewRecipe(recipe) {
    // Replace with actual navigation logic, e.g. router.push({ name: 'RecipeDetail', params: { id: recipe.id } })
    alert(`View recipe: ${recipe.title || recipe.name || recipe.id}`);
}

onMounted(() => {
    recipesStore.fetchRecipes();
});
</script>

<template>
    <div>
        <div v-if="loading" class="text-center py-8">Loading recipes...</div>
        <div v-else-if="error" class="text-center text-error py-8">
            {{ error }}
        </div>
        <div v-else>
            <div>
                <span class="text-h4">What are we cooking tonight?</span>
            </div>
            <div class="recipes-grid-view">
                <div
                    v-for="recipe in recipes"
                    :key="recipe.id || recipe._id"
                    @click="viewRecipe(recipe)"
                    class="recipe-card-img-wrapper"
                >
                    <img
                        :src="
                            recipe.imageUrl ||
                            'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80'
                        "
                        alt="Recipe image"
                        class="recipe-card-img"
                    />
                    <div
                        class="recipe-card-name-bar d-flex align-center justify-center"
                    >
                        {{ recipe.name || 'Recipe' }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.recipes-grid-view {
    display: grid;
    grid-template-columns: repeat(auto-fit, 1fr);
    gap: 2.2rem 2.2rem;
    margin: 2rem 0;
}
.recipe-card {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    background: var(--color-surface);
    border-radius: 24px;
    box-shadow: 0 2px 16px rgba(127, 64, 191, 0.08);
    overflow: hidden;
    position: relative;
    min-height: 220px;
    cursor: pointer;
    transition:
        box-shadow 0.18s,
        background 0.18s;
    padding: 0;
}
.recipe-card:hover {
    background: var(--color-secondary);
    box-shadow: 0 6px 24px rgba(127, 64, 191, 0.13);
}
.recipe-card-img-wrapper {
    width: 100%;
    aspect-ratio: 1/1;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    background: #fafafa;
    position: relative;
    overflow: hidden;
    border-radius: 24px 24px 24px 24px;
}
html.dark-mode .recipe-card-img-wrapper {
    background: #232323;
}
.recipe-card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0 0 0 0;
    display: block;
}
.recipe-card-name-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: var(--color-secondary);
    color: #fff;
    font-size: 1.2rem;
    font-weight: 600;
    text-align: center;
    height: 4rem;
    line-height: 2.8rem;
    padding: 0;
    border-radius: 0 0 24px 24px;
    letter-spacing: 0.02em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
}
.recipe-card-content {
    flex: 1 1 auto;
    padding: 1.2rem 1rem 1.2rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 0.5rem;
    align-items: flex-start;
}
.recipe-card-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: 0.1rem;
    margin-top: 0.2rem;
    text-align: left;
}
.recipe-card-meta {
    font-size: 0.98rem;
    color: var(--color-text);
    margin-bottom: 0.7rem;
    display: flex;
    gap: 0.7rem;
    flex-wrap: wrap;
}
.recipe-card-actions {
    display: flex;
    gap: 0.7rem;
    margin-top: 0.5rem;
}
.recipe-card-fav {
    position: absolute;
    top: 14px;
    right: 18px;
    font-size: 1.5rem;
    opacity: 0.85;
}
@media (min-width: 1200px) {
    .recipes-grid-view {
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    }
}
@media (max-width: 900px) {
    .recipes-grid-view {
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    }
    .recipe-card-img-wrapper {
        aspect-ratio: 1/1;
        height: auto;
    }
}
@media (max-width: 700px) {
    .recipes-grid-view {
        grid-template-columns: 1fr;
    }
    .recipe-card-img-wrapper {
        aspect-ratio: 1/1;
        height: auto;
    }
    .recipe-card-content {
        padding: 1.2rem 1rem 1.2rem 1rem;
    }
}
</style>
