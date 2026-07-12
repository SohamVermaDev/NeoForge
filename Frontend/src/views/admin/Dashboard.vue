<script setup>
import { ref } from "vue";
import StatCard from "@/components/admin/Dashboard/StatCard.vue";

const stats = ref({
    revenue: 12480,
    users: 1284,
    games: 342,
    lowStock: 6,
});
</script>

<template>
    <div class="dashboard-grid">
        <StatCard label="Revenue" :value="stats.revenue" prefix="$" icon="fas fa-dollar-sign" icon-bg="rgba(16, 185, 129, 0.15)" />
        <StatCard label="Users" :value="stats.users" icon="fas fa-users" icon-bg="rgba(59, 130, 246, 0.15)" />
        <StatCard label="Games" :value="stats.games" icon="fas fa-gamepad" icon-bg="rgba(245, 158, 11, 0.15)" />
        <StatCard label="Low Stock" :value="stats.lowStock" icon="fas fa-exclamation-triangle" icon-bg="rgba(239, 68, 68, 0.15)" />
    </div>
</template>

<style scoped lang="scss">
.dashboard-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.25rem;
}
</style>
