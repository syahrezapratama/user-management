<template>
  <div class="container col-9">
    <h1>List Persons</h1>
    <p v-if="isLoading">Loading users...</p>
    <table class="table table-striped" v-else>
      <thead>
        <tr>
          <th scope="col">E-Mail</th>
          <th scope="col">Name</th>
          <th scope="col">PLZ</th>
          <th scope="col">Ort</th>
          <th scope="col">Telefon</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" @click="handleRowClick(user.id)">
          <th scope="row">{{ user.email }}</th>
          <td>{{ user.name }}</td>
          <td>{{ user.postalCode }}</td>
          <td>{{ user.city }}</td>
          <td>{{ user.phone }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: null,
      isLoading: false
    };
  },
  computed: {
    users() {
      return this.$store.getters["users"];
    },
    userLink(id) {
      return {
        name: "user",
        params: { userId: id },
      };
    },
  },
  methods: {
    handleRowClick(userId) {
      this.$router.push("/persons/" + userId);
    },
    async loadUsers() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("loadUsers");
      } catch (error) {
        this.error = error.message;
      }
      this.isLoading = false;
    }
  },
  created() {
    this.loadUsers();
  },
};
</script>

<style>
tbody > tr:hover {
  cursor: pointer;
}
</style>
