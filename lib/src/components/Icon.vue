<script setup lang="ts">
interface Props {
    name: string;
    className?: string;
    fontSize?: string;
    size?: string;
    color?: string;
}

const props = withDefaults(defineProps<Props>(), {
    className: '',
    fontSize: '1em',
});

const computedSize = computed(() => {
    if (props.size) {
        return props.size;
    }

    return props.fontSize;
});
</script>

<template>
    <span
        v-if="props.name"
        :style="`font-size: ${computedSize} !important;`"
        :class="{
            'text-primary': color === 'primary',
            'material-icons material-symbols-outlined select-none': true,
            [props.className]: true,
        }"
        >{{ props.name }}</span
    >
</template>
