<template>
  <div class="container col-8">
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
        <p>{{ selectedUser.postalCode }}</p>
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
    <div class="row mt-5 justify-content-center">
      <router-link :to="userDataLink">
        <button class="btn btn-primary col-sm-4">Bearbeiten</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedUser: null
    };
  },
  created() {
    const userId = this.$route.params.userId;
    this.selectedUser = this.$store.getters['users'].find(user => user.id === userId);
  },
  computed: {
    userDataLink() {
      return "/editUser/" + this.id;
    },
  },
};
</script>

<style></style>
