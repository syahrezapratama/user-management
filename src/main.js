import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'

import HomePage from './components/HomePage.vue';
import TheNavigation from './components/TheNavigation.vue';
import DataPage from './components/DataPage.vue';
import ListPersons from './components/ListPersons.vue';
import SearchPage from './components/SearchPage.vue';
import LogoutPage from './components/LogoutPage.vue';
import UserData from './components/UserData.vue';

const app = createApp(App);

app.use(router);
app.component('home-page', HomePage);
app.component('the-navigation', TheNavigation);
app.component('data-page', DataPage);
app.component('list-persons', ListPersons)
app.component('search-page', SearchPage);
app.component('logout-page', LogoutPage);
app.component('user-data', UserData);
app.mount('#app');
