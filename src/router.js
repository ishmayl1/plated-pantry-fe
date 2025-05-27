import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  // Example route
  {
    path: '/',
    name: 'Home',
    component: () => import('./components/HelloWorld.vue'),
  },
];

export default routes;
