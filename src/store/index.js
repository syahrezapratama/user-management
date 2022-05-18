import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      users: [
        {
          id: "u1",
          email: "jake@gmail.com",
          name: "Jake",
          postalCode: "12345",
          city: "Berlin",
          phone: "017265343",
          password: "test",
        },
        {
          id: "u2",
          email: "lisa@gmail.com",
          name: "Lisa",
          postalCode: "12346",
          city: "Berlin",
          phone: "01783427",
          password: "test",
        },
        {
          id: "u3",
          email: "mike@gmail.com",
          name: "Mike",
          postalCode: "12335",
          city: "Potsdam",
          phone: "017268843",
          password: "test",
        },
        {
          id: "u4",
          email: "kevin@gmail.com",
          name: "Kevin",
          postalCode: "12375",
          city: "Hamburg",
          phone: "0172642343",
          password: "test",
        },
        {
          id: "u5",
          email: "vanessa@gmail.com",
          name: "Vanessa",
          postalCode: "12875",
          city: "München",
          phone: "0172122329",
          password: "test",
        },
        {
          id: "u6",
          email: "ben@gmail.com",
          name: "Ben",
          postalCode: "12875",
          city: "München",
          phone: "0172122329",
          password: "test",
        },
        {
          id: "u7",
          email: "adam@gmail.com",
          name: "Adam",
          postalCode: "12875",
          city: "Hannnover",
          phone: "0172122329",
          password: "test",
        },
        {
          id: "u8",
          email: "steve@gmail.com",
          name: "Steve",
          postalCode: "12875",
          city: "München",
          phone: "0172122329",
          password: "test",
        },
        {
          id: "u9",
          email: "cassie@gmail.com",
          name: "Cassie",
          postalCode: "12875",
          city: "Hamburg",
          phone: "0172122329",
          password: "test",
        },
        {
          id: "u10",
          email: "elle@gmail.com",
          name: "Elle",
          postalCode: "12875",
          city: "München",
          phone: "0172122329",
          password: "test",
        },
        {
          email: "syahrezarps@gmail.com",
          name: "Syahreza R. Pratama",
          postalCode: "14770",
          city: "Brandenburg an der Havel",
          phone: "017677900953",
          password: "12345",
        },
      ],
    };
  },
  getters: {
    users(state) {
      return state.users;
    }
  },
  mutations: {
    registerUser(state, payload) {
      state.users.push(payload);
    },
    updateUser(state, payload) {
      state.users = payload;
    }
  },
  actions: {
    async registerUser(context, payload) {
      const userData = {
        email: payload.email,
        name: payload.name,
        postalCode: payload.postalCode,
        city: payload.city,
        phone: payload.phone,
        password: payload.password
      };
      const response = await fetch(
        `https://user-administration-b771b-default-rtdb.firebaseio.com/users.json`, 
        {
          method: 'POST',
          body: JSON.stringify(userData),
        }
      );
      const responseData = await response.json();
      if(!response.ok) {
        const error = new Error(responseData.message || 'Failed to register new user');
        throw error;
      }
      userData.id = responseData.name;
      context.commit('registerUser', userData);
    }
  },
  modules: {
  }
});
export default store;
