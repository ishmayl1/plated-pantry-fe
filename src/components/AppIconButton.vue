<script setup>
const props = defineProps({
    type: { type: String, default: 'button' },
    size: { type: [String, Number], default: 22 },
    color: { type: String, default: '#7f40bf' }
});
const emit = defineEmits(['click']);
</script>

<template>
    <button class="app-icon-btn" :type="type" @click="$emit('click', $event)">
        <v-icon :size="size" :color="color">
            <slot />
        </v-icon>
    </button>
</template>

<style scoped>
.app-icon-btn {
    background: transparent;
    border: none;
    border-radius: 50%;
    padding: 0.35em 0.5em;
    min-width: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.18s;
}
.app-icon-btn:hover {
    background: rgba(127, 64, 191, 0.08);
}
</style>
