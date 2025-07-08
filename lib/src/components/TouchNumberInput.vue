<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import Button from './Button.vue';
import Input from './Input.vue';

interface Props {
    modelValue: number;
    stepValue?: number;
    onlyAllowEditWithButtons?: boolean;
    readonly?: boolean;
    disallowDecimals?: boolean;
    min?: number;
    max?: number;
    wrapAround?: boolean;
    displayFormatter?: (value: string | null) => string | null;
}

interface Emits {
    (event: 'update:modelValue', value: number): void;
}

const props = withDefaults(defineProps<Props>(), {
    stepValue: 1,
    onlyAllowEditWithButtons: false,
    readonly: false,
    disallowDecimals: false,
    wrapAround: false,
});

const emit = defineEmits<Emits>();

const valueInternal = ref<string | null>(null);
const formattedValueInternal = computed(() => {
    if (props.displayFormatter) {
        return props.displayFormatter(valueInternal.value);
    }

    return valueInternal.value;
});

const round = (val: string | number | null) => {
    if (val == null) return 0;
    return (Number(val) * 100) / 100;
};

const stringModelValue = computed(() => round(props.modelValue).toString());

watch(
    () => props.modelValue,
    () => {
        valueInternal.value = stringModelValue.value;
    },
    { immediate: true },
);

watch(
    () => valueInternal.value,
    () => {
        if (valueInternal.value !== stringModelValue.value) {
            emit('update:modelValue', round(valueInternal.value));
        }
    },
);

const onIncrement = () => setNewValue(Number(valueInternal.value) + props.stepValue);
const onDecrement = () => setNewValue(Number(valueInternal.value) - props.stepValue);
const onIncrementDecimal = () => setNewValue(Number(valueInternal.value) + 0.1);
const onDecrementDecimal = () => setNewValue(Number(valueInternal.value) - 0.1);

const setNewValue = (newValue: number) => {
    if (props.max != null && newValue > props.max) {
        if (props.wrapAround && props.min != null) {
            newValue = props.min;
        } else {
            return;
        }
    }

    if (props.min != null && newValue < props.min) {
        if (props.wrapAround && props.max != null) {
            newValue = props.max;
        } else {
            return;
        }
    }

    valueInternal.value = newValue.toFixed(1);
};

const handleNewInputValue = (newValue: string | number | null | undefined) => {
    valueInternal.value = newValue?.toString() || null;
};
</script>

<template>
    <div class="container flex items-center">
        <div v-if="!disallowDecimals" class="flex flex-col h-full">
            <Button
                :readonly="readonly"
                flat
                icon="expand_less"
                icon-size="24px"
                class="buttons border border-slate-600 left top"
                style="flex-grow: 1"
                @click="onIncrement"
            />
            <Button
                :readonly="readonly"
                flat
                icon="expand_more"
                icon-size="24px"
                class="buttons border border-slate-600 left bottom"
                style="flex-grow: 1"
                @click="onDecrement"
            />
        </div>
        <div>
            <Input
                class="input"
                filled
                square
                type="tel"
                :model-value="formattedValueInternal"
                :readonly="onlyAllowEditWithButtons"
                input-class="text-center"
                @update:model-value="handleNewInputValue"
            >
                <template #prepend>
                    <slot name="prepend" />
                </template>

                <template #append>
                    <slot name="append" />
                </template>
            </Input>
        </div>
        <div class="flex flex-col h-full">
            <Button
                :readonly="readonly"
                flat
                icon="expand_less"
                icon-size="24px"
                class="buttons border border-slate-600 right top"
                style="flex-grow: 1"
                @click="() => (disallowDecimals ? onIncrement() : onIncrementDecimal())"
            />
            <Button
                :readonly="readonly"
                flat
                icon="expand_more"
                icon-size="24px"
                class="buttons border border-slate-600 right bottom"
                style="flex-grow: 1"
                @click="() => (disallowDecimals ? onDecrement() : onDecrementDecimal())"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.buttons {
    &.bottom {
        &.left {
            border-bottom-right-radius: 0px;
            border-top-right-radius: 0px;
            border-top-left-radius: 0px;
        }

        &.right {
            border-bottom-left-radius: 0px;
            border-top-left-radius: 0px;
            border-top-right-radius: 0px;
        }
    }

    &.top {
        border-bottom: none;

        &.left {
            border-bottom-right-radius: 0px;
            border-top-right-radius: 0px;
            border-bottom-left-radius: 0px;
        }
        &.right {
            border-bottom-left-radius: 0px;
            border-top-left-radius: 0px;
            border-bottom-right-radius: 0px;
        }
    }
}

.container {
    height: 80px;
}

.button {
    position: relative;
    width: 40px;
    cursor: pointer;
    &:hover {
        border: 1px solid blue;

        &:after {
            position: absolute;

            background-color: blue;
            opacity: 0.1;
            content: '';
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
            border-radius: 4px;
        }
    }
}

.input {
    height: 80px;
    flex-grow: 1;

    * {
        font-size: 42px;
    }
}
</style>
