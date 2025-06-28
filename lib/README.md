# @skyloft/windvane

A UI library based on Tailwind and inspired by Material UI.

## Installation

You must have Tailwind installed, preferably `^4.0.0`.

Then install Windvane.

```
npm install @skyloft/windvane
```

Install plugin in Vue startup:

```TypeScript
// main.ts

import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Perform Windvane imports
import '@skyloft/windvane/windvane.css';
import Windvane from '@skyloft/windvane';

const app = createApp(App);

app.use(router);

// Install as plugin
app.use(Windvane);

app.mount('#app');

```

in your css, set up some theming

```CSS
/* main.css */

@import 'tailwindcss';

/* Windvane setup  */
@source '../../node_modules/@skyloft/windvane';
@theme {
    --color-primary: rgb(0, 189, 126);
    --color-card: #1a1a1a;
    --color-bg: black;
}
/* Windvane setup end */

:root {
    color: white;
}

body {
    background-color: black;
}

```

If you want code completion and syntax highlighting in VSCode you should add this to your tsconfig's compilerOptions:

```JSON
// tsconfig.json (or tsconfig.app.json)

{
    // <Other settings omitted for brevity>
    "compilerOptions": {
        "types": ["@skyloft/windvane/global"],
    }
}
```

Then you're ready to go!

```vue
<script setup lang="ts">
const selectedTab = ref('general');
</script>

<template>
    <div class="flex flex-col gap-4">
        <Tabs v-model="selectedTab" active-color="primary">
            <Tab name="general">General</Tab>
            <Tab name="security">Security</Tab>
            <Tab name="privacy">Privacy</Tab>
            <Tab name="utilities">Utilities</Tab>
        </Tabs>

        <div v-if="selectedTab === 'general'">
            <h1>General</h1>
        </div>
    </div>
</template>
```

## Development

At the root of the repo run

```
pnpm install
```

open two CLIs and simultaneously run

```
pnpm build:lib:watch
```

and

```
pnpm dev
```
