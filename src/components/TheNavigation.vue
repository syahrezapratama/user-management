<template>
  <nav class="navbar navbar-expand-lg bg-dark">
    <div class="container-fluid justify-content-end">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link class="nav-link" style="text-decoration: none;" to="/my-data">My Data</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/users">Users</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/search">Search</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/logout" @click="logout">Logout</router-link>
        </li>
      </ul>
  </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logoutUser');
      this.$router.replace("/logout");
    }
  },
};
</script>

<style scoped>
.nav-link {
  color: #ffffff;
}
.nav-link.active {
  background-color: #343a40;
}
</style>
