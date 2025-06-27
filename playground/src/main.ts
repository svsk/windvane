import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Perform Windvane imports
import '@skyloft/windvane/windvane.css';
import Windvane from '@skyloft/windvane';

const app = createApp(App);

// Install as plugin
app.use(Windvane);

app.use(router);

app.mount('#app');
