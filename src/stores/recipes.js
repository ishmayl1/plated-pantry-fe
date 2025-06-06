import { defineStore } from 'pinia';

export const useRecipesStore = defineStore('recipes', {
    state: () => ({
        recipes: [],
        loading: false,
        error: ''
    }),
    actions: {
        async fetchRecipes() {
            this.loading = true;
            this.error = '';
            const API_BASE = import.meta.env.VITE_BE_ENDPOINT || '';
            try {
                const res = await fetch(`${API_BASE}/recipes`);
                if (!res.ok) throw new Error('Failed to fetch recipes');
                this.recipes = await res.json();
            } catch (e) {
                this.error = e.message || 'Error loading recipes.';
            } finally {
                this.loading = false;
            }
        }
    }
});
