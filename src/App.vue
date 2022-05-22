<template>
  <div class="app container">
    <main class="row">
      <!-- <the-navigation v-if="!userIsLoggedIn"></the-navigation> -->
      <router-view></router-view>
      <!-- <user-data></user-data> -->
      <!-- <registration-form></registration-form> -->
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userIsLoggedIn: false
    };
  },
  methods: {
    updateData() {
      // input data to database
      console.log(this.myData);
      this.$router.push("/updateSuccess");
    },
    updateUserData() {
      console.log('updateUserData method klicked')
    },
    selectUserData() {
      
    }
  },
  provide() {
    return {
      myData: this.myData,
      updateData: this.updateData,
      users: this.users,
      handleRowClick: this.handleRowClick,
      updateUserData: this.updateUserData
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
