import { createApp } from 'vue';
import App from '@/App.vue';
import { createPinia } from 'pinia';
import router from '@/router';
import vuetify from '@/plugins/vuetify';
import { createHead } from '@vueuse/head';
import '@/style.css';
import { useAuthStore } from '@/stores/auth';
import '@mdi/font/css/materialdesignicons.css';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

// Initialize sets JWT and User data from localStorage/sessionStorage
const auth = useAuthStore();
auth.initialize();

app.use(router);
app.use(vuetify);
app.use(createHead());
app.mount('#app');
