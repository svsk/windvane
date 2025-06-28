import { ref, watch } from 'vue';

export const themeColor = ref('#00a43e');

watch(
    () => themeColor.value,
    () => {
        document.documentElement.style.setProperty('--primary', themeColor.value);
    },
);
