<script setup lang="ts">
import Button from './Button.vue';

interface Props {
    modelValue: boolean;
    persistent?: boolean;
    withConfirm?: boolean;
    unpadded?: boolean;
    preload?: boolean;
    maxWidth?: string;
    confirmColor?: string;
    confirmText?: string;
    disableConfirm?: boolean;
    disableCancel?: boolean;
    title?: string;
}

interface Emits {
    (event: 'update:modelValue', value: boolean): void;
    (event: 'cancel'): void;
    (event: 'confirm'): void;
}

const props = withDefaults(defineProps<Props>(), { withConfirm: false, preload: false, maxWidth: '450px' });

const emit = defineEmits<Emits>();

const showDialog = ref(false);
const showBackdrop = ref(false);

const handleClickOutside = () => {
    if (props.persistent) {
        return;
    }

    emit('update:modelValue', false);
};

watchEffect(() => {
    if (props.modelValue) {
        showBackdrop.value = true;
        setTimeout(() => {
            showDialog.value = true;
        }, 150);
    } else {
        showDialog.value = false;
        setTimeout(() => {
            showBackdrop.value = false;
        }, 150);
    }
});
</script>

<template>
    <Teleport to="body">
        <Transition name="fade">
            <div
                v-if="showBackdrop || preload"
                v-show="showBackdrop"
                class="flex flex-col items-center justify-center fixed w-full h-full bg-black/30 top-0 left-0 p-6 z-50"
                @click="handleClickOutside"
            >
                <Transition name="grow">
                    <div
                        v-show="showDialog"
                        with-title-border
                        @click.stop
                        :class="{
                            'w-full flex flex-col max-h-[90vh] bg-card rounded shadow-lg': true,
                        }"
                        :style="`max-width: ${maxWidth};`"
                    >
                        <h2
                            v-if="$slots.title || title"
                            class="font-medium text-lg shrink-0 p-6 pb-4 border-b border-b-gray-500"
                        >
                            <slot name="title">
                                {{ title }}
                            </slot>
                        </h2>

                        <div :class="{ 'overflow-y-auto grow': true, 'p-6': !unpadded }">
                            <slot />
                        </div>

                        <div v-if="withConfirm" class="w-full flex justify-end pt-6 p-6 gap-2 shrink-0">
                            <Button :readonly="disableCancel" flat @click="emit('cancel')"> Cancel </Button>
                            <Button :readonly="disableConfirm" :color="confirmColor" @click="emit('confirm')">
                                {{ confirmText || 'Confirm' }}
                            </Button>
                        </div>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>

<style lang="scss">
.fade-enter-active {
    transition: all 0.15s ease-in-out;
}

.fade-leave-active {
    transition: all 0.15s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.grow-enter-active {
    transition: all 0.15s ease-in-out;
}

.grow-leave-active {
    transition: all 0.15s ease-in-out;
}

.grow-enter-from,
.grow-leave-to {
    transform: scale(0);
}
</style>
