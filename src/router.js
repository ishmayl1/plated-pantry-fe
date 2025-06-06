import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/components/LoginPage.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/components/RegisterPage.vue')
    },
    {
        path: '/',
        component: () => import('@/components/MainLayout.vue'),
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                name: 'Dashboard',
                component: () => import('@/components/DashboardComponent.vue') // Replace with Dashboard.vue if available
            },
            {
                path: 'plans',
                name: 'Plans',
                component: () => import('@/components/Plans.vue')
            },
            {
                path: 'orders',
                name: 'Orders',
                component: () => import('@/components/Orders.vue')
            },
            {
                path: 'recipes',
                name: 'Recipes',
                component: () => import('@/components/RecipesList.vue')
            },
            {
                path: 'support',
                name: 'Support',
                component: () => import('@/components/Support.vue')
            }
        ]
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
