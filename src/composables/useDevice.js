// src/composables/useDevice.js
import { ref, onMounted, onUnmounted } from 'vue';

const isMobile = ref(window.innerWidth <= 768);
let listener = null;

function checkMobile() {
    isMobile.value = window.innerWidth <= 768;
}

export function useDevice() {
    onMounted(() => {
        checkMobile();
        listener = () => checkMobile();
        window.addEventListener('resize', listener);
    });
    onUnmounted(() => {
        if (listener) window.removeEventListener('resize', listener);
    });
    return { isMobile };
}
