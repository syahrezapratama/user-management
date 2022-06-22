import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import HomePage from './components/HomePage.vue';
import TheNavigation from './components/TheNavigation.vue';

const app = createApp(App);

app.use(store);
app.use(router);
app.component('home-page', HomePage);
app.component('the-navigation', TheNavigation);
app.mount('#app');
