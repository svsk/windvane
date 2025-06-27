<script setup lang="ts">
import { ref } from 'vue';

interface Props {
    buttonKey?: string;
}

const props = defineProps<Props>();

const count = ref(0);

const handleClick = () => {
    console.log('Click!', props.buttonKey);
    count.value++;

    console.log('DOne!');
};
</script>

<template>
    <button @click="handleClick"><slot /> {{ count }}</button>
</template>
