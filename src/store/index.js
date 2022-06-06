import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      userIsLoggedIn: false,
      users: [],
      selectedUser: null,
      currentUser: { name: "test user" },
      searchResults: []
    };
  },
  getters: {
    users(state) {
      return state.users;
    },
    userIsLoggedIn(state) {
      return state.userIsLoggedIn;
    },
    selectedUser(state) {
      return state.selectedUser;
    },
    searchResults(state) {
      return state.searchResults;
    }
  },
  mutations: {
    setUsers(state, payload) {
      state.users = payload;
    },
    registerUser(state, payload) {
      state.users.push(payload);
    },
    updateUser(state, payload) {
      state.users = payload;
    },
    deleteUser(state, payload) {
      const users = state.users.filter(user => user.id != payload);
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
    }
  },
  actions: {
    logUserIn(context, payload) {
      console.log(payload);
      context.commit("logUserIn", payload);
    },
    async loadUsers(context) {
      const response = await fetch("http://localhost:8081/api/users");
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        const error = new Error(
          response.statusText || "Failed to load users from API."
        );
        throw error;
      }
      const users = [];
      for (const key in data) {
        const user = {
          id: data[key].id,
          email: data[key].email,
          name: data[key].name,
          zipCode: data[key].zipCode,
          city: data[key].city,
          phone: data[key].phone,
          password: data[key].password,
          type: data[key].type
        };
        users.push(user);
      }
      context.commit("setUsers", users);
    },
    async selectUser(context, payload) {
      const userId = payload;
      const response = await fetch(`http://localhost:8081/api/user/${userId}`);
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        const error = new Error(response.statusText || `Failed to load user with id: ${userId}.`);
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
      const data = await response.json();
      console.log(data);
      if (response.status !== 201) {
        const error = new Error(
          response.statusText || "Failed to post new user."
        );
        throw error;
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
        type: payload.type ? payload.type : "normal"
      };
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateUser)
      };
      const response = await fetch(`http://localhost:8081/api/user/${userId}`, requestOptions);
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (response.status !== 200) {
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
      const response = await fetch(`http://localhost:8081/api/user/${userId}`, { method: "DELETE" });
      console.log(response);
      if (!response.ok) {
        const error = new Error(response.statusText || `Failed to delete user with id: ${userId}.`);
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
        phone: payload.phone
      };
      console.log(params);
      const response = await fetch("http://localhost:8081/api/search?" + (new URLSearchParams(params)).toString());
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        const error = new Error(response.statusText);
        throw error;
      }
      context.commit("setSearchResults", data);
    }
  },
});
export default store;
