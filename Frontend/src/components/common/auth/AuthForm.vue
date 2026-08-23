<script setup>
import { reactive, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const props = defineProps({
    mode: {
        type: String,
        required: true,
        validator: (val) => ["login", "register"].includes(val),
    },
});

const form = reactive({
    username: "",
    email: "",
    password: "",
});

const isLoading = ref(false);

const showPassword = ref(false);

const message = reactive({
    text: "",
    type: "",
    visible: false,
});

const setMessage = (text, type) => {
    message.text = text;
    message.type = type;
    message.visible = true;
};

const clearMessage = () => {
    message.text = "";
    message.type = "";
    message.visible = false;
};

const handleSubmit = async () => {
    clearMessage();
    isLoading.value = true;

    try {
        if (props.mode === "login") {
            await authStore.login(form.email, form.password);
            setMessage("Welcome back!", "success");

            setTimeout(() => {
                router.push("/dashboard");
            }, 1500);
        } else {
            await authStore.register(form.username, form.email, form.password);

            setTimeout(() => {
                router.push("/login");
            }, 1500);

            setMessage("Account created successfully!", "success");
        }
    } catch (error) {
        setMessage("Something when wrong! Please try again.", "error");
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <div class="auth-form">
        <div class="form-header">
            <Transition name="fade-text" mode="out-in">
                <div :key="mode" class="form-header-wrapper">
                    <h1>{{ mode === "login" ? "Sign In" : "Create Account" }}</h1>
                    <p class="subtitle">
                        {{ mode === "login" ? "Ready to play?" : "Start your journey" }}
                    </p>
                </div>
            </Transition>
        </div>

        <form @submit.prevent="handleSubmit" class="form-body">
            <div v-if="mode === 'register'" class="form-group">
                <label for="username">Username</label>
                <input id="username" v-model="form.username" type="text" required placeholder="Choose a username" autocomplete="username" />
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input id="email" v-model="form.email" type="email" required placeholder="Enter your email" autocomplete="email" />
            </div>

            <div class="form-group password-group">
                <label for="password">Password</label>
                <div class="password-input-wrapper">
                    <input
                        id="password"
                        v-model="form.password"
                        :type="showPassword ? 'text' : 'password'"
                        required
                        placeholder="Enter your password"
                        autocomplete="current-password"
                    />
                    <button type="button" class="toggle-password" @click="showPassword = !showPassword">
                        <i :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                    </button>
                </div>
            </div>

            <div v-if="message.visible" class="message-box" :class="message.type">
                {{ message.text }}
            </div>

            <button type="submit" class="submit-btn" :disable="isLoading">
                <span v-if="isLoading" class="spinner"></span>
                <span v-else>{{ mode === "login" ? "SIGN IN" : "SIGN UP" }}</span>
            </button>
        </form>
    </div>
</template>

<style scoped lang="scss">
.auth-form {
    width: 100%;
    max-width: 26rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    .form-header {
        h1 {
            font-size: 2rem;
            font-weight: 700;
            color: colors.$text-primary;
            letter-spacing: -0.02em;
            margin-bottom: 0.25rem;
        }

        .subtitle {
            font-size: 0.9rem;
            opacity: 0.6;
            color: colors.$text-secondary;
        }
    }

    .form-body {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;

        .form-group {
            label {
                display: block;
                font-weight: 600;
                font-size: 0.9rem;
                color: colors.$text-primary;
                margin-bottom: 0.3rem;
            }

            input {
                width: 100%;
                padding: 0.8rem 1rem;
                background: colors.$bg-body;
                border: variables.$border-light;
                border-radius: variables.$radius;
                color: colors.$text-primary;
                font-size: 0.95rem;
                transition: variables.$transition-smooth;
                outline: none;

                @include mixins.focus-ring(colors.$bg-body, colors.$accent);

                &:user-valid {
                    border-color: colors.$status-success;
                    box-shadow: 0 0 0 2px functions.alpha(colors.$status-success, 0.2);
                }

                &:user-invalid {
                    border-color: colors.$status-error;
                    box-shadow: 0 0 0 2px functions.alpha(colors.$status-error, 0.2);
                }

                &::placeholder {
                    color: functions.alpha(colors.$text-secondary, 0.4);
                }
            }
        }

        .password-group {
            .password-input-wrapper {
                position: relative;

                input {
                    padding-right: 3rem;
                }

                .toggle-password {
                    position: absolute;
                    right: 0.75rem;
                    top: 50%;
                    transform: translateY(-50%);
                    background: transparent;
                    border: none;
                    color: colors.$text-secondary;
                    cursor: pointer;
                    padding: 0.25rem;
                    font-size: 1rem;
                    transition: variables.$transition-smooth;

                    &:hover {
                        color: colors.$accent;
                    }

                    &:focus-visible {
                        outline: none;
                        box-shadow:
                            0 0 0 2px colors.$bg-body,
                            0 0 0 4px colors.$accent;
                        border-radius: 4px;
                    }
                }
            }
        }

        .message-box {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.5rem 1rem;
            border-radius: variables.$radius;
            font-size: 0.85rem;
            font-weight: 500;
            border-left: 3px solid transparent;
            transition: variables.$transition-smooth;

            &.error {
                background: functions.alpha(colors.$status-error, 0.08);
                border-left-color: colors.$status-error;
                color: colors.$status-error;

                &::before {
                    content: "⚠";
                    font-size: 1rem;
                    flex-shrink: 0;
                }
            }

            &.warning {
                background: functions.alpha(colors.$status-warning, 0.08);
                border-left-color: colors.$status-warning;
                color: colors.$status-warning;

                &::before {
                    content: "⚡";
                    font-size: 1rem;
                    flex-shrink: 0;
                }
            }

            &.success {
                background: functions.alpha(colors.$status-success, 0.08);
                border-left-color: colors.$status-success;
                color: colors.$status-success;

                &::before {
                    content: "✓";
                    font-size: 1rem;
                    font-weight: 700;
                    flex-shrink: 0;
                }
            }
        }

        .submit-btn {
            @include mixins.focus-ring(colors.$bg-card, colors.$accent);
            width: 100%;
            padding: 0.85rem;
            background: colors.$accent;
            border: none;
            border-radius: variables.$radius;
            color: colors.$text-primary;
            font-weight: 700;
            font-size: 0.9rem;
            letter-spacing: 0.08em;
            cursor: pointer;
            transition: variables.$transition-smooth;

            &:hover {
                background: colors.$accent-hover;
                transform: translateY(-2px);
                box-shadow: 0 8px 30px functions.alpha(colors.$accent, 0.3);
            }

            &:active {
                transform: translateY(0);
            }

            &:disabled {
                opacity: 0.6;
                cursor: not-allowed;
                transform: none !important;
            }

            .spinner {
                display: inline-block;
                width: 1.2rem;
                height: 1.2rem;
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-top-color: colors.$text-primary;
                border-radius: 50%;
                animation: spin 0.6s linear infinite;
            }
        }
    }
}

@keyframes spin {
    to {
        transform: rotate(360deg);
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
