<script setup>
import { ref } from 'vue';

const isDark = ref(document.documentElement.classList.contains('dark-mode'));

function setDarkMode(dark) {
    isDark.value = dark;
    document.documentElement.classList.toggle('dark-mode', dark);
    document.documentElement.classList.toggle('light-mode', !dark);
}

function toggleDarkMode() {
    setDarkMode(!isDark.value);
}
</script>

<template>
    <button type="button" @click="toggleDarkMode">
        Toggle {{ isDark ? 'Light' : 'Dark' }} Mode
    </button>
</template>

<style scoped lang="scss">
button {
    background: var(--color-background);
    color: var(--color-text);
    border: 1px solid var(--color-secondary);
    border-radius: 8px;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    transition: border-color 0.25s;
}
button:hover {
    border-color: var(--color-primary);
}
</style>
