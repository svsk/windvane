<script setup lang="ts">
import TransitionGroupFadeSlide from './TransitionGroupFadeSlide.vue';

const open = ref(false);

const handleMenuToggle = () => {
    open.value = !open.value;
};

const close = () => {
    open.value = false;
};

defineExpose({
    close,
});
</script>

<template>
    <div>
        <Button flat round icon="menu" icon-size="24px" @click="handleMenuToggle" />

        <Teleport to="body">
            <div
                :class="{
                    'nav-menu': true,
                    'fixed w-full h-full top-0 left-0 overflow-hidden z-30': true,
                    'pointer-events-none': !open,
                    'bg-black/50': open,
                }"
                @click="handleMenuToggle"
            >
                <TransitionGroupFadeSlide invert>
                    <div v-if="open" class="bg-card w-full max-w-[450px] h-full z-10 p-6" @click.stop>
                        <div class="flex w-full items-center justify-between">
                            <div>
                                <slot name="title" />
                            </div>
                            <Button flat icon-size="24px" round icon="close" @click="handleMenuToggle" />
                        </div>

                        <slot />
                    </div>
                </TransitionGroupFadeSlide>
            </div>
        </Teleport>
    </div>
</template>

<style scoped lang="scss">
.nav-menu {
    padding-top: env(safe-area-inset-top);
}
</style>
