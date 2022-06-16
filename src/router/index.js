import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../components/HomePage.vue";
import DataPage from "../components/DataPage.vue";
import ListPersons from "../components/ListPersons.vue";
import SearchPage from "../components/SearchPage.vue";
import LogoutPage from "../components/LogoutPage.vue";
import SuccessDialog from "../components/SuccessDialog.vue";
import UserData from "../components/UserData.vue";
import EditUser from "../components/EditUser.vue";
import RegistrationForm from "../components/RegistrationForm.vue";
import RegistrationSuccess from "../components/RegistrationSuccess.vue";
import LoginPage from "../components/LoginPage.vue";
import BaseDialog from "../components/BaseDialog.vue";
import store from "../store/index.js";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", component: HomePage, meta: { requiresAuth: true } },
    { path: "/mydata", component: DataPage, meta: { requiresAuth: true } },
    { path: "/persons", component: ListPersons, meta: { requiresAuth: true } },
    { path: "/search", component: SearchPage, meta: { requiresAuth: true } },
    { path: "/logout", component: LogoutPage },
    { path: "/updateSuccess", component: SuccessDialog },
    { path: "/persons/:userId", component: UserData, meta: { requiresAuth: true } },
    { path: "/editUser/:userId", component: EditUser, meta: { requiresAuth: true }},
    { path: "/registration", component: RegistrationForm, meta: { requiresUnauth: true } },
    { path: "/registrationSuccess", component: RegistrationSuccess }, 
    { path: "/login", component: LoginPage, meta: { requiresUnauth: true } },
    { path: "/dialog", component: BaseDialog },
  ],
  linkActiveClass: "active",
});

router.beforeEach(function(to, from, next){
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/login");
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next("/home");
  } else {
    next();
  }
});

export default router;
