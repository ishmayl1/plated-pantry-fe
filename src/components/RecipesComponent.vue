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
        <div v-else class="recipes-grid-view">
            <div
                v-for="recipe in recipes"
                :key="recipe.id || recipe._id"
                class="recipe-card"
                @click="viewRecipe(recipe)"
            >
                <div class="recipe-card-img-wrapper">
                    <img
                        :src="
                            recipe.image ||
                            'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80'
                        "
                        alt="Recipe image"
                        class="recipe-card-img"
                    />
                </div>
                <div class="recipe-card-content">
                    <div class="recipe-card-category">
                        {{ recipe.category || 'Healthy Meals' }}
                    </div>
                    <div class="recipe-card-title">
                        {{ recipe.title || recipe.name }}
                    </div>
                    <div class="recipe-card-desc">
                        {{
                            recipe.description ||
                            recipe.subtitle ||
                            'With Bread and Roasted Berries'
                        }}
                    </div>
                    <div class="recipe-card-meta">
                        <span v-if="recipe.duration">
                            <b>{{ recipe.duration }}</b> Mins
                        </span>
                        <span v-if="recipe.calories">
                            &nbsp; <b>{{ recipe.calories }}</b> Nutrition
                        </span>
                        <span v-if="recipe.ingredients">
                            &nbsp;
                            <b>{{ recipe.ingredients.length }}</b> Ingredients
                        </span>
                    </div>
                    <div class="recipe-card-rating">
                        <span class="star" v-for="i in 5" :key="i">
                            <v-icon
                                :color="
                                    i <= (recipe.rating || 4)
                                        ? 'yellow'
                                        : '#eee'
                                "
                                size="18"
                            >
                                mdi-star
                            </v-icon>
                        </span>
                        <span class="rating-count">
                            {{ recipe.ratingCount || 29 }}
                        </span>
                    </div>
                    <div class="recipe-card-actions">
                        <AppButton
                            color="primary"
                            @click.stop="viewRecipe(recipe)"
                        >
                            View Recipe
                        </AppButton>
                        <AppButton color="secondary" disabled>
                            Add to Collection
                        </AppButton>
                    </div>
                </div>
                <v-icon class="recipe-card-fav" color="var(--color-primary)">
                    mdi-heart
                </v-icon>
            </div>
        </div>
    </div>
</template>

<style scoped>
.recipes-grid-view {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
    gap: 2.2rem 2.2rem;
    margin: 2rem 0;
}
.recipe-card {
    display: flex;
    flex-direction: row;
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
}
.recipe-card:hover {
    background: var(--color-secondary);
    box-shadow: 0 6px 24px rgba(127, 64, 191, 0.13);
}
.recipe-card-img-wrapper {
    flex: 0 0 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fafafa;
    min-width: 200px;
    max-width: 220px;
    height: 100%;
}
.recipe-card-img {
    width: 180px;
    height: 180px;
    object-fit: cover;
    border-radius: 18px;
    box-shadow: 0 2px 8px rgba(127, 64, 191, 0.06);
}
.recipe-card-content {
    flex: 1 1 auto;
    padding: 2.2rem 2rem 1.2rem 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
}
.recipe-card-category {
    font-size: 0.85rem;
    color: #aaa;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 0.2rem;
}
.recipe-card-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: 0.1rem;
}
.recipe-card-desc {
    font-size: 1.05rem;
    color: #666;
    margin-bottom: 0.7rem;
}
.recipe-card-meta {
    font-size: 1.05rem;
    color: #222;
    margin-bottom: 0.7rem;
    display: flex;
    gap: 1.2rem;
}
.recipe-card-rating {
    display: flex;
    align-items: center;
    gap: 0.2rem;
    margin-bottom: 1.1rem;
}
.star {
    margin-right: 1px;
}
.rating-count {
    font-size: 0.98rem;
    color: #aaa;
    margin-left: 0.5rem;
}
.recipe-card-actions {
    display: flex;
    gap: 1.2rem;
    margin-top: 0.5rem;
}
.recipe-card-fav {
    position: absolute;
    top: 18px;
    right: 22px;
    font-size: 2rem;
    opacity: 0.85;
}
@media (max-width: 700px) {
    .recipes-grid-view {
        grid-template-columns: 1fr;
    }
    .recipe-card {
        flex-direction: column;
        min-width: 0;
    }
    .recipe-card-img-wrapper {
        min-width: 100%;
        max-width: 100%;
        justify-content: center;
    }
    .recipe-card-img {
        width: 100%;
        height: 180px;
        border-radius: 18px 18px 0 0;
    }
    .recipe-card-content {
        padding: 1.2rem 1rem 1.2rem 1rem;
    }
}
</style>
