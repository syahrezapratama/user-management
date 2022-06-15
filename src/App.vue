<template>
  <div class="app container">
    <main class="row">
      <the-navigation v-if="userIsLoggedIn"></the-navigation>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  computed: {
    userIsLoggedIn() {
      return this.$store.getters.currentUser.token;
    }
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
