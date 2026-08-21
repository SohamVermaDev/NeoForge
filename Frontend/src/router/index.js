import { createRouter, createWebHistory } from "vue-router";
import AdminLayout from "@/layouts/AdminLayout.vue";
import Dashboard from "@/views/admin/Dashboard.vue";
import Games from "@/views/admin/GamesManage.vue";
import AuthPage from "@/views/auth/AuthPage.vue";

import { useAuthStore } from "@/stores/auth";

const routes = [
    {
        path: "/login",
        component: AuthPage,
        props: { mode: "login" },
    },
    {
        path: "/register",
        component: AuthPage,
        props: { mode: "register" },
    },
    {
        path: "/admin",
        component: AdminLayout,
        children: [
            { path: "", redirect: "/admin/dashboard" },
            { path: "dashboard", component: Dashboard },
            { path: "games", component: Games },
        ],
    },
    { path: "/", redirect: "/admin" },
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((to) => {
    const authStore = useAuthStore();

    if (to.path.startsWith("/admin") && !authStore.isAuthenticated && !authStore.isAdmin) {
        return "/login";
    }

    if ((to.path === "/login" || to.path === "/register") && authStore.isAuthenticated && authStore.isAdmin) {
        return "/admin";
    }

    return true;
});
export default router;
