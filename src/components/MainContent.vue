<template>
    <div class="main-content-wrapper">
        <slot />
    </div>
</template>

<script setup>
// No script needed for a simple wrapper
</script>

<style scoped>
.main-content-wrapper {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
    box-sizing: border-box;
    min-height: 80vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
}
@media (max-width: 900px) {
    .main-content-wrapper {
        padding: 1.2rem 0.5rem;
    }
}
</style>
