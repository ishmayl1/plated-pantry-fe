<script setup>
// No script needed for a simple card wrapper
</script>

<template>
    <div class="app-card pa-3">
        <slot />
    </div>
</template>

<style scoped>
.app-card {
    background: var(--color-surface, #fff);
    border-radius: 20px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
    color: var(--color-text, #222);
    transition: box-shadow 0.18s;
    width: 100%;
    display: block;
}
</style>
