<script setup lang="ts">
interface Props {
    dense?: boolean;
}

defineProps<Props>();
</script>

<template>
    <div
        :class="{
            'bg-primary/90 whitespace-nowrap color-white rounded px-1  font-semibold': true,
            'text-xs': dense,
            'text-sm': !dense,
        }"
    >
        <slot />
    </div>
</template>
