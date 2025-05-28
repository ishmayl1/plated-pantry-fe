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
        name: 'Home',
        component: () => import('@/components/MainLayout.vue'),
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
