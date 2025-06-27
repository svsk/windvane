<script setup lang="ts">
type SlideItemEvent = {
    reset: () => void;
};

interface Props {
    leftColor?: string;
    rightColor?: string;
}

interface Emits {
    (event: 'left', e: SlideItemEvent): void;
    (event: 'right', e: SlideItemEvent): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

const moveOffset = ref(0);
const touchStart = ref<{ clientX: number; clientY: number } | null>(null);
const isPanning = ref<'unknown' | boolean>('unknown');
const slideItem = ref<HTMLElement | null>(null);

const leftActionInvocationDegree = computed(() => {
    return Math.max(0, Math.min(1, moveOffset.value / 75));
});

const rightActionInvocationDegree = computed(() => {
    return Math.max(0, Math.min(1, -moveOffset.value / 75));
});

const position = (event: MouseEvent | TouchEvent) => ('touches' in event ? event.touches[0] : event);

const handleTouchStart = (event: TouchEvent | MouseEvent) => {
    // Register where the touch started
    touchStart.value = position(event);
};

const handleTouchMove = (event: TouchEvent | MouseEvent) => {
    // Calculate the distance the user has moved their finger from the touchStart and update moveOffset
    // to move the item left or right.

    if (touchStart.value !== null) {
        const currentPosition = position(event);

        const movedXDistance = currentPosition.clientX - touchStart.value.clientX;
        const movedYDistance = currentPosition.clientY - touchStart.value.clientY;

        if (isPanning.value === 'unknown') {
            if (Math.abs(movedXDistance) > Math.abs(movedYDistance)) {
                isPanning.value = true;
            }

            if (Math.abs(movedYDistance) > Math.abs(movedXDistance)) {
                isPanning.value = false;
            }
        }

        if (isPanning.value === true || isPanning.value === 'unknown') {
            event.preventDefault();
        }

        if (isPanning.value !== true) {
            reset();
            return;
        }

        moveOffset.value = movedXDistance;
    }
};

const reset = () => {
    moveOffset.value = 0;
};

const handleTouchEnd = () => {
    touchStart.value = null;
    isPanning.value = 'unknown';

    const elementWidth = slideItem.value?.clientWidth || 0;

    if (rightActionInvocationDegree.value === 1) {
        moveOffset.value = -elementWidth || -1000;
        emit('right', { reset });
    } else if (leftActionInvocationDegree.value === 1) {
        moveOffset.value = elementWidth || 1000;
        emit('left', { reset });
    } else {
        reset();
    }
};
</script>

<template>
    <div
        ref="slideItem"
        :class="{
            'flex items-center justify-between overflow-hidden relative': true,
            'cursor-grab': isPanning !== true,
            'cursor-grabbing': isPanning === true,
        }"
        @mousedown="handleTouchStart"
        @mousemove="handleTouchMove"
        @mouseup="handleTouchEnd"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
        @touchcancel="handleTouchEnd"
    >
        <div
            :style="`visibility: ` + (moveOffset > 0 ? 'visible' : 'hidden')"
            :class="{
                'px-2 pt-1 h-full w-full justify-start absolute overflow-hidden flex items-center ': true,
                [leftColor || '']: true,
            }"
        >
            <div class="" :style="`transform: scale(${leftActionInvocationDegree})`">
                <slot name="left" />
            </div>
        </div>

        <div
            :style="`visibility: ` + (moveOffset < 0 ? 'visible' : 'hidden')"
            :class="{
                'px-2 pt-1 h-full w-full justify-end absolute overflow-hidden flex items-center': true,
                [rightColor || '']: true,
            }"
        >
            <div class="" :style="`transform: scale(${rightActionInvocationDegree})`">
                <slot name="right" />
            </div>
        </div>

        <div
            :class="{
                'w-full h-full bg-bg': true,
                'transition-all': touchStart === null,
            }"
            :style="`transform: translateX(${moveOffset}px)`"
        >
            <slot />
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
