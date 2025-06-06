<template>
    <button
        class="app-btn"
        :type="type"
        :disabled="disabled"
        :style="buttonStyle"
        @click="$emit('click', $event)"
    >
        <slot />
    </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    type: { type: String, default: 'button' },
    disabled: Boolean,
    color: {
        type: String,
        default: 'primary',
        validator: (v) => {
            return ['primary', 'secondary', 'yellow', 'peach'].includes(v);
        }
    }
});
const emit = defineEmits(['click']);

const colorVars = {
    primary: {
        bg: 'var(--color-primary)',
        text: 'var(--color-background)'
    },
    secondary: {
        bg: 'var(--color-secondary)',
        text: 'var(--color-button-text)'
    },
    yellow: {
        bg: 'var(--color-yellow)',
        text: 'var(--color-text)'
    },
    peach: {
        bg: 'var(--color-peach)',
        text: 'var(--color-text)'
    }
};

const buttonStyle = computed(() => {
    const c = colorVars[props.color] || colorVars.primary;
    return {
        background: c.bg,
        color: c.text
    };
});
</script>

<style scoped>
.app-btn {
    border: none;
    border-radius: 999px;
    padding: 0.7em 1.6em;
    font-size: 1em;
    font-weight: 600;
    cursor: pointer;
    transition:
        background 0.2s,
        color 0.2s,
        opacity 0.18s;
    box-shadow: 0 1px 4px 0 rgba(40, 40, 60, 0.08);
    outline: none;
}
.app-btn:hover:not(:disabled) {
    filter: brightness(0.95);
}
.app-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}
</style>
