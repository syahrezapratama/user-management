import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      userIsLoggedIn: false,
      users: [],
      selectedUser: null
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
    }
  },
  actions: {
    logUserIn(context, payload) {
      console.log(payload);
      context.commit("logUserIn", payload);
    },
    async loadUsers(context) {
      const response = await fetch("http://localhost:8081/api/users/allUsers");
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
      const response = await fetch(`http://localhost:8081/api/users/${userId}`);
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
        "http://localhost:8081/api/users/registerUser",
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
      const response = await fetch(`http://localhost:8081/api/users/${userId}`, requestOptions);
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
      const response = await fetch(`http://localhost:8081/api/users/${userId}`, { method: "DELETE" });
      console.log(response);
      if (!response.ok) {
        const error = new Error(response.statusText || `Failed to delete user with id: ${userId}.`);
        throw error;
      } else {
        // delete video in state
        context.commit("deleteUser", userId);
      }
    }
  },
});
export default store;
