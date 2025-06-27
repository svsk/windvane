<script setup lang="ts">
import { DateHelpers } from './DateHelpers';

interface Props {
    modelValue: Date | null;
    firstDayOfWeek?: number;
    readonly?: boolean;
    events?: (date: string) => boolean;
    eventColor?: (date: string) => string;
}

interface Emits {
    (event: 'update:modelValue', value: Date): void;
}

const props = withDefaults(defineProps<Props>(), { firstDayOfWeek: 0 });
const emit = defineEmits<Emits>();

const pickedDate = ref<Date | null>(props.modelValue);

const today = new Date();

const focusedDate = pickedDate.value || today;
const day = ref(focusedDate.getDate());
const month = ref(focusedDate.getMonth() + 1);
const year = ref(focusedDate.getFullYear());

const months = computed(() => {
    return [
        { value: 1, label: 'January' },
        { value: 2, label: 'February' },
        { value: 3, label: 'March' },
        { value: 4, label: 'April' },
        { value: 5, label: 'May' },
        { value: 6, label: 'June' },
        { value: 7, label: 'July' },
        { value: 8, label: 'August' },
        { value: 9, label: 'September' },
        { value: 10, label: 'October' },
        { value: 11, label: 'November' },
        { value: 12, label: 'December' },
    ];
});

const days = computed(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return days.map((_, index) => {
        const adjustedIndex = (index + props.firstDayOfWeek) % 7;
        return days[adjustedIndex];
    });
});

const dates = computed(() => {
    const start = new Date(year.value, month.value - 1, 1);
    const end = new Date(year.value, month.value, 0);

    if (!start || !end) {
        return [];
    }

    const result = [];

    let date = start;
    while (date <= end) {
        const formattedDate = DateHelpers.formatDate(date, 'yyyy/MM/dd');
        const hasEvent = props.events?.(formattedDate) || false;
        const color = hasEvent ? props.eventColor?.(formattedDate) : null;

        result.push({
            color,
            unixDate: date.getTime(),
            dayOfWeek: ((date.getDay() + 7 - props.firstDayOfWeek) % 7) + 1,
        });

        date.setDate(date.getDate() + 1);
    }

    return result;
});

const isToday = (unixDate: number) => {
    const date = new Date(unixDate);

    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
};

const isPickedDate = (unixDate: number) => {
    return pickedDate.value?.getTime() === unixDate;
};

const handleDateClicked = (unixDate: number) => {
    if (props.readonly) {
        return;
    }

    const date = new Date(unixDate);
    day.value = date.getDate();
    month.value = date.getMonth() + 1;
    year.value = date.getFullYear();

    pickedDate.value = date;
    emit('update:modelValue', date);
};
</script>

<template>
    <div class="flex flex-col gap-3">
        <div class="flex gap-2 justify-between">
            <Select v-model="month" :options="months" />
            <Input v-model="year" type="number" />
        </div>

        <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 5px">
            <div v-for="day in days" :key="day" class="text-center opacity-50">
                {{ day }}
            </div>

            <button
                v-for="date in dates"
                v-ripple
                :key="date.unixDate"
                :disable="readonly"
                :class="{
                    'text-center rounded py-2 relative': true,
                    'cursor-pointer': !readonly,
                    'border border-white/25': isToday(date.unixDate),
                    'bg-primary': isPickedDate(date.unixDate),
                    [`bg-${date.color}`]: !!date.color && !isPickedDate(date.unixDate),
                }"
                :style="`grid-column-start: ${date.dayOfWeek};`"
                @click="handleDateClicked(date.unixDate)"
            >
                {{ DateHelpers.formatDate(date.unixDate, 'dd') }}
            </button>
        </div>
    </div>
</template>
