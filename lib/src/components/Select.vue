<script setup lang="ts">
type PossibleValueTypes = string | number | null | undefined;

interface Props {
    id?: string;
    readonly?: boolean;
    label?: string;
    modelValue: PossibleValueTypes;
    options: { label: string; value: PossibleValueTypes }[];
}

interface Emits {
    (event: 'update:modelValue', value: PossibleValueTypes): void;
}

const props = withDefaults(defineProps<Props>(), {
    id: 'v-input-' + Math.floor(Math.random() * 1000000),
    readonly: false,
});

const emit = defineEmits<Emits>();

const value = ref(props.modelValue);

const errorMessage = computed(() => '');

watch(
    () => value.value,
    () => emit('update:modelValue', value.value),
);
</script>

<template>
    <div :class="{ 'relative input-container': true, 'has-value': value != null && value !== '' }">
        <label
            :for="id"
            v-if="label"
            class="label transition-all absolute top-[22%] left-[8px] opacity-50 pointer-events-none"
        >
            {{ label }}
        </label>

        <select
            v-model="value"
            :readonly="readonly"
            :class="{
                'border-b-2 border-primary bg-bg rounded-t p-1 pb-2 pt-4 outline-none w-full text-base h-[50px]': true,
                // 'read-only:border-gray-400 read-only:border-dashed read-only:border-b': true,
                'border-red-500': !!errorMessage,
                'transition-colors': true,
            }"
        >
            <option v-for="(option, idx) in options" :key="option.value ?? idx" :value="option.value">
                {{ option.label }}
            </option>
        </select>
    </div>
</template>

<style scoped lang="scss">
.input-container {
    &.has-value,
    &:focus-within {
        .label {
            font-size: 0.7em;
            top: 2px;
        }
    }
}

.label {
    font-size: 1em;
}
</style>
