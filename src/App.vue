<script setup>
import { ref } from 'vue';
import { useFetch } from '@vueuse/core';
import axios from 'axios';
import _ from 'lodash';
</script>

<template>
    <div class="themed-app">
        <router-view />
    </div>
</template>

<style scoped>
.themed-app {
    background: var(--color-background);
    color: var(--color-text);
    min-height: 100vh;
    transition:
        background 0.2s,
        color 0.2s;
}
</style>
