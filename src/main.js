import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import currency from './directives/currency.js';

const app = createApp(App)

app.use(router)

app.directive('currency', currency);

app.mount('#app')
