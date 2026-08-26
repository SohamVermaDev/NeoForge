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
    { path: "/" },
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((to) => {
    const authStore = useAuthStore();

    if (to.path.startsWith("/admin")) {
        if (authStore.isAuthenticated) {
            if (authStore.isAdmin) {
                return true;
            } else {
                return "/";
            }
        } else {
            return "/login";
        }
    }

    if (to.path === "/login" || to.path === "/register") {
        if (authStore.isAuthenticated) {
            if (authStore.isAdmin) {
                return "/admin";
            }
        }
        return true;
    }

    return true;
});
export default router;
