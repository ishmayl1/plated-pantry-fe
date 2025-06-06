import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRecipesStore = defineStore('recipes', () => {
    const recipes = ref([]);
    const loading = ref(false);
    const error = ref('');

    async function fetchRecipes() {
        loading.value = true;
        error.value = '';
        const API_BASE = import.meta.env.VITE_BE_ENDPOINT || '';
        try {
            const res = await fetch(`${API_BASE}/recipes`);
            if (!res.ok) throw new Error('Failed to fetch recipes');
            recipes.value = await res.json();
        } catch (e) {
            error.value = e.message || 'Error loading recipes.';
        } finally {
            loading.value = false;
        }
    }

    return { recipes, loading, error, fetchRecipes };
});
