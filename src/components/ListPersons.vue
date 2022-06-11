<template>
  <div class="container col-9">
    <h1>List Persons</h1>
    <p v-if="isLoading">Loading users...</p>
    <table class="table table-striped mb-4" v-else>
      <thead>
        <tr>
          <th scope="col" @click="sort('email')">E-Mail {{sortColumn === "email" && sortDirection === "asc" ? "&#42780;" : "&#42779;"}}</th>
          <th scope="col" @click="sort('name')">Name {{sortColumn === "name" && sortDirection === "asc" ? "&#42780;" : "&#42779;"}}</th>
          <th scope="col" @click="sort('zipCode')">PLZ {{sortColumn === "zipCode" && sortDirection === "asc" ? "&#42780;" : "&#42779;"}}</th>
          <th scope="col" @click="sort('city')">Ort {{sortColumn === "city" && sortDirection === "asc" ? "&#42780;" : "&#42779;"}}</th>
          <th scope="col" @click="sort('phone')">Telefon {{sortColumn === "phone" && sortDirection === "asc" ? "&#42780;" : "&#42779;"}}</th>
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
    <nav>
      <ul class="pagination justify-content-end">
        <li class="page-item" :class="pages.previous ? '' : 'disabled' ">
          <a class="page-link" href="#" aria-label="Previous" @click="loadUsers(pages.previous)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-if="pages.previous"><a class="page-link" href="#" @click="loadUsers(pages.previous)">{{ pages.previous }}</a></li>
        <li class="page-item active"><a class="page-link" href="#">{{ pages.current }}</a></li>
        <li class="page-item" v-if="pages.next"><a class="page-link" href="#" @click="loadUsers(pages.next)">{{ pages.next }}</a></li>
        <li class="page-item" :class="pages.next ? '' : 'disabled'">
          <a class="page-link" href="#" aria-label="Next" @click="loadUsers(pages.next)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: null,
      isLoading: false,
      sortColumn: "email",
      sortDirection: "asc",
      options: {limit: 10, page: 1},
      pages: {
        current: 1,
        previous: null,
        next: null,
      }
    };
  },
  computed: {
    sortedUsers() {
      const sortedUsers = this.$store.getters["users"];
      return sortedUsers.sort((a, b) => {
        let modifier = 1;
        if (this.sortDirection === "desc") modifier = -1;
        if (a[this.sortColumn] < b[this.sortColumn]) return -1 * modifier;
        if (a[this.sortColumn] > b[this.sortColumn]) return 1 * modifier;
        return 0;
      });
    },
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
    async loadUsers(page) {
      try {
        await this.$store.dispatch("loadUsers", page);
        this.pages = await this.$store.getters["pages"];
      } catch (error) {
        this.error = error.message;
      }
    },
  },
  async created() {
    this.isLoading = true;
    try {
      await this.loadUsers();
      this.users = this.$store.getters["users"];
      this.pages = this.$store.getters["pages"];
    } catch (error) {
      console.log(error);
    }
    this.isLoading = false;
    console.log(this.pages);
  },
};
</script>

<style scoped>
tbody > tr:hover {
  cursor: pointer;
}
a:focus {
  outline: none;
  box-shadow: none;
  background: none;
}
</style>
