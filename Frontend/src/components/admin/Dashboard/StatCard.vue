<script setup>
import { computed } from 'vue';

const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    value: {
        type: [Number, String],
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    prefix: {
        type: String,
        default: '',
    },
    suffix: {
        type: String,
        default: '',
    },
    iconBg: {
        type: String,
        default: 'rgba(59, 130, 246, 0.12)',
    },
});

const formattedValue = computed(() => {
    return `${props.prefix}${props.value}${props.suffix}`;
});
</script>

<template>
    <div class="stat-card">
        <div class="stat-icon" :style="{ backgroundColor: iconBg }">
            <i :class="icon"></i>
        </div>
        <div class="stat-content">
            <p class="stat-label">{{ label }}</p>
            <p class="stat-value">{{ formattedValue }}</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
.stat-card {
    @include mixins.flex-center;
    justify-content: flex-start;
    gap: 1rem;
    background: colors.$bg-card;
    border-radius: variables.$radius;
    padding: 1.25rem 1.5rem;
    border: 1px solid colors.$border-divider;
    transition: variables.$transition-fast;

    &:hover {
        border-color: colors.$accent;
        box-shadow: variables.$shadow-sm;
    }

    .stat-icon {
        @include mixins.flex-center;
        width: 3rem;
        height: 3rem;
        border-radius: variables.$radius;
        flex-shrink: 0;

        i {
            font-size: 1.25rem;
            color: colors.$text-primary;
        }
    }

    .stat-content {
        @include mixins.flex-column;
        gap: 0.15rem;

        .stat-label {
            font-size: 0.8rem;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.05rem;
            color: colors.$text-secondary;
            margin: 0;
        }

        .stat-value {
            font-size: 1.6rem;
            font-weight: 700;
            color: colors.$text-primary;
            margin: 0;
            line-height: 1.2;
        }
    }
}
</style>