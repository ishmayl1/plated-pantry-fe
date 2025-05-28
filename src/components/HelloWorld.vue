<script setup>
import { ref, onMounted } from 'vue';
import ThemeToggleButton from '@/components/ThemeToggleButton.vue';

function isEven(num) {
    return num % 2 === 0;
}

defineProps({
    msg: String
});

const count = ref(0);
const isDark = ref(false);

function setDarkMode(dark) {
    isDark.value = dark;
    document.documentElement.classList.toggle('dark-mode', dark);
}

function toggleDarkMode() {
    setDarkMode(!isDark.value);
}

onMounted(() => {
    // Ignore system preference, always start in light mode
    setDarkMode(false);
});
</script>

<template>
    <h1>{{ msg }}</h1>

    <div class="card">
        <ThemeToggleButton class="mb-5" />
        <p class="text-line">Time to swtich modes</p>
    </div>
</template>

<style scoped lang="scss">
.card {
    padding: 2rem;
    border: 2px solid var(--color-secondary);
    background: var(--color-surface);
    color: var(--color-text);
    @include flex-center;
    flex-direction: column;
    margin-top: 2rem;
}
.text-line {
    color: var(--color-primary);
}
button {
    background: var(--color-background);
    color: var(--color-text);
    border: 1px solid var(--color-secondary);
}
</style>
