<script setup lang="ts">
interface Props {
    icon?: string;
    color?: string;
    label?: string;
    labelPosition?: 'left' | 'right';
}

interface Emits {
    (event: 'click'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const fabCallback = inject('action-clicked-callback', () => {});

const handleActionClick = () => {
    emit('click');
    fabCallback?.();
};
</script>

<template>
    <button
        v-ripple
        class="cursor-pointer bg-primary rounded-full px-2 py-1 font-medium flex items-center gap-1 relative"
        @click="handleActionClick"
    >
        <Icon v-if="icon" :name="icon" size="20px" />
        <div>{{ label }}</div>
    </button>
</template>
