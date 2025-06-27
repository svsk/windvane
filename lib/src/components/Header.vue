<script setup lang="ts"></script>

<template>
    <header class="bg-primary fixed top-0 z-20">
        <slot />
    </header>
</template>

<style lang="scss" scoped>
header {
    padding-top: env(safe-area-inset-top);
}
</style>
