<script setup>
import { useRouter } from "vue-router";
import AuthForm from "./AuthForm.vue";
import AuthGreeting from "./AuthGreeting.vue";

const props = defineProps({
    mode: {
        type: String,
        required: true,
    },
});

const router = useRouter();
const emit = defineEmits(["update:mode"]);

const handleToggle = () => {
    const targetMode = props.mode === "login" ? "register" : "login";
    router.push(`/${targetMode}`);
};
</script>

<template>
    <div class="auth-container">
        <div class="auth-card" :class="{ 'is-register': mode === 'register' }">
            <div class="auth-slider">
                <div class="panel form-panel">
                    <AuthForm :mode="'login'" :reset="mode" />
                </div>

                <div class="panel greeting-panel">
                    <div class="grid-overlay"></div>
                    <AuthGreeting :mode="mode" @toggle="handleToggle" />
                </div>

                <div class="panel form-panel">
                    <AuthForm :mode="'register'" :reset="mode" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.auth-container {
    width: 100%;
    max-width: 72rem;
    height: 36rem;
    position: relative;
}

.auth-card {
    background: colors.$bg-card;
    border-radius: variables.$radius-lg;
    border: variables.$border-light;
    overflow: hidden;
    height: 100%;
    box-shadow: variables.$shadow-lg;
    position: relative;
}

.auth-slider {
    display: flex;
    height: 100%;
    width: 150%;
    transition: transform 0.6s cubic-bezier(0.6, 0, 0.4, 1);
    transform: translateX(0);

    .is-register & {
        transform: translateX(-33.333%);
    }
}

.panel {
    flex: 0 0 33.333%;
    height: 100%;
    padding: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    &.form-panel {
        background: colors.$bg-card;
    }

    &.greeting-panel {
        background: linear-gradient(160deg, #061935, colors.$accent);
        border-radius: variables.$radius-lg;
        position: relative;
        overflow: hidden;

        &::before {
            content: "";
            position: absolute;
            inset: 0;
            background: radial-gradient(ellipse at 30% 40%, transparent 40%, rgba(6, 25, 53, 0.4) 100%);
            z-index: 0;
            pointer-events: none;
        }

        &::after {
            content: "";
            position: absolute;
            top: -30%;
            right: -20%;
            width: 80%;
            height: 80%;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%);
            z-index: 0;
            pointer-events: none;
        }

        .grid-overlay {
            position: absolute;
            inset: 0;
            z-index: 0;
            pointer-events: none;
            background-image:
                linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
            background-size: 40px 40px;
        }

        .auth-greeting {
            position: relative;
            z-index: 1;
        }
    }
}
</style>
