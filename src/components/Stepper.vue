<script setup lang="ts">
import TransitionGroupFadeSlide from './TransitionGroupFadeSlide.vue';

interface Props {
    modelValue?: number;
}

const props = defineProps<Props>();

const stepperContext = reactive({
    step: props.modelValue,
});

provide('stepperContext', stepperContext);

watch(
    () => props.modelValue,
    () => {
        stepperContext.step = props.modelValue ?? undefined;
    },
);
</script>

<template>
    <div>
        <TransitionGroupFadeSlide invert>
            <slot />
        </TransitionGroupFadeSlide>
    </div>
</template>
