<script setup lang="ts">
// Quasar's scroll areas seem quite heavy when being resized while containing a lot of DOM elements.
// So this is a simple scroll area that mostly works the same as Quasar's, but with less overhead.

interface Props {
    contentStyle?: string;
    contentClass?: string;
    reverse?: boolean;
}

withDefaults(defineProps<Props>(), { contentStyle: '', contentClass: '' });
</script>

<template>
    <div :class="{ 'scroll-area relative': true, 'flex flex-col-reverse': !!reverse }">
        <div :class="`absolute w-full ${contentClass}`" :style="`${contentStyle}`">
            <slot />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.scroll-area {
    overflow-y: auto;

    &::-webkit-scrollbar-thumb,
    &::-webkit-scrollbar {
        background-color: transparent;
    }

    &:hover {
        &::-webkit-scrollbar {
            background-color: rgba(0, 0, 0, 0.2);
        }

        &::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0, 0.2);
        }

        &::-webkit-scrollbar,
        &::-webkit-scrollbar-corner,
        &::-webkit-scrollbar-track,
        &::-webkit-scrollbar-track-piece {
            background-color: rgba(0, 0, 0, 0);
        }
    }
}

.body--dark {
    .scroll-area {
        &:hover {
            &::-webkit-scrollbar {
                background-color: rgba(255, 255, 255, 0.2);
            }

            &::-webkit-scrollbar-thumb {
                background-color: rgba(255, 255, 255, 0.2);
            }

            &::-webkit-scrollbar,
            &::-webkit-scrollbar-corner,
            &::-webkit-scrollbar-track,
            &::-webkit-scrollbar-track-piece {
                background-color: rgba(0, 0, 0, 0);
            }
        }
    }
}
</style>
