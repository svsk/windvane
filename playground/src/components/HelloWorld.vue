<script setup lang="ts">
defineProps<{
    msg: string;
}>();
</script>

<template>
    <div class="greetings">
        <h1 class="green">{{ msg }}</h1>
        <h3>This is project showcasing the<br />Windvane Vue UI framework.</h3>
        <span class="opacity-50">Powered by Tailwind and inspired by Material Design.</span>
    </div>
</template>

<style scoped>
h1 {
    font-weight: 500;
    font-size: 2.6rem;
    position: relative;
    top: -10px;
}

h3 {
    font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
    text-align: center;
}

@media (min-width: 1024px) {
    .greetings h1,
    .greetings h3 {
        text-align: left;
    }
}
</style>
