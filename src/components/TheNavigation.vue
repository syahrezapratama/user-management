<template>
  <header class="col-2">
    <nav>
      <ul class="nav flex-column nav-pills">
        <li class="nav-item">
          <router-link class="nav-link" to="/mydata">My Data</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/persons">List Persons</router-link>
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
      this.$store.dispatch('logUserIn', false);
      // this.$souter.replace('/login');
    }
  }
};
</script>

<style>
/* header {
  min-width: 300px;
}
ul {
    list-style: none;
} */
</style>
