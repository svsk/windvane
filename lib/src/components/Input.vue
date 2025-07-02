<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue';
import Badge from './Badge.vue';

interface Props {
    id?: string;
    modelValue?: string | number | null;
    label?: string;
    inputClass?: string;
    type?: string;
    step?: string;
    readonly?: boolean;
    rules?: ((v: any) => string | boolean)[];
    name?: string;
    debounce?: number;
}

interface Emits {
    (event: 'update:modelValue', value: string | number | null | undefined): void;
    (event: 'focus'): void;
    (event: 'blur'): void;
}

const props = withDefaults(defineProps<Props>(), {
    id: 'v-input-' + Math.floor(Math.random() * 1000000),
    type: 'text',
    readonly: false,
    debounce: 0,
});

const validators = inject<(() => boolean)[]>('formValidators', []);
const emit = defineEmits<Emits>();
const errorMessage = ref<string | null>(null);
const value = ref(props.modelValue);
const input = ref<HTMLInputElement>();
let to: number | undefined = undefined;

const classes = computed(() => ({
    [props.inputClass || '']: true,
    'border-b-2 bg-bg rounded-t p-2 pt-4 outline-none w-full h-full text-base': true,
    'read-only:border-gray-400 read-only:border-dashed read-only:border-b': true,
    'border-gray-700': !errorMessage.value,
    'border-red-500': !!errorMessage.value,
    'focus-within:border-primary': !props.readonly,
    'transition-colors': true,
}));

const emitNewValue = () => {
    errorMessage.value = null;

    if (value.value !== props.modelValue) {
        emit('update:modelValue', value.value);
    }
};

const focus = () => {
    input.value?.focus();
};

const blur = () => {
    input.value?.blur();
};

const handleBlur = () => {
    // Immediately emit new value when blurring out of the input.
    clearTimeout(to);
    emitNewValue();
    emit('blur');
};

const handleFocus = () => {
    emit('focus');
};

const validate = () => {
    const brokenRule = props.rules?.map((rule) => rule(value.value)).find((result) => result !== true);
    if (brokenRule !== false && !!brokenRule) {
        errorMessage.value = brokenRule;
    }

    return !brokenRule;
};

validators.push(validate);

watch(
    () => props.modelValue,
    () => (value.value = props.modelValue),
);

watch(
    () => value.value,
    () => {
        if (props.debounce > 0) {
            clearTimeout(to);
            to = window.setTimeout(emitNewValue, props.debounce);
        } else {
            emitNewValue();
        }
    },
);

defineExpose({
    focus,
    validate,
    blur,
});
</script>

<template>
    <div :class="{ 'relative input-container w-full': true, 'has-value': value != null && value !== '' }">
        <label
            :for="id"
            v-if="label"
            class="label transition-all absolute top-[22%] left-[8px] opacity-50 pointer-events-none"
        >
            {{ label }}
        </label>

        <textarea
            v-if="type === 'textarea'"
            v-model="value"
            ref="input"
            :id="id"
            :readonly="readonly"
            :step="step"
            :type="type"
            :name="name"
            :class="classes"
            @blur="handleBlur"
            @focus="handleFocus"
        >
            {{ value }}
        </textarea>

        <input
            v-else
            v-model="value"
            ref="input"
            :id="id"
            :readonly="readonly"
            :step="step"
            :type="type"
            :name="name"
            :class="classes"
            @blur="handleBlur"
            @focus="handleFocus"
        />

        <div class="absolute h-full w-full flex items-center justify-end top-0 gap-2 pointer-events-none p-2">
            <slot name="suffix" />

            <Transition name="shake">
                <Badge v-if="errorMessage" bg-class="bg-red-500">
                    {{ errorMessage }}
                </Badge>
            </Transition>
        </div>
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

/** shake **/
.shake-enter-active {
    animation: bounce-in 0.2s;
}
.shake-leave-active {
    animation: bounce-in 0.2s reverse;
}

@keyframes bounce-in {
    0% {
        opacity: 0;
        transform: translateX(20px);
    }

    25% {
        transform: translateX(-10px);
    }

    75% {
        transform: translateX(10px);
    }

    100% {
        transform: translateX(0px);
        opacity: 1;
    }
}
</style>
