<template>
  <div class="container col-9">
    <h1>List Persons</h1>
    <p v-if="isLoading">Loading users...</p>
    <table class="table table-striped" v-else>
      <thead>
        <tr>
          <th scope="col" @click="sort('email')">E-Mail</th>
          <th scope="col" @click="sort('name')">Name</th>
          <th scope="col" @click="sort('zipCode')">PLZ</th>
          <th scope="col" @click="sort('city')">Ort</th>
          <th scope="col" @click="sort('phone')">Telefon</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in sortedUsers"
          :key="user.id"
          @click="handleRowClick(user.id)"
        >
          <th scope="row">{{ user.email }}</th>
          <td>{{ user.name }}</td>
          <td>{{ user.zipCode }}</td>
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
      users: [],
      error: null,
      isLoading: false,
      sortColumn: "email",
      sortDirection: "asc",
    };
  },
  computed: {
    sortedUsers() {
      const sortedUsers = [...this.users];
      return sortedUsers.sort((a, b) => {
        let modifier = 1;
        if (this.sortDirection === "desc") modifier = -1;
        if (a[this.sortColumn] < b[this.sortColumn]) return -1 * modifier;
        if (a[this.sortColumn] > b[this.sortColumn]) return 1 * modifier;
        return 0;
      });
    }
  },
  methods: {
    sort(column) {
      if (column === this.sortColumn) {
        this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      }
      this.sortColumn = column;
    },
    handleRowClick(userId) {
      this.$router.push("/persons/" + userId);
    },
    async loadUsers() {
      try {
        await this.$store.dispatch("loadUsers");
      } catch (error) {
        this.error = error.message;
      }
    },
  },
  async created() {
    this.isLoading = true;
    try {
      await this.loadUsers()
      this.users = this.$store.getters["users"];
    } catch (error) {
      console.log(error);
    }
    this.isLoading = false;
  },
};
</script>

<style>
tbody > tr:hover {
  cursor: pointer;
}
</style>
