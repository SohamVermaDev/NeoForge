<script setup>
import AdminSideBar from '@/components/admin/AdminSideBar.vue';
</script>

<template>
    <div class="admin-layout">
        <AdminSideBar />
        <main>
            <router-view /> <!-- This is where Dashboard, GamesManage, etc. go -->
        </main>
    </div>
</template>

<style lang="scss" scoped>
.admin-layout {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: colors.$bg-body;

    main {
        width: 100%;
        min-height: 100vh;
    }
}
</style>