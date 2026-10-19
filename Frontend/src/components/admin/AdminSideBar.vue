<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const user = computed(() => authStore.user);

const collapsed = ref(false);

const toggleCollapse = () => {
    collapsed.value = !collapsed.value;
    localStorage.setItem("IsCollapsed", collapsed.value);
};

const popoverOpen = ref(false);
const profileTrigger = ref(null);
const popoverLogoutRef = ref(null);

const userInitial = computed(() => user.value.username?.charAt(0).toUpperCase() || "?");

const togglePopover = () => {
    if (collapsed.value) {
        toggleCollapse();
        setTimeout(() => {
            popoverOpen.value = true;
        }, 300);
    } else {
        popoverOpen.value = !popoverOpen.value;
    }
};

const closePopover = () => {
    popoverOpen.value = false;
};

const handleClickOutside = (e) => {
    if (popoverOpen.value && profileTrigger.value && !profileTrigger.value.contains(e.target) && !e.target.closest(".popover")) {
        closePopover();
    }
};

const handleEscape = (e) => {
    if (e.key === "Escape" && popoverOpen.value) {
        closePopover();
        profileTrigger.value?.focus();
    }
};

const handlePopoverFocusOut = (e) => {
    const nextFocus = e.relatedTarget;

    if (!nextFocus || (!nextFocus.closest(".popover") && !nextFocus.closest(".profile-info"))) {
        closePopover();
    }
};

const handleLogout = () => {
    closePopover();
    authStore.logout();
    router.push("/login");
};

watch(
    popoverOpen,
    (isOpen) => {
        if (isOpen) popoverLogoutRef.value?.focus();
    },
    { flush: "post" }
);

onMounted(() => {
    const saved = localStorage.getItem("IsCollapsed");
    if (saved !== null) collapsed.value = saved === "true";
    
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
});

onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
    document.removeEventListener("keydown", handleEscape);
});

const navLinks = [
    { icon: "fas fa-home", label: "Dashboard", route: "/admin/dashboard" },
    { icon: "fa-solid fa-users", label: "Customers", route: "/admin" },
    { icon: "fa-solid fa-cubes", label: "Games", route: "/admin/games" },
    { icon: "fa-solid fa-cart-shopping", label: "Orders", route: "/admin" },
    { icon: "fa-solid fa-chart-pie", label: "Reports", route: "/admin" },
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
        
        <div class="bottom-block">
            <ul class="nav-links">
                <li class="list-item">
                    <router-link to="/admin" exact-active-class="active" class="link">
                        <i class="fas fa-gear icon" />
                        <p v-if="!collapsed" class="nav-text">Settings</p>
                    </router-link>
                </li>
            </ul>

            <div class="profile">
                <button class="profile-info" ref="profileTrigger" @click="togglePopover">
                    <span class="avatar">
                        {{ userInitial }}
                    </span>
                    <span v-if="!collapsed" class="name">{{ user.username }}</span>
                </button>

                <button v-if="!collapsed" class="logout" @click="handleLogout">
                    <i class="fas fa-arrow-right-from-bracket" />
                </button>

                <Transition name="popover">
                    <div v-if="popoverOpen" class="popover" @focusout="handlePopoverFocusOut">
                        <div class="popover-header">
                            <p class="popover-name">{{ user.username }}</p>
                            <p class="popover-email">{{ user.email }}</p>
                        </div>

                        <hr class="popover-divider" />

                        <button class="popover-logout" ref="popoverLogoutRef" @click="handleLogout">
                            <i class="fas fa-arrow-right-from-bracket" />
                            <span>Log out</span>
                        </button>
                    </div>
                </Transition>
            </div>
        </div>
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
    display: flex;
    flex-direction: column;

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

    .bottom-block {
        margin-top: auto;
        padding-top: 1.25rem;
        display: flex;
        flex-direction: column;
        flex-shrink: 0;

        .nav-links {
            margin-top: 0;
        }
    }

    .profile {
        @include mixins.flex-center;
        justify-content: flex-start;
        gap: 0.75rem;
        position: relative;
        padding: 1rem;
        padding-left: 0.75rem;
        flex-shrink: 0;
        transition: variables.$transition-smooth;

        .profile-info {
            @include mixins.flex-center;
            @include mixins.focus-ring;
            gap: 0.75rem;
            min-width: 0;
            border-radius: 0.5rem;
            padding: 0.5rem 0.75rem;
            cursor: pointer;
            background: transparent;
            border: none;
            font: inherit;
            color: inherit;
            text-align: inherit;
            transition: variables.$transition-smooth;
            user-select: none;

            .avatar {
                width: 2.25rem;
                height: 2.25rem;
                border-radius: 50%;
                background: functions.alpha(colors.$accent, 0.15);
                color: colors.$accent;
                font-weight: 700;
                font-size: 0.95rem;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                user-select: none;
                border: 1px solid functions.alpha(colors.$accent, 0.25);
            }

            .name {
                font-size: 0.9rem;
                font-weight: 600;
                color: colors.$text-primary;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            &:hover {
                background: functions.alpha(colors.$accent, 0.06);
            }
        }

        .logout {
            background: transparent;
            border: none;
            color: colors.$text-secondary;
            font-size: 1rem;
            cursor: pointer;
            margin-left: auto;
            padding: 0.5rem;
            border-radius: variables.$radius;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: variables.$transition-smooth;
            flex-shrink: 0;

            &:hover {
                color: colors.$status-error;
                background: functions.alpha(colors.$status-error, 0.08);
            }

            &:focus-visible {
                @include mixins.focus-ring(colors.$bg-card, colors.$status-error);
            }
        }

        .popover {
            position: absolute;
            bottom: 100%;
            left: 1rem;
            right: 1rem;
            background: colors.$bg-card;
            border: variables.$border-light;
            border-radius: variables.$radius;
            box-shadow: variables.$shadow-lg;
            padding: 0.5rem;
            z-index: 100;

            .popover-header {
                padding: 0.85rem 0.9rem 0.75rem;

                .popover-name {
                    font-size: 0.92rem;
                    font-weight: 600;
                    color: colors.$text-primary;
                    margin-bottom: 0.2rem;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .popover-email {
                    font-size: 0.78rem;
                    color: colors.$text-secondary;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }

            .popover-divider {
                border: none;
                border-top: variables.$border-light;
                margin: 0.35rem 0;
            }

            .popover-logout {
                @include mixins.flex-center;
                justify-content: flex-start;
                gap: 0.75rem;
                width: 100%;
                padding: 0.75rem 0.9rem;
                background: transparent;
                border: none;
                border-radius: variables.$radius;
                color: colors.$text-secondary;
                font-size: 0.88rem;
                font-weight: 500;
                cursor: pointer;
                transition: variables.$transition-smooth;

                i {
                    font-size: 0.9rem;
                    width: 1rem;
                    text-align: center;
                }

                &:hover {
                    color: colors.$status-error;
                    background: functions.alpha(colors.$status-error, 0.08);
                }

                &:focus {
                    @include mixins.focus-ring(colors.$bg-card, colors.$status-error);
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

        .profile {
            padding: 1rem 0.625rem;

            .profile-info {
                flex: none;
            }
        }
    }
}

.popover-enter-active,
.popover-leave-active {
    transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1);
}

.popover-enter-from,
.popover-leave-to {
    opacity: 0;
    transform: translateY(6px);
}
</style>
