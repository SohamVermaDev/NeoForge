import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
    const token = ref(null);
    const user = ref(null);

    const isAuthenticated = computed(() => !!token.value);
    const isAdmin = computed(() => user.value?.role === "admin");

    function logout() {
        token.value = null;
        user.value = null;
    }

    return {
        token,
        user,
        isAuthenticated,
        isAdmin,
        logout,
    };
});
