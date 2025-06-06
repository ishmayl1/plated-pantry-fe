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

/* HTML: <div class="loader"></div> */
.loader {
    --R: 30px;
    --g1: var(--color-primary) 96%, #0000;
    --g2: var(--color-background) 96%, #0000;
    width: calc(2 * var(--R));
    aspect-ratio: 1;
    border-radius: 50%;
    display: grid;
    -webkit-mask: linear-gradient(#000 0 0);
    animation: l30 2s infinite linear;
}
.loader::before,
.loader::after {
    content: '';
    grid-area: 1/1;
    width: 50%;
    background:
        radial-gradient(farthest-side, var(--g1))
            calc(var(--R) + 0.866 * var(--R) - var(--R))
            calc(var(--R) - 0.5 * var(--R) - var(--R)),
        radial-gradient(farthest-side, var(--g1))
            calc(var(--R) + 0.866 * var(--R) - var(--R))
            calc(var(--R) - 0.5 * var(--R) - var(--R)),
        radial-gradient(farthest-side, var(--g2))
            calc(var(--R) + 0.5 * var(--R) - var(--R))
            calc(var(--R) - 0.866 * var(--R) - var(--R)),
        radial-gradient(farthest-side, var(--g1)) 0 calc(-1 * var(--R)),
        radial-gradient(farthest-side, var(--g2))
            calc(var(--R) - 0.5 * var(--R) - var(--R))
            calc(var(--R) - 0.866 * var(--R) - var(--R)),
        radial-gradient(farthest-side, var(--g1))
            calc(var(--R) - 0.866 * var(--R) - var(--R))
            calc(var(--R) - 0.5 * var(--R) - var(--R)),
        radial-gradient(farthest-side, var(--g2)) calc(-1 * var(--R)) 0,
        radial-gradient(farthest-side, var(--g1))
            calc(var(--R) - 0.866 * var(--R) - var(--R))
            calc(var(--R) + 0.5 * var(--R) - var(--R));
    background-size: calc(2 * var(--R)) calc(2 * var(--R));
    background-repeat: no-repeat;
}
.loader::after {
    transform: rotate(180deg);
    transform-origin: right;
}

@keyframes l30 {
    100% {
        transform: rotate(-1turn);
    }
}
</style>
