<template>
    <div class="app-input-wrapper">
        <label v-if="label" :for="id" class="app-input-label">{{
            label
        }}</label>
        <input
            :id="id"
            v-bind="$attrs"
            :type="type"
            v-model="modelValueProxy"
            class="app-input"
            :placeholder="placeholder"
            :autocomplete="autocomplete"
            :disabled="disabled"
            :required="required"
            @input="$emit('update:modelValue', modelValueProxy)"
            @blur="touched = true"
        />
        <div v-if="touched && errorMessages" class="app-input-error">
            {{ errorMessages }}
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
const props = defineProps({
    modelValue: [String, Number],
    label: String,
    id: String,
    type: { type: String, default: 'text' },
    placeholder: String,
    autocomplete: String,
    disabled: Boolean,
    required: Boolean,
    error: Boolean,
    errorMessages: [String, Array]
});
const emit = defineEmits(['update:modelValue']);
const modelValueProxy = computed({
    get: () => props.modelValue,
    set: (v) => emit('update:modelValue', v)
});
const touched = ref(false);
</script>

<style scoped>
.app-input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    align-items: stretch;
    width: 100%;
    max-width: 100%;
    position: relative;
}
.app-input-label {
    display: flex;
    justify-content: flex-start;
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--color-text);
    margin-left: 15px;
}
.app-input {
    padding: 0.5rem 0.75rem;
    border: 1.5px solid rgba(73, 181, 131, 0.45); /* Use color-action with 45% opacity */
    border-radius: 999px;
    background: var(--color-surface);
    color: var(--color-text);
    font-size: 1rem;
    transition:
        border 0.18s,
        background 0.18s,
        color 0.18s;
    width: 100%;
    box-sizing: border-box;
    min-width: 0;
}
.app-input-error {
    color: #d32f2f;
    font-size: 0.92em;
    margin-top: 2px;
    word-break: break-word;
    white-space: normal;
    max-width: 100%;
    width: 100%;
    box-sizing: border-box;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    display: block;
    overflow-wrap: break-word;
    flex-shrink: 0;
    min-width: 0;
    position: relative;
    z-index: 1;
}
html.dark-mode .app-input {
    border-color: #e7e7e7;
}
</style>
