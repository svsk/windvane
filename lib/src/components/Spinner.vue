<script setup lang="ts">
interface Props {
    size?: string | number;
}

const props = withDefaults(defineProps<Props>(), {
    size: '24px',
});

const normalizedSize = computed(() => {
    if (typeof props.size === 'number') {
        return `${props.size}px`;
    } else if (typeof props.size === 'string') {
        return props.size;
    }

    return '24px';
});
</script>

<template>
    <svg fill="currentColor" :height="normalizedSize" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
            class="the-spinner"
        />
    </svg>
</template>

<style scoped lang="scss">
.the-spinner {
    transform-origin: center;
    animation: spinner 0.75s infinite linear;
}

@keyframes spinner {
    100% {
        transform: rotate(360deg);
    }
}
</style>
