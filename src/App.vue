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
  mounted() {
    // this.loadUsers();
  },
  computed: {
    userIsLoggedIn() {
      return this.$store.getters.userIsLoggedIn;
    }
  },
  methods: {
    async loadUsers() {
      try {
        await this.$store.dispatch("loadUsers");
      } catch (error) {
        this.error = error.message;
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

div.app {
  padding-top: 50px;
}
</style>
