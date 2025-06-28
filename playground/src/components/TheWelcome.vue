<script setup lang="ts">
import { ref } from 'vue';
import WelcomeItem from './WelcomeItem.vue';
import { themeColor } from '@/composables/useThemeColor';

const showDialog = ref(false);
const selectedOption = ref('option-1');
const selectedTab = ref('components');
const checked = ref(false);

const colorInput = ref<HTMLInputElement | null>(null);
</script>

<template>
    <Card with-title-border title-style="padding-bottom: 0px;" style="width: 610px; min-height: 820px; max-width: 90vw">
        <template #title>
            <div class="flex items-center justify-between w-full flex-wrap">
                <h2 class="text-2xl pb-4">Features</h2>

                <Tabs v-model="selectedTab" active-color="primary" style="transform: translateY(1px)">
                    <Tab name="components">Components</Tab>
                    <Tab name="utilities">Utilities</Tab>
                    <Tab name="docs">Docs</Tab>
                </Tabs>
            </div>
        </template>

        <div v-if="selectedTab === 'docs'" class="px-6">
            <WelcomeItem>
                <template #icon>
                    <Icon size="28px" name="book_ribbon" />
                </template>
                <template #heading>Documentation</template>

                Windvane's documentation is available online at https://github.com/svsk/windvane
            </WelcomeItem>
        </div>

        <div v-if="selectedTab === 'components'" class="px-6">
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

                    <Dialog
                        v-model="showDialog"
                        with-confirm
                        @confirm="showDialog = false"
                        @cancel="showDialog = false"
                    >
                        <template #title> Cool Title! </template>

                        <div class="pb-2">You must type something!</div>

                        <Input
                            :rules="[(val: any) => !!val || 'I will validate on confirm!']"
                            label="Type something!"
                        />
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

                <div class="flex gap-3 items-center">
                    <div class="flex">
                        <Button round @click="() => colorInput?.click()" icon="colorize" icon-size="24px" />
                        <input ref="colorInput" type="color" v-model="themeColor" class="invisible h-1 w-1" />
                    </div>

                    You can customize the look and feel of your application by creating a @theme.
                </div>
            </WelcomeItem>
        </div>
    </Card>
</template>
