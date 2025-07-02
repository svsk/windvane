<script setup lang="ts">
import { ref } from 'vue';
import WelcomeItem from './WelcomeItem.vue';
import ComponentsTab from './ComponentsTab.vue';

const selectedTab = ref('components');
</script>

<template>
    <Card with-title-border title-style="padding-bottom: 0px;" style="min-height: 840px; width: 600px; max-width: 90vw">
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

        <div class="relative">
            <ComponentsTab v-if="selectedTab === 'components'" :class="{ 'px-6': true }" />

            <div v-if="selectedTab === 'utilities'" :class="{ 'px-6': true }"></div>

            <div v-if="selectedTab === 'docs'" :class="{ 'px-6': true }">
                <WelcomeItem>
                    <template #icon>
                        <Icon size="28px" name="book_ribbon" />
                    </template>
                    <template #heading>Documentation</template>

                    Windvane's documentation is available online at https://github.com/svsk/windvane
                </WelcomeItem>
            </div>
        </div>
    </Card>
</template>
