<script setup lang="ts">
interface Props {
    name: number;
}

const props = defineProps<Props>();

const context = inject<{ step: number | undefined } | null>('stepperContext', {
    step: undefined,
});

const shouldShowStep = computed(() => {
    return context?.step === props.name;
});
</script>

<template>
    <div v-if="shouldShowStep">
        <slot />
    </div>
</template>
