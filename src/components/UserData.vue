<template>
  <div class="container col-8">
    <div class="row">
      <div class="col-4">
        <p>E-Mail</p>
      </div>
      <div class="col-8">
        <p>{{ email }}</p>
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <p>Name</p>
      </div>
      <div class="col-8">
        <p>{{ name }}</p>
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <p>PLZ</p>
      </div>
      <div class="col-8">
        <p>{{ postalCode }}</p>
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <p>Ort</p>
      </div>
      <div class="col-8">
        <p>{{ city }}</p>
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <p>Telefon</p>
      </div>
      <div class="col-8">
        <p>{{ phone }}</p>
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
    inject: ['users'],
    data() {
        return {
            id: '',
            email: '',
            name: '',
            postalCode: '',
            city: '',
            phone: '',
            password: ''
        }
    },
    created() {
        const userId = this.$route.params.userId;
        const selectedUser = this.users.find(user => user.id === userId);
        this.id = userId;
        this.email = selectedUser.email;
        this.name = selectedUser.name;
        this.postalCode = selectedUser.postalCode;
        this.city = selectedUser.city;
        this.phone = selectedUser.phone;
        this.password = selectedUser.password;
    },
    computed: {
        userDataLink() {
            return '/editUser/' + this.id;
        }
    }
};
</script>

<style></style>
