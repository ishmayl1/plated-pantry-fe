import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/components/LoginPage.vue') // <-- use @ alias for consistency
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/components/RegisterPage.vue')
    },
    {
        path: '/',
        name: 'Dashboard',
        component: () => import('@/components/MainLayout.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/plans',
        name: 'Plans',
        component: () => import('@/components/Plans.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/orders',
        name: 'Orders',
        component: () => import('@/components/Orders.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/recipes',
        name: 'Recipes',
        component: () => import('@/components/Recipes.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/support',
        name: 'Support',
        component: () => import('@/components/Support.vue'),
        meta: { requiresAuth: true }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes // <-- fix: pass as 'routes', not just 'routes'
});

router.beforeEach((to, from, next) => {
    const auth = useAuthStore();
    if (to.meta.requiresAuth && !auth.isAuthenticated) {
        next({ name: 'Login' });
    } else {
        next();
    }
});

export default router;
