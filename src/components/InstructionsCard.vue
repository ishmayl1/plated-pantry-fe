<script setup>
const props = defineProps({
    steps: {
        type: Array,
        required: true
    }
});

function printRecipe() {
    window.print();
}
</script>

<template>
    <v-card rounded="xl" elevation="4" class="pa-6">
        <div class="text-h6 font-weight-bold mb-4">Instructions</div>
        <v-timeline align="start" dense>
            <v-timeline-item
                v-for="(step, i) in steps"
                :key="i"
                :dot-color="'#ff6b6b'"
                size="small"
            >
                <div class="font-weight-bold">Step {{ i + 1 }}</div>
                <div>{{ step }}</div>
            </v-timeline-item>
        </v-timeline>
        <v-btn
            @click="printRecipe"
            style="background-color: var(--color-secondary)"
            class="mt-6"
            block
            rounded="xl"
            size="large"
            prepend-icon="mdi-printer"
        >
            Print Recipe
        </v-btn>
    </v-card>
</template>
