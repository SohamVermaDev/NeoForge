import { createRouter, createWebHistory } from 'vue-router';
import AdminLayout from '@/layouts/AdminLayout.vue';
import Dashboard from '@/views/admin/Dashboard.vue';

const routes = [
    {
        path: '/admin',
        component: AdminLayout,
        children: [
            { path: '', redirect: 'dashboard' },
            { path: 'dashboard', component: Dashboard },
        ],
    },
];

const router = createRouter({ history: createWebHistory(), routes });
export default router;
