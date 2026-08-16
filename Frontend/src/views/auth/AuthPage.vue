<script setup>
import AuthContainer from "@/components/common/auth/AuthContainer.vue";

defineProps({
    mode: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <div class="auth-page">
        <AuthContainer :mode="mode" />
    </div>
</template>

<style scoped lang="scss">
.auth-page {
    @include mixins.flex-center;
    min-height: 100dvh;
    background: colors.$bg-body;
    padding: 1.5rem;
}
</style>
