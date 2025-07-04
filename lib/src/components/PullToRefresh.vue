<script setup lang="ts">
let clientYWhenTopWasHit: null | number = null;
const maxPullSize = 100;

const pulledHeight = ref(0);
const reloading = ref(false);
const pullToRefreshEnabled = ref(true);

provide<Ref<boolean>>('pullToRefreshEnabled', pullToRefreshEnabled);

const handleTouchMove = (e: TouchEvent) => {
    if (!pullToRefreshEnabled.value) {
        return;
    }

    // Stop if we are not at the top of the page
    if (window.scrollY > 0 && clientYWhenTopWasHit === null) {
        pulledHeight.value = 0;
        return;
    }

    const currentFingerPosition = e.touches[0].clientY;
    clientYWhenTopWasHit = clientYWhenTopWasHit || currentFingerPosition;

    const pullDistance = -(clientYWhenTopWasHit - currentFingerPosition);
    pulledHeight.value = Math.min(pullDistance / 2, maxPullSize);
};

const handleTouchEnd = (e: TouchEvent) => {
    if (pulledHeight.value >= maxPullSize) {
        reloading.value = true;
        location.reload();
    }

    pulledHeight.value = 0;
    clientYWhenTopWasHit = null;
};

const iconSize = computed(() => {
    return (1 / maxPullSize) * pulledHeight.value;
});
</script>

<template>
    <div v-if="!reloading" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
        <div
            :class="{
                'overflow-y-hidden flex items-center justify-center absolute rounded-full bg-primary z-50': true,
            }"
            :style="`top: ${
                pulledHeight - 50
            }px; width: 50px; height: 50px; left: calc(50% - 25px); transition: top 0.1s;`"
        >
            <Icon
                :style="`transform: rotate(${260 + pulledHeight * 3}deg) scale(${iconSize}); transform-origin: center;`"
                name="refresh"
                font-size="24px"
            />
        </div>
        <slot />
    </div>
</template>

<style scoped lang="scss"></style>
