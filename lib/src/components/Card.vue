<script setup lang="ts">
import { useSlots } from 'vue';

interface Props {
    withTitleBorder?: boolean;
    unpadded?: boolean;
}

defineProps<Props>();

const slots = useSlots();
</script>

<template>
    <div class="rounded bg-card shadow-lg">
        <div
            v-if="slots['title']"
            :class="{ 'text-lg font-semibold pb-4 p-6': true, 'border-b border-b-gray-500': withTitleBorder }"
        >
            <slot name="title" />
        </div>

        <div v-if="slots['default']" :class="{ 'p-6': !unpadded }">
            <slot />
        </div>
    </div>
</template>
