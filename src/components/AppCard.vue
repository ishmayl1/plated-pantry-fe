<script setup>
const props = defineProps({
    darkLevel: {
        type: [Number, String],
        default: 1,
        validator: (v) => [1, 2, 3].includes(Number(v))
    }
});
</script>

<template>
    <div class="app-card pa-3" :class="[`dark-level-${props.darkLevel}`]">
        <slot />
    </div>
</template>

<style scoped>
.app-card {
    background: var(--color-surface);
    border-radius: 20px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
    color: var(--color-text);
    transition:
        box-shadow 0.18s,
        background 0.18s,
        color 0.18s;
    width: 100%;
    display: block;
}

html.dark-mode .app-card.dark-level-1 {
    background: #23222a;
}
html.dark-mode .app-card.dark-level-2 {
    background: #2e2d32;
}
html.dark-mode .app-card.dark-level-3 {
    background: #363537;
}
</style>
