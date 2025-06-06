<script setup>
import { onMounted, ref } from 'vue';

import LoadingAnimation from '@/components/LoadingAnimation.vue';

import { storeToRefs } from 'pinia';
import { useRecipesStore } from '@/stores/recipes.js';

const recipesStore = useRecipesStore();
const { recipes, loading, error } = storeToRefs(recipesStore);

const loadedImages = ref({});

function viewRecipe(recipe) {
    // Replace with actual navigation logic, e.g. router.push({ name: 'RecipeDetail', params: { id: recipe.id } })
    alert(`View recipe: ${recipe.title || recipe.name || recipe.id}`);
}

function onImgLoad(id) {
    loadedImages.value[id] = true;
}

onMounted(() => {
    recipesStore.fetchRecipes();
});
</script>

<template>
    <div>
        <div v-if="loading" class="text-center py-8">
            <LoadingAnimation />
        </div>
        <div v-else-if="error" class="text-center text-error py-8">
            {{ error }}
        </div>
        <div v-else class="recipes-grid-view">
            <div
                v-for="recipe in recipes"
                :key="recipe.id || recipe._id"
                @click="viewRecipe(recipe)"
                class="recipe-card-img-wrapper"
                :class="{ loaded: loadedImages[recipe.id || recipe._id] }"
            >
                <img
                    :src="
                        recipe.imageUrl ||
                        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80'
                    "
                    alt="Recipe image"
                    class="recipe-card-img"
                    @load="onImgLoad(recipe.id || recipe._id)"
                />
                <div
                    class="recipe-card-name-bar d-flex align-center justify-center px-2"
                >
                    {{ recipe.name }}
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
.recipe-card-img-wrapper {
    width: 100%;
    aspect-ratio: 1/1;
    max-height: 450px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    background: #fafafa;
    position: relative;
    overflow: hidden;
    border-radius: 24px 24px 24px 24px;
    opacity: 0;
    transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
html.dark-mode .recipe-card-img-wrapper {
    background: #232323;
}
.recipe-card-img-wrapper.loaded {
    opacity: 1;
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
    font-size: 1.1rem;
    font-weight: 600;
    text-align: center;
    height: auto;
    min-height: 2.8rem;
    line-height: 1.2;
    padding: 0.4rem 0.5rem;
    border-radius: 0 0 24px 24px;
    letter-spacing: 0.02em;
    white-space: normal;
    word-break: break-word;
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
        max-height: 450px;
    }
}
@media (max-width: 700px) {
    .recipes-grid-view {
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 1.2rem 1.2rem;
        padding: 0 0.7rem;
    }
    .recipe-card-img-wrapper {
        aspect-ratio: 1/1;
        height: auto;
    }
    .recipe-card-name-bar {
        font-size: 0.8rem;
        min-height: 2.4rem;
        height: auto;
        line-height: 1.2;
        padding: 0.5rem 0.4rem;
    }
}
@media (min-width: 900px) and (max-width: 1199px) {
    .recipes-grid-view {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>
