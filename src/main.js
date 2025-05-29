import { createApp } from 'vue';
import App from '@/App.vue';
import { createPinia } from 'pinia';
import router from '@/router'; // <-- Import the router instance, not routes
import vuetify from '@/plugins/vuetify';
import { createHead } from '@vueuse/head';
import '@/style.css';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';
import '@mdi/font/css/materialdesignicons.css'; // <-- Import Material Design Icons CSS

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

// Initialize stores before mounting
const auth = useAuthStore();
auth.initialize();
const userStore = useUserStore();
userStore.initialize();

app.use(router); // <-- Use the router instance
app.use(vuetify);
app.use(createHead());
app.mount('#app');
