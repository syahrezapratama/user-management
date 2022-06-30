<template>
  <div class="container mt-5" id="box-container">
    <p v-if="isLoading">Loading...</p>
    <div v-else>
      <div class="row">
        <div class="col-4">
          <p>E-Mail</p>
        </div>
        <div class="col-8">
          <p>{{ selectedUser.email }}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <p>Name</p>
        </div>
        <div class="col-8">
          <p>{{ selectedUser.name }}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <p>PLZ</p>
        </div>
        <div class="col-8">
          <p>{{ selectedUser.zipCode }}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <p>Ort</p>
        </div>
        <div class="col-8">
          <p>{{ selectedUser.city }}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <p>Telefon</p>
        </div>
        <div class="col-8">
          <p>{{ selectedUser.phone }}</p>
        </div>
      </div>
      <div class="row mt-5 justify-content-center" v-if="isAdmin">
        <router-link :to="userDataLink">
          <button class="btn btn-primary col-12">Bearbeiten</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  created() {
    this.loadUser(this.$route);
  },
  computed: {
    selectedUser() {
      return this.$store.getters["selectedUser"];
    },
    userDataLink() {
      return "/edit/" + this.selectedUser.id;
    },
    isAdmin() {
      return this.$store.getters.currentUser.type === "admin"
    }
  },
  methods: {
    async loadUser(route) {
      this.isLoading = true;
      const userId = route.params.userId;
      try {
        await this.$store.dispatch("selectUser", userId);
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
#box-container {
  border: 1px solid #ced4da;
  border-radius: 5px;
  background-color: #f8f9fa;
  max-width: 540px;
  padding: 40px;
}
</style>
