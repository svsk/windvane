<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    vertical?: boolean;
    invert?: boolean;
    grow?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    vertical: false,
});

const translateAmount = computed(() => (props.invert ? '-20px' : '20px'));

const growFromSize = computed(() => (props.grow ? '0.8' : '1'));

const name = computed(() => (props.vertical ? 'fade-slide-vertical' : 'fade-slide'));
</script>

<template>
    <TransitionGroup :name="name">
        <slot />
    </TransitionGroup>
</template>

<style lang="scss">
.fade-slide-vertical-enter-active,
.fade-slide-enter-active {
    transition: all 0.2s ease-out;
    scale: 1;
}

.fade-slide-vertical-leave-active,
.fade-slide-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
    scale: 1;
}

.fade-slide-vertical-enter-from,
.fade-slide-vertical-leave-to {
    transform: translateY(v-bind('translateAmount'));
    opacity: 0;
    scale: v-bind('growFromSize');
}

.fade-slide-enter-from,
.fade-slide-leave-to {
    transform: translateX(v-bind('translateAmount'));
    opacity: 0;
    scale: v-bind('growFromSize');
}
</style>
