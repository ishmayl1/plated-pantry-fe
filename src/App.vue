<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue';
import { useFetch } from '@vueuse/core';
import axios from 'axios';
import _ from 'lodash';

const { data } = useFetch('https://jsonplaceholder.typicode.com/todos/1');
const message = ref('Hello from Vue 3 + Vite + Pinia + Vuetify + Vue Router + VueUse + Axios + Lodash!');

async function fetchData() {
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos/2');
  message.value = _.capitalize(response.data.title);
}
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <v-app>
    <v-main>
      <h1>{{ message }}</h1>
      <p>Fetched: {{ data?.title }}</p>
      <v-btn color="primary" @click="fetchData">Fetch with Axios + Lodash</v-btn>
      <router-view />
    </v-main>
  </v-app>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
h1 {
  margin-bottom: 1rem;
}
</style>
