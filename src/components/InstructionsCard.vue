<script setup>
import AppButton from '@/components/AppButton.vue';
import AppCard from '@/components/AppCard.vue';

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
    <app-card darkLevel="3" class="pa-6">
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
        <app-button
            @click="printRecipe"
            color="secondary"
            class="mt-12"
            block
            rounded="xl"
            size="medium"
            style="font-weight: 600"
        >
            <template #default>
                <v-icon left size="20">mdi-printer</v-icon>
                Print Recipe
            </template>
        </app-button>
    </app-card>
</template>

<style lang="scss">
html.dark-mode .v-timeline .v-timeline-divider__dot {
    background: #f6cbcb !important;
}
html.dark-mode .v-timeline-divider__before {
    background-color: #fff !important;
}
html.dark-mode .v-timeline-divider__after {
    background-color: #fff !important;
}
</style>
