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

        &,
        * {
            &::-webkit-scrollbar {
                width: 10px;
                height: 10px;
            }

            &::-webkit-scrollbar-track {
                background: colors.$bg-sidebar;
                border-radius: 10px;
            }

            &::-webkit-scrollbar-thumb {
                background: functions.alpha(colors.$accent, 0.4);
                border-radius: 10px;
            }

            &::-webkit-scrollbar-thumb:hover {
                background: colors.$accent;
            }

            &::-webkit-scrollbar-corner {
                background: colors.$bg-sidebar;
            }
        }
    }
}
</style>
