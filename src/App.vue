<template>
  <div class="app container">
    <main class="row">
      <the-navigation></the-navigation>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myData: {
        email: "syahrezarps@gmail.com",
        name: "Syahreza R. Pratama",
        postalCode: "14770",
        city: "Brandenburg an der Havel",
        phone: "017677900953",
        password: "12345",
      },
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
        
      ],
    };
  },
  methods: {
    updateData() {
      // input data to database
      console.log(this.myData);
      this.$router.push("/updateSuccess");
    },
  },
  provide() {
    return {
      myData: this.myData,
      updateData: this.updateData,
      users: this.users
    };
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}

div.app {
  padding-top: 50px;
}
</style>
