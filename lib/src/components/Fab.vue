<script setup lang="ts">
import TransitionGroupFadeSlide from './TransitionGroupFadeSlide.vue';

interface Props {
    icon?: string;
    color?: string;
    disable?: boolean;
}

interface Emits {
    (event: 'clicked'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const open = ref(false);

const handleClick = () => {
    if (props.disable) return;

    open.value = !open.value;

    emit('clicked');
};

const actionClicked = () => {
    open.value = false;
};

provide('action-clicked-callback', actionClicked);
</script>

<template>
    <div class="flex flex-col items-end">
        <TransitionGroupFadeSlide vertical grow>
            <div v-show="open" class="flex flex-col gap-3 mb-3 items-end">
                <slot />
            </div>
        </TransitionGroupFadeSlide>

        <button
            v-ripple
            :class="{
                'relative rounded-full aspect-square h-12 flex items-center justify-center cursor-pointer': true,
                'bg-primary': !props.color,
                [`bg-${props.color}`]: props.color,
            }"
            @click="handleClick"
        >
            <Icon v-if="icon && !open" :name="icon" size="24px" class-name="text-white" />
            <Icon v-if="open" name="close" size="22px" class-name="text-white" />
        </button>
    </div>
</template>
