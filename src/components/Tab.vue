<script setup lang="ts">
import { inject } from 'vue';

interface Props {
    name: string;
    icon?: string;
    label?: string;
}

defineProps<Props>();

const tabContext = inject<{ activeTab: string; swapTab: (tabName: string) => void; activeColor?: string }>(
    'tabContext',
);
</script>

<template>
    <div
        v-ripple
        :class="{
            'cursor-pointer px-4 py-2 border-b-2 relative text-center flex items-center gap-2 justify-center font-medium': true,
            [`border-b-${tabContext?.activeColor || 'current'} text-${tabContext?.activeColor || 'current'}`]:
                name === tabContext?.activeTab,
            'border-b-transparent': name !== tabContext?.activeTab,
        }"
        @click="tabContext?.swapTab(name)"
    >
        <Icon v-if="icon" :name="icon" size="24px" />
        <slot>
            {{ label }}
        </slot>
    </div>
</template>
