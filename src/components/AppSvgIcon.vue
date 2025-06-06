<script setup>
import { computed, watchEffect, ref } from 'vue';
import { svgIcons } from '@/configs/svgIcons';

const props = defineProps({
    name: { type: String, required: true },
    size: { type: [Number, String], default: 24 },
    color: { type: String, default: '' }, // Optional CSS color
    customClass: { type: String, default: '' }
});

const svgContent = ref('');

const iconStyle = computed(() => ({
    width: typeof props.size === 'number' ? `${props.size}px` : props.size,
    height: typeof props.size === 'number' ? `${props.size}px` : props.size,
    display: 'inline-block',
    verticalAlign: 'middle'
}));

async function fetchSvg() {
    // Use icon name to look up the SVG file from the mapping
    const file = svgIcons[props.name];
    if (!file) {
        svgContent.value = '<!-- SVG icon not found -->';
        console.warn('AppSvgIcon: icon not found for name', props.name);
        return;
    }
    let url = file;
    if (!/^https?:/.test(url) && !url.startsWith('/')) {
        url = new URL(`../assets/${url}`, import.meta.url).href;
    }
    console.log('AppSvgIcon: fetching SVG from', url);
    const res = await fetch(url);
    let text = await res.text();
    // Remove width/height from root <svg> and set fill="currentColor" if color is set
    text = text.replace(
        /<svg([^>]*)\s(width|height)=("[^"]*"|'[^']*')/g,
        '<svg$1'
    );
    text = text.replace(
        /<svg([^>]*)\s(width|height)=("[^"]*"|'[^']*')/g,
        '<svg$1'
    ); // Remove both width and height
    text = text.replace(/<svg([^>]*)>/, (match, attrs) => {
        if (props.color) {
            // Add fill="currentColor" if not present
            if (!/fill=/.test(attrs)) {
                return `<svg${attrs} fill=\"currentColor\">`;
            }
        }
        return match;
    });
    // If color prop is set, replace fill/stroke in SVG elements
    if (props.color) {
        text = text.replace(
            /(fill|stroke)="(#[A-Fa-f0-9]{3,6}|currentColor)"/g,
            `$1=\"${props.color}\"`
        );
    }
    svgContent.value = text;
}

watchEffect(() => {
    fetchSvg();
});
</script>

<template>
    <span
        :class="['app-svg-icon', customClass]"
        :style="iconStyle"
        v-html="svgContent"
        aria-hidden="true"
    ></span>
</template>

<style scoped>
.app-svg-icon {
    line-height: 0;
}
</style>
