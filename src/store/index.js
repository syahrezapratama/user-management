import { createStore } from "vuex";

let timer;

const store = createStore({
  state() {
    return {
      users: [],
      selectedUser: null,
      currentUser: {
        id: null,
        email: null,
        name: null,
        token: null,
        type: null
      },
      searchResults: [],
      pages: {
        current: null,
        previous: null,
        next: null,
      },
      didAutoLogout: false
    };
  },
  getters: {
    users(state) {
      return state.users;
    },
    pages(state) {
      return state.pages;
    },
    selectedUser(state) {
      return state.selectedUser;
    },
    currentUser(state) {
      return state.currentUser;
    },
    isAuthenticated(state) {
      return !!state.currentUser.token;
    },
    didAutoLogout(state) {
      return state.didAutoLogout;
    }
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
    setSelectedUser(state, payload) {
      state.selectedUser = payload;
    },
    setCurrentUser(state, payload) {
      state.currentUser.id = payload.id;
      state.currentUser.email = payload.email;
      state.currentUser.name = payload.name;
      state.currentUser.token = payload.accessToken;
      state.currentUser.type = payload.type;
      state.didAutoLogout = false;
    },
    setAutoLogout(state) {
      state.didAutoLogout = true;
    }
  },
  actions: {
    async loadUsers(context, payload) {
      const page = payload ? payload : 1;
      const response = await fetch(
        `http://localhost:8081/api/users/?limit=10&page=${page}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
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
      const response = await fetch(`http://localhost:8081/api/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
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
      const data = await response.json();
      console.log(data)
      if (!response.ok) {
        const message = data.message;
        throw new Error(message || "Cannot register");
      }
      context.commit("registerUser", userData);
    },
    async updateUserData(context, payload) {
      const userId = payload.id;
      const updateUser = {
        email: payload.email,
        name: payload.name,
        zipCode: payload.zipCode,
        city: payload.city,
        phone: payload.phone,
        password: payload.password,
        type: payload.type ? payload.type : "normal",
      };
      const bearerToken = "Bearer " + localStorage.getItem("token");
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": bearerToken },
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
        context.commit("deleteUser", userId);
      }
    },
    logoutUser(context) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("email");
      localStorage.removeItem("name");
      localStorage.removeItem("type");
      localStorage.removeItem("tokenExpiration");

      clearTimeout(timer);

      context.commit("setCurrentUser", {
        id: null,
        email: null,
        name: null,
        type: null,
        accessToken: null
      });
    },
    autoLogout(context) {
      context.dispatch("logoutUser");
      context.commit("setAutoLogout")
    },
    async loginUser(context, payload) {
      const response = await fetch("http://localhost:8081/api/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        const message = data.message;
        throw new Error(message);
      }

      const expiresIn = 10 * 60000; // expires in 10 minutes (initally)
      const expirationDate = new Date().getTime() + expiresIn;

      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("userId", data.id);
      localStorage.setItem("email", data.email);
      localStorage.setItem("name", data.name);
      localStorage.setItem("type", data.type);
      localStorage.setItem("tokenExpiration", expirationDate);

      timer = setTimeout(() => {
        context.dispatch("autoLogout");
      }, expiresIn);

      context.commit("setCurrentUser", data);
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
    tryLogin(context) {
      const accessToken = localStorage.getItem("token");
      const id = localStorage.getItem("userId");
      const email = localStorage.getItem("email");
      const name = localStorage.getItem("name");
      const type = localStorage.getItem("type");

      const tokenExpiration = localStorage.getItem("tokenExpiration");
      const expiresIn = +tokenExpiration - new Date().getTime();

      if (expiresIn < 0) {
        return;
      }
      timer = setTimeout(() => {
        context.dispatch("autoLogout")
      }, expiresIn);

      if(accessToken && id && email && name && type) {
        context.commit("setCurrentUser", {
          id: id,
          email: email,
          name: name,
          accessToken: accessToken,
          type: type
        })
      }
    }
  },
});
export default store;
