import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import './styles/global.scss';
import '@fontsource/orbitron/700.css';

const app = createApp(App);
app.use(router);
app.mount('#app');
