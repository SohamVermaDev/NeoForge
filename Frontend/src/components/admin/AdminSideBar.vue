<script setup>
import { onMounted, ref } from "vue";

const collapsed = ref(false);

const toggleCollapse = () => {
    collapsed.value = !collapsed.value;
    localStorage.setItem("IsCollapsed", collapsed.value);
};

onMounted(() => {
    const saved = localStorage.getItem("IsCollapsed");
    if (saved !== null) collapsed.value = saved === "true";
});

const navLinks = [
    { icon: "fas fa-home", label: "Dashboard", route: "/admin/dashboard" },
    { icon: "fa-solid fa-users", label: "Customers", route: "/admin" },
    { icon: "fa-solid fa-cubes", label: "Games", route: "/admin/games" },
    { icon: "fa-solid fa-cart-shopping", label: "Orders", route: "/admin" },
    { icon: "fa-solid fa-chart-pie", label: "Reports", route: "/admin" },
    { icon: "fa-solid fa-gear", label: "Settings", route: "/admin" },
];
</script>

<template>
    <div class="sidebar" :class="{ collapsed: collapsed }">
        <div class="heading">
            <h2 v-if="!collapsed" class="logo"><span class="neo">Neo</span><span class="forge">Forge</span></h2>
            <button @click="toggleCollapse()">
                <i class="fas fa-bars" />
            </button>
        </div>
        <hr class="divider" />
        <ul class="nav-links">
            <li v-for="link in navLinks" :key="link.route" class="list-item">
                <router-link :to="link.route" exact-active-class="active" class="link">
                    <i :class="link.icon" class="icon" />
                    <p class="nav-text">{{ link.label }}</p>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
.sidebar {
    width: 17.5rem;
    z-index: 99;
    height: 100vh;
    position: sticky;
    top: 0;
    left: 0;
    overflow: hidden;
    border-right: 2px solid colors.$border-divider;
    background-color: colors.$bg-sidebar;
    transition: variables.$transition-smooth;

    .heading {
        @include mixins.flex-center;
        height: 5rem;
        width: 100%;
        gap: 1rem;

        i {
            color: colors.$text-primary;
            font-size: 1.6rem;
            line-height: 5rem;
            user-select: none;
        }

        button {
            background: none;
            height: 74px;
            border: none;
            cursor: pointer;
            color: colors.$text-primary;
            transition: variables.$transition-smooth;

            &:focus-visible {
                @include mixins.focus-ring;
                background: functions.alpha(colors.$accent, 0.08);
            }
        }
    }

    .divider {
        border: none;
        border-top: variables.$border-base;
        margin: 0;
        width: 100%;
        flex-shrink: 0;
    }

    .nav-links {
        @include mixins.flex-column;
        gap: 0.35rem;
        margin-top: 1.25rem;
        padding: 0 0.75rem;
        width: 100%;

        .list-item {
            width: 100%;

            .link {
                @include mixins.flex-center;
                justify-content: flex-start;
                gap: 1rem;
                height: 46px;
                padding: 0 0.75rem;
                border-radius: variables.$radius;
                font-size: 1rem;
                font-weight: 500;
                cursor: pointer;
                user-select: none;
                transition: variables.$transition-smooth;

                &:focus-visible {
                    @include mixins.focus-ring;
                }

                .icon {
                    font-size: 1.1rem;
                    width: 1.5rem;
                    text-align: center;
                    flex-shrink: 0;
                    transition: variables.$transition-smooth;
                }

                .nav-text {
                    white-space: nowrap;
                    transition: opacity 0.2s ease;
                }

                &:not(.active) {
                    .icon,
                    .nav-text {
                        color: colors.$text-secondary;
                    }

                    &:hover {
                        background: functions.alpha(colors.$accent, 0.06);

                        .icon {
                            color: colors.$accent;
                        }

                        .nav-text {
                            color: colors.$text-primary;
                        }
                    }
                }

                &.active {
                    background: functions.alpha(colors.$accent, 0.1);

                    .icon {
                        color: colors.$accent;
                    }

                    .nav-text {
                        color: colors.$text-primary;
                    }
                }
            }
        }
    }

    &.collapsed {
        width: 5rem;

        .nav-links {
            padding: 0 0.75rem;

            .link {
                padding-left: 1rem;

                .nav-text {
                    opacity: 0;
                    pointer-events: none;
                }
            }
        }
    }
}
</style>
