<script setup lang="ts">
import { provide } from 'vue';

interface Emits {
    (event: 'submit'): void;
}

const emit = defineEmits<Emits>();

const childValidators: (() => boolean | Promise<boolean>)[] = [];
provide('formValidators', childValidators);

const handleSubmit = async () => {
    if (await validate()) {
        emit('submit');
    }
};

const validate = async () => {
    const validationResults = childValidators.map((validate) => validate());

    const asyncValidators = validationResults.filter((result) => result instanceof Promise) as Promise<boolean>[];

    const syncResults = validationResults.filter((result) => typeof result === 'boolean') as boolean[];
    const asyncResults = await Promise.all(asyncValidators);

    return !syncResults.concat(asyncResults).some((result) => result === false);
};

defineExpose({
    validate,
});
</script>

<template>
    <form @submit.prevent="handleSubmit" novalidate>
        <slot />
        <input type="submit" hidden />
    </form>
</template>
