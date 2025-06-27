<script setup lang="ts">
import Icon from './Icon.vue';

interface Props {
    icon?: string;
    size?: string;
    iconSize?: string;
    readonly?: boolean;
    flat?: boolean;
    round?: boolean;
    color?: string;
    disable?: boolean;
    label?: string;
    type?: 'button' | 'submit' | 'reset';
}

const props = withDefaults(defineProps<Props>(), { readonly: false, iconSize: '1em', type: 'button' });
</script>

<template>
    <button
        v-ripple
        :disabled="readonly || disable"
        :type="type"
        :class="{
            'relative rounded flex items-center justify-center text-center gap-2 font-medium text-sm': true,
            [color || 'text-white']: true,
            'bg-primary': !flat,
            'bg-transparent': flat,
            'opacity-70 cursor-not-allowed': readonly || disable,
            'cursor-pointer': !readonly && !disable,
            'rounded-full aspect-square p-2': round,
            'py-2 px-4': !round,
        }"
    >
        <Icon v-if="icon" :name="icon" :font-size="iconSize" />

        <slot>
            {{ label }}
        </slot>
    </button>
</template>
