import { createApp } from 'vue';
import { createPinia } from 'pinia';
import persistedState from 'pinia-plugin-persistedstate';

import App from './App.vue';
import './main.css';

const app = createApp(App);
const pinia = createPinia();

pinia.use(persistedState);

app.use(pinia);
app.mount('#App');
