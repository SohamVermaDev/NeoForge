import { createRouter, createWebHistory } from "vue-router";
import AdminLayout from "@/layouts/AdminLayout.vue";
import Dashboard from "@/views/admin/Dashboard.vue";
import Games from "@/views/admin/GamesManage.vue";
import AuthPage from "@/views/auth/AuthPage.vue";

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
export default router;
