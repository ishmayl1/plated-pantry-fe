import { createApp } from 'vue';
import App from '@/App.vue';
import { createPinia } from 'pinia';
import router from '@/router'; // <-- Import the router instance, not routes
import vuetify from '@/plugins/vuetify';
import { createHead } from '@vueuse/head';
import '@/style.css';
import { useAuthStore } from '@/stores/auth';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

// Initialize auth store before mounting
const auth = useAuthStore();
auth.initialize();

app.use(router); // <-- Use the router instance
app.use(vuetify);
app.use(createHead());
app.mount('#app');
