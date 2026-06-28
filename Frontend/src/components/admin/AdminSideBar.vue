<script setup>
import { onMounted, ref } from 'vue';

const collapsed = ref(false);

// biome-ignore lint/correctness/noUnusedVariables: used in hamburger icon's @click directive
const collapse_sidebar = () => {
    collapsed.value = !collapsed.value;
    localStorage.setItem('IsCollapsed', collapsed.value);
};

onMounted(() => {
    const saved = localStorage.getItem('IsCollapsed');
    if (saved !== null) {
        collapsed.value = saved === 'true';
    }
});

// biome-ignore lint/correctness/noUnusedVariables: used in v-for template
const navLinks = [
    { icon: 'fas fa-home', label: 'Dashboard', route: '/admin/dashboard' },
    { icon: 'fa-solid fa-users', label: 'Customers', route: '/admin' },
    { icon: 'fa-solid fa-cubes', label: 'Games', route: '/admin' },
    { icon: 'fa-solid fa-cart-shopping', label: 'Orders', route: '/admin' },
    { icon: 'fa-solid fa-chart-pie', label: 'Reports', route: '/admin' },
    { icon: 'fa-solid fa-gear', label: 'Settings', route: '/admin' },
];
</script>

<template>
    <div class="sidebar" :class="{'collapsed': collapsed}">
        <div class="heading">
            <h2 v-if="collapsed === false" class="logo"><span class="neo">Neo</span><span class="forge">Forge</span></h2>
            <button @click="collapse_sidebar()"><i class="fas fa-bars"></i></button>
        </div>
        <hr class="divider">
        <ul class="nav-links">
            <li v-for="link in navLinks" :key="link.route" class="list-item">
                <router-link :to="link.route" exact-active-class="active" class="link">
                    <i :class="link.icon" class="icon"></i>
                    <p v-if="collapsed === false" class="nav-text">{{ link.label }}</p>
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
    }

    .nav-links {
        @include mixins.flex-center;
        flex-direction: column;
        gap: 1.25rem;
        margin-top: 2rem;
        overflow-x: clip;
        width: 100%;

        .list-item {
            width: 100%;
        
            .link {
                @include mixins.flex-center;
                transition: variables.$transition-smooth;
                justify-content: left;
                height: 50px;
                font-size: 1.2rem;
                cursor: pointer;
                user-select: none;

                &:focus-visible {
                    @include mixins.focus-ring;
                    background: functions.alpha(colors.$accent, 0.08);
                }

                .icon {
                    transition: variables.$transition-smooth;
                    font-size: 1.4rem;
                    width: 20px;
                    margin-left: 1.5rem;
                }

                .nav-text {
                    margin-left: 1.5rem;
                }

                &:not(.active) {
                    .icon,
                    .nav-text {
                        color: colors.$text-secondary;
                    }

                    &:hover {
                        // background: functions.alpha(colors.$gray-600, 0.9);
                        background: colors.$gray-600;
                        opacity: 0.9;

                        .icon {
                            color: colors.$accent-hover;
                        }

                        .nav-text {
                            color: colors.$text-primary;
                        }
                    }
                }

                &.active {
                    border-right: 0.5rem solid colors.$accent;

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
    }
}
</style>