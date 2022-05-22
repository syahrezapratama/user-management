import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      users: [],
    };
  },
  getters: {
    users(state) {
      return state.users;
    },
  },
  mutations: {
    // load user from firebase database, action: loadUsers
    setUsers(state, payload) {
      state.users = payload;
    },
    registerUser(state, payload) {
      state.users.push(payload);
    },
    updateUser(state, payload) {
      state.users = payload;
    },
  },
  actions: {
    async loadUsers(context) {
      const response = await fetch(
        `https://user-administration-b771b-default-rtdb.firebaseio.com/users/.json`
      );
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(
          responseData.message || "Failed to load users."
        );
        throw error;
      }
      const users = [];
      for (const key in responseData) {
        const user = {
          id: key,
          email: responseData[key].email,
          name: responseData[key].name,
          postalCode: responseData[key].postalCode,
          city: responseData[key].city,
          phone: responseData[key].phone,
          password: responseData[key].password,
        };
        users.push(user);
        context.commit("setUsers", users);
      }
    },
    async registerUser(context, payload) {
      const userData = {
        email: payload.email,
        name: payload.name,
        postalCode: payload.postalCode,
        city: payload.city,
        phone: payload.phone,
        password: payload.password,
      };
      const response = await fetch(
        `https://user-administration-b771b-default-rtdb.firebaseio.com/users.json`,
        {
          method: "POST",
          body: JSON.stringify(userData),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(
          responseData.message || "Failed to register new user."
        );
        throw error;
      }
      userData.id = responseData.name;
      context.commit("registerUser", userData);
    },
    async updateUserData(context, payload) {
      const userId = payload.id;
      let updateUser = context.getters.users.find((user) => user.id === userId);
      updateUser = {
        email: payload.email,
        name: payload.name,
        postalCode: payload.postalCode,
        city: payload.city,
        phone: payload.phone,
        password: payload.password,
      };
      const response = await fetch(`https://user-administration-b771b-default-rtdb.firebaseio.com/users/${userId}.json`,
      {
        method: "PUT",
        body: JSON.stringify(updateUser)
      });
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to send request.');
        throw error;
      }
      context.commit('updateUser', updateUser);
    },
  },
});
export default store;
