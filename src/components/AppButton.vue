<template>
  <button
    class="app-btn"
    :type="type"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  type: { type: String, default: 'button' },
  disabled: Boolean
});
const emit = defineEmits(['click']);
</script>

<style scoped>
.app-btn {
  background: var(--color-primary);
  color: var(--color-background);
  border: none;
  border-radius: 999px;
  padding: 0.7em 1.6em;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, opacity 0.18s;
  box-shadow: 0 1px 4px 0 rgba(40, 40, 60, 0.08);
  outline: none;
}
.app-btn:hover:not(:disabled) {
  background: var(--color-action);
  color: var(--color-surface);
}
.app-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
