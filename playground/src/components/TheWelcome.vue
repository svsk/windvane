<script setup lang="ts">
import { ref } from 'vue';
import WelcomeItem from './WelcomeItem.vue';

const showDialog = ref(false);
</script>

<template>
    <Card with-title-border>
        <template #title> <h2 class="text-2xl">Features</h2> </template>

        <div class="px-6">
            <WelcomeItem>
                <template #icon>
                    <Icon size="28px" name="book_ribbon" />
                </template>
                <template #heading>Documentation</template>

                Windvane's documentation is available online at https://github.com/svsk/windvane
            </WelcomeItem>

            <WelcomeItem>
                <template #icon>
                    <Icon size="28px" name="routine" />
                </template>
                <template #heading>Theming</template>

                You can customize the look and feel of your application by creating a @theme.
            </WelcomeItem>

            <WelcomeItem>
                <template #icon>
                    <Icon size="28px" name="text_select_end" />
                </template>
                <template #heading>Inputs</template>

                <Input label="You can type here!" />
            </WelcomeItem>

            <WelcomeItem>
                <template #icon>
                    <Icon size="28px" name="left_click" />
                </template>

                <template #heading>Buttons</template>

                <div class="flex items-center gap-3">
                    <Button>Basic</Button>
                    <Button icon="home">With an Icon</Button>
                    <Button round icon="home"></Button>
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

                <Select
                    label="Pick one!"
                    :options="[
                        { label: 'Option 1', value: 'option-1' },
                        { label: 'Option 2', value: 'option-2' },
                        { label: 'Option 3', value: 'option-3' },
                    ]"
                />
            </WelcomeItem>
        </div>
    </Card>
</template>
