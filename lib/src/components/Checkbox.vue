<script setup lang="ts">
import { ref, watch } from 'vue';
import Icon from './Icon.vue';

interface Props {
    modelValue: boolean | null;
    threeState?: boolean;
    size?: string | null;
    label?: string;
}

interface Emits {
    (event: 'update:modelValue', value: boolean | null): void;
}

const props = withDefaults(defineProps<Props>(), { threeState: false, size: '1em' });
const emit = defineEmits<Emits>();

const value = ref<boolean | null>(false);

const handleClick = () => {
    if (props.threeState) {
        if (value.value === null) {
            value.value = false;
        } else {
            value.value = !value.value;
        }
    } else {
        value.value = !value.value;
    }
};

watch(
    () => props.modelValue,
    () => {
        value.value = props.modelValue;
    },
    { immediate: true },
);

watch(
    () => value.value,
    () => emit('update:modelValue', value.value),
);
</script>

<template>
    <div class="cursor-pointer flex items-center gap-1" @click="handleClick">
        <!-- Make a nice looking checkbox, like material design -->
        <div
            :class="{
                'flex items-center gap-2 text-2xl relative  justify-center': true,
                [`w-[${size}] h-[${size}]`]: true,
            }"
        >
            <div
                v-if="value"
                class="h-[70%] w-[70%] bg-primary absolute z-0 pointer-events-none"
                style="left: 15%"
            ></div>
            <Icon
                :font-size="size || '1em'"
                class-name="absolute z-10 text-white"
                name="check"
                v-if="value"
                style="transform: scale(80%)"
            />
            <Icon :font-size="size || '1em'" name="check_box_outline_blank" :class-name="value ? `text-primary` : ''" />
        </div>

        <slot>
            {{ label }}
        </slot>
    </div>
</template>

<style scoped lang="scss"></style>
