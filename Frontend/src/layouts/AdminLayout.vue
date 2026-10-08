<script setup>
import AdminSideBar from "@/components/admin/AdminSideBar.vue";
</script>

<template>
    <div class="admin-layout">
        <AdminSideBar />
        <main>
            <router-view />
            <!-- This is where Dashboard, GamesManage, etc. go -->
        </main>
    </div>
</template>

<style lang="scss" scoped>
.admin-layout {
    display: flex;
    height: 100dvh;
    overflow: hidden;
    background-color: colors.$bg-body;

    main {
        min-width: 0;
        min-height: 0;
        flex: 1;
        overflow: auto;
    }
}
</style>
