<script lang="ts" setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';

const isTouch = ref(false);
const hostElement = ref<HTMLSpanElement | null>(null);
const size = '20px';
const visible = ref(false);

const calculateKeyboardHeight = () => {
    return window.innerHeight - (window.visualViewport?.height || 0);
};

const keyboardOffset = ref(calculateKeyboardHeight());

const setKeyboardOffset = () => {
    keyboardOffset.value = calculateKeyboardHeight();
};

const handleTouch = () => {
    isTouch.value = true;
};

onMounted(() => {
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', setKeyboardOffset);
    }

    window.addEventListener('scroll', setKeyboardOffset);
    window.addEventListener('touchstart', handleTouch);
});

onBeforeUnmount(() => {
    if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', setKeyboardOffset);
    }

    window.removeEventListener('scroll', setKeyboardOffset);
    window.removeEventListener('touchstart', handleTouch);
});

const type = async (symbol: string) => {
    const input = hostElement.value?.getElementsByTagName('input')[0];

    if (input?.selectionStart != null) {
        const insertIdx = input.selectionStart;
        const existingValue = input.value;
        input.value = `${existingValue.substring(0, insertIdx)}${symbol}${existingValue.substring(insertIdx)}`;
        await nextTick();
        input.setSelectionRange(insertIdx + 1, insertIdx + 1);
    } else if (input) {
        input.value += symbol;
    }
};

const show = () => {
    visible.value = true;
};

const hide = () => {
    visible.value = false;
};
</script>

<template>
    <span class="host-element" ref="hostElement">
        <slot :show="show" :hide="hide" />

        <Teleport v-if="isTouch && visible" to="body">
            <div
                class="custom-buttons m-0 px-2 py-4 flex flex-col items-center justify-center"
                :style="`bottom: ${keyboardOffset}px`"
            >
                <div class="full-width flex items-center justify-center" style="gap: 6px">
                    <Button
                        :size="size"
                        style="flex-grow: 1"
                        color="primary"
                        label="+"
                        @touchstart.prevent="type('+')"
                    />
                    <Button
                        :size="size"
                        style="flex-grow: 1"
                        color="primary"
                        label="-"
                        @touchstart.prevent="type('-')"
                    />
                    <Button
                        :size="size"
                        style="flex-grow: 1"
                        color="primary"
                        label="/"
                        @touchstart.prevent="type('/')"
                    />
                    <Button
                        :size="size"
                        style="flex-grow: 1"
                        color="primary"
                        label="*"
                        @touchstart.prevent="type('*')"
                    />
                    <Button
                        :size="size"
                        style="flex-grow: 1"
                        color="primary"
                        label="("
                        @touchstart.prevent="type('(')"
                    />
                    <Button
                        :size="size"
                        style="flex-grow: 1"
                        color="primary"
                        label=")"
                        @touchstart.prevent="type(')')"
                    />
                    <Button
                        :size="size"
                        style="flex-grow: 1"
                        color="primary"
                        label="."
                        @touchstart.prevent="type('.')"
                    />
                </div>
            </div>
        </Teleport>
    </span>
</template>

<style lang="scss" scoped>
.custom-buttons {
    transition: bottom 0.2s linear;
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    z-index: 7500;
}
</style>
