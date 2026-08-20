import { createApp } from "vue";
import { createPinia } from "pinia";
import { useAuthStore } from "@/stores/auth.js";
import App from "./App.vue";
import router from "./router/index.js";
import "./styles/global.scss";
import "@fontsource/orbitron/700.css";

const app = createApp(App);
app.use(createPinia());
app.use(router);

const authStore = useAuthStore();
authStore.loadFromLocalStorage();
app.mount("#app");
