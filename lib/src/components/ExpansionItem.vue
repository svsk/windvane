<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import Button from './Button.vue';

interface Props {
    /** Current open/close state of the expansion item. Takes precedence over defaultOpened. */
    value?: boolean;
    /** If set to true, the default state will be open. However, if the v-model (value) is set to true, the v-model takes precedence. */
    defaultOpened?: boolean;
    switchToggleSide?: boolean;
    keepAlive?: boolean;
    /** If true, makes clicking the entire header toggle the expansion state, rather than just the toggle button. */
    headerClickable?: boolean;
    titleClass?: string;
    hideToggle?: boolean;
}

interface Emits {
    (event: 'input', value: boolean): void;
}

const props = withDefaults(defineProps<Props>(), { value: undefined });
const emit = defineEmits<Emits>();

// It should be default expanded if value is true or defaultOpened is true.
// If defaultOpened is set to true, but the value is set to false, the value takes precedence.
const expanded = ref(props.value ?? props.defaultOpened ?? false);

const expandIcon = computed(() => (expanded.value ? 'expand_less' : 'expand_more'));

const handleHeaderClicked = () => {
    if (!props.headerClickable) {
        return;
    }

    toggle();
};

const toggle = (expandDesired?: boolean) => {
    expanded.value = expandDesired == null ? !expanded.value : expandDesired;
};

watch(
    () => expanded.value,
    () => {
        if (props.value !== expanded.value) {
            emit('input', expanded.value);
        }
    },
);

defineExpose({
    toggle,
});
</script>

<template>
    <div>
        <div
            v-if="!switchToggleSide"
            :class="{ 'flex items-center gap-2': true, 'cursor-pointer': headerClickable }"
            @click="handleHeaderClicked"
        >
            <Button
                v-if="!hideToggle"
                icon-size="24px"
                round
                flat
                dense
                :icon="expandIcon"
                @click.stop="(_) => toggle()"
            />
            <slot name="title" />
        </div>

        <div
            v-else
            :class="{
                'flex items-center gap-2 justify-between': true,
                'cursor-pointer': headerClickable,
                [titleClass || '']: true,
            }"
            @click="handleHeaderClicked"
        >
            <span>
                <slot name="title" />
            </span>
            <Button
                v-if="!hideToggle"
                icon-size="24px"
                round
                flat
                dense
                :icon="expandIcon"
                @click.stop="(_) => toggle()"
            />
        </div>

        <Transition name="slideUp" v-if="!keepAlive" vertical>
            <div v-if="expanded">
                <slot />
            </div>
        </Transition>

        <Transition name="slideUp" v-if="keepAlive" vertical>
            <div v-show="expanded">
                <slot />
            </div>
        </Transition>
    </div>
</template>

<style scoped lang="scss">
/** slideUp **/
.slideUp-enter-active,
.slideUp-leave-active {
    transition: all 0.1s linear;
}

.slideUp-enter-from,
.slideUp-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}
</style>
