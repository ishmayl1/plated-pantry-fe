<script setup>
import { ref } from 'vue';

function isEven(num) {
    return num % 2 === 0;
}

defineProps({
    msg: String
});

const count = ref(0);
</script>

<template>
    <h1>{{ msg }}</h1>

    <div class="card">
        <button type="button" @click="count++">count is {{ count }}</button>
        <p class="text-line">
            Edit
            <code>components/HelloWorld.vue</code> to test HMR
        </p>
    </div>
</template>

<style scoped lang="scss">
.read-the-docs {
    color: $primary-color;
}

.card {
    padding: 2rem;
    border: 2px solid $secondary-color;
    @include flex-center;
    flex-direction: column;
}
.text-line {
    color: $primary-color;
}
</style>
