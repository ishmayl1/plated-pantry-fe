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
    width: 80%;
    max-width: 1600px;
    margin: 2vh auto 0px;
    padding: 2rem 1rem;
    box-sizing: border-box;
    min-height: 80vh;
    display: flex;

    flex-direction: column;
}
@media (max-width: 900px) {
    .main-content-wrapper {
        padding: 1.2rem 2rem;
        margin: 25px 0;
        width: 100%;
    }
}
</style>
