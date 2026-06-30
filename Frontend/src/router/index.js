import { createRouter, createWebHistory } from 'vue-router';
import AdminLayout from '@/layouts/AdminLayout.vue';
import Dashboard from '@/views/admin/Dashboard.vue';
import Games from '@/views/admin/GamesManage.vue';

const routes = [
    {
        path: '/admin',
        component: AdminLayout,
        children: [
            { path: '', redirect: '/admin/dashboard' },
            { path: 'dashboard', component: Dashboard },
            { path: 'games', component: Games },
        ],
    },
];

const router = createRouter({ history: createWebHistory(), routes });
export default router;
