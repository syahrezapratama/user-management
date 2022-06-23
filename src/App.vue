<template>
  <div class="app">
    <main>
      <the-navigation v-if="userIsLoggedIn"></the-navigation>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  computed: {
    userIsLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    }
  },
  created() {
    this.$store.dispatch("tryLogin");
  },
  watch: {
    didAutoLogout(currentVal, oldVal) {
      if (currentVal && currentVal !== oldVal) {
        this.$router.replace("/login");
      }
    }
  }
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

/* div.app {
  padding-top: 50px;
} */
</style>
