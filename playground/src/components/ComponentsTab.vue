<script setup lang="ts">
import { theme } from '@/composables/useThemeColor';
import { ref } from 'vue';
import WelcomeItem from './WelcomeItem.vue';

const showDialog = ref(false);
const selectedOption = ref('option-1');
const checked = ref(false);

const colorInput = ref<HTMLInputElement | null>(null);
const bgColorInput = ref<HTMLInputElement | null>(null);
const textColorInput = ref<HTMLInputElement | null>(null);
const cardColorInput = ref<HTMLInputElement | null>(null);
const borderColorInput = ref<HTMLInputElement | null>(null);
</script>

<template>
    <div>
        <WelcomeItem>
            <template #icon>
                <Icon size="28px" name="text_select_end" />
            </template>
            <template #heading>Inputs</template>

            <div class="flex flex-col gap-2">
                <Input label="You can type here!" type="textarea" />
            </div>
        </WelcomeItem>

        <WelcomeItem>
            <template #icon>
                <Icon size="28px" name="left_click" />
            </template>

            <template #heading>Buttons</template>

            <div class="flex items-center gap-3">
                <Button>Basic</Button>
                <Button icon="home" icon-size="20px">With an Icon</Button>
                <Button round icon="home" icon-size="20px"></Button>
                <Button flat>Flat</Button>
            </div>
        </WelcomeItem>

        <WelcomeItem>
            <template #icon>
                <Icon size="28px" name="dialogs" />
            </template>

            <template #heading>Dialogs</template>

            <div class="flex items-center gap-3">
                <Button @click="showDialog = true">Click Me</Button>

                <Dialog v-model="showDialog" with-confirm @confirm="showDialog = false" @cancel="showDialog = false">
                    <template #title> Cool Title! </template>

                    <div class="pb-2">You must type something!</div>

                    <Input :rules="[(val: any) => !!val || 'I will validate on confirm!']" label="Type something!" />
                </Dialog>
            </div>
        </WelcomeItem>

        <WelcomeItem>
            <template #icon>
                <Icon size="28px" name="filter_list" />
            </template>
            <template #heading>Selects</template>

            <div class="flex flex-col gap-1">
                <Select
                    v-model="selectedOption"
                    label="Pick one!"
                    :options="[
                        { label: 'Option 1', value: 'option-1' },
                        { label: 'Option 2', value: 'option-2' },
                        { label: 'Option 3', value: 'option-3' },
                    ]"
                />

                <div>Selected option: {{ selectedOption }}</div>
            </div>
        </WelcomeItem>

        <WelcomeItem>
            <template #icon>
                <Icon size="28px" name="check_box" />
            </template>
            <template #heading>Checkboxes</template>

            <div class="flex gap-3">
                <Checkbox v-model="checked" size="24px" />
                <Checkbox v-model="checked" size="48px" />
                <Checkbox v-model="checked" size="64px" />
            </div>
        </WelcomeItem>

        <WelcomeItem>
            <template #icon>
                <Icon size="28px" name="routine" />
            </template>
            <template #heading>Theming</template>

            <div class="pb-2">You can customize the look and feel of your application by creating a @theme.</div>

            <div class="flex flex-col gap-2">
                <div class="flex items-center gap-3">
                    <div class="flex">
                        <Button round @click="() => colorInput?.click()" icon="colorize" icon-size="24px" />
                        <input ref="colorInput" type="color" v-model="theme.primary" class="invisible h-1 w-1" />
                    </div>
                    Primary Color
                </div>
                <div class="flex items-center gap-3">
                    <div class="flex">
                        <Button round @click="() => bgColorInput?.click()" icon="colorize" icon-size="24px" />
                        <input ref="bgColorInput" type="color" v-model="theme.bg" class="invisible h-1 w-1" />
                    </div>
                    Background Color
                </div>
                <div class="flex items-center gap-3">
                    <div class="flex">
                        <Button round @click="() => textColorInput?.click()" icon="colorize" icon-size="24px" />
                        <input ref="textColorInput" type="color" v-model="theme.text" class="invisible h-1 w-1" />
                    </div>
                    Text Color
                </div>
                <div class="flex items-center gap-3">
                    <div class="flex">
                        <Button round @click="() => cardColorInput?.click()" icon="colorize" icon-size="24px" />
                        <input ref="cardColorInput" type="color" v-model="theme.card" class="invisible h-1 w-1" />
                    </div>
                    Card Color
                </div>

                <div class="flex items-center gap-3">
                    <div class="flex">
                        <Button round @click="() => borderColorInput?.click()" icon="colorize" icon-size="24px" />
                        <input ref="borderColorInput" type="color" v-model="theme.border" class="invisible h-1 w-1" />
                    </div>
                    Border Color
                </div>
            </div>
        </WelcomeItem>
    </div>
</template>
