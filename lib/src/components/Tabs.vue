<script setup lang="ts">
import { provide, reactive, watch } from 'vue';

interface Props {
    modelValue: string | null;
    activeColor?: string;
}

interface Emits {
    (event: 'update:modelValue', value: string): boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const tabContext = reactive({
    activeTab: props.modelValue,
    activeColor: props.activeColor,
    swapTab: (name: string) => {
        tabContext.activeTab = name;
    },
});

provide('tabContext', tabContext);

watch(
    () => props.modelValue,
    () => {
        tabContext.activeTab = props.modelValue;
    },
);

watch(
    () => tabContext.activeTab,
    () => {
        if (tabContext.activeTab) {
            emit('update:modelValue', tabContext.activeTab);
        }
    },
);
</script>

<template>
    <div class="flex no-wrap">
        <slot />
    </div>
</template>
