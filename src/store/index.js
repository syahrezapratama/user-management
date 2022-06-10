import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      userIsLoggedIn: true,
      users: [],
      pages: {
        current: null,
        previous: null,
        next: null,
      },
      selectedUser: null,
      currentUser: { name: "test user" },
      searchResults: [],
      errorMessage: null,
    };
  },
  getters: {
    users(state) {
      return state.users;
    },
    pages(state) {
      return state.pages;
    },
    userIsLoggedIn(state) {
      return state.userIsLoggedIn;
    },
    selectedUser(state) {
      return state.selectedUser;
    },
    searchResults(state) {
      return state.searchResults;
    },
    errorMessage(state) {
      return state.errorMessage;
    },
  },
  mutations: {
    setUsers(state, payload) {
      state.users = payload;
    },
    setPages(state, payload) {
      state.pages = payload;
    },
    registerUser(state, payload) {
      state.users.push(payload);
    },
    updateUser(state, payload) {
      state.users = payload;
    },
    deleteUser(state, payload) {
      const users = state.users.filter((user) => user.id != payload);
      state.users = users;
    },
    logUserIn(state, payload) {
      state.userIsLoggedIn = payload;
    },
    setSelectedUser(state, payload) {
      state.selectedUser = payload;
    },
    logoutUser(state) {
      state.currentUser = {};
    },
    setCurrentUser(state, payload) {
      state.currentUser = payload;
    },
    setSearchResults(state, payload) {
      state.searchResults = payload;
    },
    setErrorMessage(state, payload) {
      state.errorMessage = payload
    }
  },
  actions: {
    logUserIn(context, payload) {
      console.log(payload);
      context.commit("logUserIn", payload);
    },
    async loadUsers(context, payload) {
      const page = payload ? payload : 1;
      const response = await fetch(
        `http://localhost:8081/api/users/?limit=10&page=${page}`
      );
      console.log(response);
      const data = await response.json();
      const result = data.results;
      console.log(result);
      if (!response.ok) {
        const error = new Error(
          response.statusText || "Failed to load users from API."
        );
        throw error;
      }
      const users = [];
      for (const key in result) {
        const user = {
          id: result[key].id,
          email: result[key].email,
          name: result[key].name,
          zipCode: result[key].zipCode,
          city: result[key].city,
          phone: result[key].phone,
          type: result[key].type,
        };
        users.push(user);
      }
      context.commit("setUsers", users);
      const pages = {
        current: page,
        previous: data.previous ? data.previous.page : null,
        next: data.next ? data.next.page : null,
      };
      context.commit("setPages", pages);
    },
    async selectUser(context, payload) {
      const userId = payload;
      const response = await fetch(`http://localhost:8081/api/user/${userId}`);
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        const error = new Error(
          response.statusText || `Failed to load user with id: ${userId}.`
        );
        throw error;
      }
      context.commit("setSelectedUser", data);
    },
    async registerUser(context, payload) {
      const userData = {
        email: payload.email,
        name: payload.name,
        zipCode: payload.zipCode,
        city: payload.city,
        phone: payload.phone,
        password: payload.password,
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      };
      const response = await fetch(
        "http://localhost:8081/api/register",
        requestOptions
      );
      console.log(response);
      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        const message = data.message;
        throw new Error(message);
      }
      context.commit("registerUser", userData);
    },
    async updateUserData(context, payload) {
      const userId = payload.id;
      // let updateUser = context.getters.users.find((user) => user.id === userId);
      const updateUser = {
        email: payload.email,
        name: payload.name,
        zipCode: payload.zipCode,
        city: payload.city,
        phone: payload.phone,
        password: payload.password,
        type: payload.type ? payload.type : "normal",
      };
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateUser),
      };
      const response = await fetch(
        `http://localhost:8081/api/user/${userId}`,
        requestOptions
      );
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        const error = new Error(
          response.statusText || `Failed to update user ${userId}.`
        );
        throw error;
      }
      context.commit("updateUser", updateUser);
    },
    async deleteUser(context, payload) {
      // delete video in server
      const userId = payload;
      const response = await fetch(`http://localhost:8081/api/user/${userId}`, {
        method: "DELETE",
      });
      console.log(response);
      if (!response.ok) {
        const error = new Error(
          response.statusText || `Failed to delete user with id: ${userId}.`
        );
        throw error;
      } else {
        // delete video in state
        context.commit("deleteUser", userId);
      }
    },
    async logoutUser(context) {
      context.commit("logoutUser");
    },
    async loginUser(context, payload) {
      // call api
      context.commit("setCurrentUser", payload);
    },
    async searchUsers(context, payload) {
      const params = {
        email: payload.email,
        name: payload.name,
        zipCode: payload.zipCode,
        city: payload.city,
        phone: payload.phone,
      };
      console.log(params);
      const response = await fetch(
        "http://localhost:8081/api/search?" +
          new URLSearchParams(params).toString()
      );
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        const error = new Error(response.statusText);
        throw error;
      }
      context.commit("setSearchResults", data);
    },
  },
});
export default store;
