<template>
  <header class="col-2">
    <nav>
      <ul class="nav flex-column nav-pills">
        <li class="nav-item">
          <router-link class="nav-link" :to="currentUserId">My Data</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/users">List Persons</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/search">Search</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/logout" @click="logout">Logout</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logoutUser');
      this.$router.replace("/logout");
    }
  },
  computed: {
    currentUserId() {
      return `/user/${this.$store.getters.currentUser.id}`;
    }
  }
};
</script>

<style>
</style>
