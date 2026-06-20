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