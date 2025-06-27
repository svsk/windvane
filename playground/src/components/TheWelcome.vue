<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue';
import DocumentationIcon from './icons/IconDocumentation.vue';
import ToolingIcon from './icons/IconTooling.vue';
import EcosystemIcon from './icons/IconEcosystem.vue';
import CommunityIcon from './icons/IconCommunity.vue';
import SupportIcon from './icons/IconSupport.vue';

const openReadmeInEditor = () => fetch('/__open-in-editor?file=README.md');
</script>

<template>
    <Card with-title-border>
        <template #title> <h2 class="text-2xl">Features</h2> </template>

        <div class="px-6">
            <WelcomeItem>
                <template #icon>
                    <DocumentationIcon />
                </template>
                <template #heading>Documentation</template>

                Windvane's documentation is available online at https://github.com/svsk/windvane
            </WelcomeItem>

            <WelcomeItem>
                <template #icon>
                    <ToolingIcon />
                </template>
                <template #heading>Theming</template>

                You can customize the look and feel of your application by creating a @theme.
            </WelcomeItem>

            <WelcomeItem>
                <template #icon>
                    <EcosystemIcon />
                </template>
                <template #heading>Inputs</template>

                <Input label="You can type here!" />
            </WelcomeItem>

            <WelcomeItem>
                <template #icon>
                    <CommunityIcon />
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
                    <SupportIcon />
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
