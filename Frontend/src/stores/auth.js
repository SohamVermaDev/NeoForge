import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { loginRequest, registerRequest } from "@/services/authService";

export const useAuthStore = defineStore("auth", () => {
    const token = ref(null);
    const user = ref(null);

    const isAuthenticated = computed(() => !!token.value);
    const isAdmin = computed(() => user.value?.role === "admin");

    async function register(username, email, password) {
        await registerRequest(username, email, password);
        return { success: true };
    }

    async function login(email, password) {
        try {
            const data = await loginRequest(email, password);
            token.value = data.token;
            user.value = {
                id: data.userId,
                username: data.username,
                email: data.email,
                role: data.role,
            };
            return { success: true };
        } catch (error) {
            throw error;
        }
    }

    function logout() {
        token.value = null;
        user.value = null;
    }

    return {
        token,
        user,
        isAuthenticated,
        isAdmin,
        register,
        login,
        logout,
    };
});
