import { reactive, ref, watch } from 'vue';

export const theme = reactive({
    primary: '#00a43e',
    card: '#333333',
    bg: '#1b1b1b',
    text: '#ffffff',
    border: '#646e7d',
});

watch(
    () => theme,
    () => {
        document.documentElement.style.setProperty('--primary', theme.primary);
        document.documentElement.style.setProperty('--bg-card', theme.card);
        document.documentElement.style.setProperty('--bg-main', theme.bg);
        document.documentElement.style.setProperty('--text-main', theme.text);
        document.documentElement.style.setProperty('--border-main', theme.border);
    },
    { deep: true },
);
