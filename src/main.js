import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import routes from './router';
import vuetify from './plugins/vuetify';
import { createHead } from '@vueuse/head';
import './style.css';

const app = createApp(App);
app.use(createPinia());
app.use(createRouter({ history: createWebHistory(), routes }));
app.use(vuetify);
app.use(createHead());
app.mount('#app');
