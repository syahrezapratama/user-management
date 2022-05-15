import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../components/HomePage.vue";
import DataPage from "../components/DataPage.vue";
import ListPersons from "../components/ListPersons.vue";
import SearchPage from "../components/SearchPage.vue";
import LogoutPage from "../components/LogoutPage.vue";
import SuccessDialog from "../components/SuccessDialog.vue";
import UserData from "../components/UserData.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", component: HomePage },
    { path: "/mydata", component: DataPage },
    { path: "/persons", component: ListPersons },
    { path: "/search", component: SearchPage },
    { path: "/logout", component: LogoutPage },
    { path: "/updateSuccess", component: SuccessDialog },
    { path: "/persons/:userId", component: UserData },
  ],
  linkActiveClass: "active",
});

export default router;
