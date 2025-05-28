<script setup>
import HelloWorld from '@/components/HelloWorld.vue';
import { ref } from 'vue';
import { useFetch } from '@vueuse/core';
import axios from 'axios';
import _ from 'lodash';
</script>

<template>
    <HelloWorld msg="Sup Gangsta" />
</template>

<style scoped></style>
