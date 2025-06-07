<template>
    <div class="loader-center">
        <div class="loader"></div>
    </div>
</template>

<script setup>
// No props or logic needed for this loader
</script>

<style scoped>
.loader-center {
    width: 100%;
    height: calc(100vh - 364px); /* Adjust for header/footer height */
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.loader {
    width: 70px;
    aspect-ratio: 2;
    --_g: no-repeat
        radial-gradient(circle closest-side, var(--color-primary) 90%, #0000);
    background:
        var(--_g) 0% 50%,
        var(--_g) 50% 50%,
        var(--_g) 100% 50%;
    background-size: calc(100% / 3) 50%;
    animation: l3 1s infinite linear;
}
@keyframes l3 {
    20% {
        background-position:
            0% 0%,
            50% 50%,
            100% 50%;
    }
    40% {
        background-position:
            0% 100%,
            50% 0%,
            100% 50%;
    }
    60% {
        background-position:
            0% 50%,
            50% 100%,
            100% 0%;
    }
    80% {
        background-position:
            0% 50%,
            50% 50%,
            100% 100%;
    }
}
</style>
