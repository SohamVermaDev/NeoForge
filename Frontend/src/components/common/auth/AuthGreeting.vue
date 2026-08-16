<script setup>
defineProps({
    mode: {
        type: String,
        required: true,
        validator: (val) => ["login", "register"].includes(val),
    },
});

defineEmits(["toggle"]);
</script>

<template>
    <div class="auth-greeting">
        <div class="greeting-content">
            <h2 class="logo"><span class="neo">Neo</span><span class="forge">Forge</span></h2>

            <div class="greeting-text">
                <Transition name="fade-text" mode="out-in">
                    <div :key="mode" class="greeting-text-wrapper">
                        <h2>{{ mode === "login" ? "Welcome Back, Champion" : "Level Up" }}</h2>
                        <p class="desc">
                            {{ mode === "login" ? "Your next battle awaits. Sign in to continue." : "Join the hunt and unlock your game library." }}
                        </p>
                        <p class="toggle-hint">
                            {{ mode === "login" ? "New here? Start your quest." : "Returning? Drop back in!" }}
                        </p>
                    </div>
                </Transition>
            </div>

            <Transition name="fade-text" mode="out-in">
                <button :key="mode" class="toggle-btn" @click="$emit('toggle')">
                    {{ mode === "login" ? "REGISTER" : "LOG IN" }}
                </button>
            </Transition>
        </div>
    </div>
</template>

<style scoped lang="scss">
.auth-greeting {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: colors.$text-primary;
    position: relative;
    z-index: 1;

    .greeting-content {
        max-width: 28rem;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;

        .logo {
            font-size: 2.75rem;
        }

        .greeting-text {
            @include mixins.flex-center;
            @include mixins.flex-column;
            gap: 1.2rem;

            .greeting-text-wrapper {
                @include mixins.flex-center;
                @include mixins.flex-column;
                gap: 1.2rem;
            }

            h2 {
                font-size: 1.75rem;
                font-weight: 700;
                letter-spacing: -0.02em;
                text-shadow: 0 2px 20px rgba(0, 0, 0, 0.25);
            }

            p {
                font-size: 0.95rem;
                line-height: 1.8;
                max-width: 24rem;
                text-shadow: 0 1px 12px rgba(0, 0, 0, 0.15);

                &.desc {
                    opacity: 0.9;
                }

                &.toggle-hint {
                    opacity: 0.7;
                    font-size: 0.85rem;
                    font-weight: 400;
                    letter-spacing: 0.02em;
                    text-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);
                }
            }
        }

        .toggle-btn {
            @include mixins.focus-ring(colors.$accent, colors.$gray-50);
            padding: 0.85rem 3rem;
            background: transparent;
            border: 2px solid colors.$gray-50;
            border-radius: variables.$radius;
            color: colors.$gray-50;
            font-weight: 700;
            font-size: 0.95rem;
            letter-spacing: 0.1em;
            cursor: pointer;
            transition: variables.$transition-smooth;

            &:hover {
                background: colors.$gray-50;
                color: colors.$accent;
                transform: scale(1.02);
                box-shadow: 0 0 30px functions.alpha(colors.$gray-50, 0.15);
            }
        }
    }
}

.fade-text-enter-active,
.fade-text-leave-active {
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-text-enter-from {
    opacity: 0;
    transform: translateY(6px);
}

.fade-text-leave-to {
    opacity: 0;
    transform: translateY(-6px);
}
</style>
