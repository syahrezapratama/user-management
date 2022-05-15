<template>
  <div class="container col-8">
    <form @submit.prevent="checkPassword">
      <div class="row mb-3">
        <label class="col-sm-3 col-form-label" for="email">E-Mail</label>
        <div class="col-sm-8">
          <input
            class="form-control"
            id="email"
            name="email"
            type="email"
            v-model="email"
          />
        </div>
      </div>
      <div class="row mb-3">
        <label class="col-sm-3 col-form-label" for="name">Name</label>
        <div class="col-sm-8">
          <input
            class="form-control"
            id="name"
            name="name"
            type="text"
            v-model="name"
          />
        </div>
      </div>
      <div class="row mb-3">
        <label class="col-sm-3 col-form-label" for="postalCode">PLZ</label>
        <div class="col-sm-8">
          <input
            class="form-control"
            id="postalCode"
            name="postalCode"
            type="text"
            v-model="postalCode"
          />
        </div>
      </div>
      <div class="row mb-3">
        <label class="col-sm-3 col-form-label" for="city">Ort</label>
        <div class="col-sm-8">
          <input
            class="form-control"
            id="city"
            name="city"
            type="text"
            v-model="city"
          />
        </div>
      </div>
      <div class="row mb-3">
        <label class="col-sm-3 col-form-label" for="phone">Telefon</label>
        <div class="col-sm-8">
          <input
            class="form-control"
            id="phone"
            name="phone"
            type="text"
            v-model="phone"
          />
        </div>
      </div>
      <div class="row mb-3">
        <label class="col-sm-3 col-form-label" for="password">Passwort</label>
        <div class="col-sm-8">
          <input
            class="form-control"
            id="password"
            name="password"
            type="password"
            v-model="password"
          />
        </div>
      </div>
      <div class="row mb-3">
        <label class="col-sm-3 col-form-label" for="repeatPassword"
          >Wiederholung</label
        >
        <div class="col-sm-8">
          <input
            class="form-control"
            id="repeatPassword"
            name="repeatPassword"
            type="password"
            v-model="repeatPassword"
          />
        </div>
      </div>
      <div class="row mt-5 justify-content-center">
        <button class="btn btn-primary col-sm-4">Aktualisieren</button>
      </div>
    </form>
    <div class="row mt-3 justify-content-center">
      <button class="btn btn-danger col-sm-4">Löschen</button>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["users", "updateUserData"],
  data() {
    return {
      id: "",
      email: "",
      name: "",
      postalCode: "",
      city: "",
      phone: "",
      password: "",
      repeatPassword: ""
    };
  },
  methods: {
    checkPassword() {
      if (this.password !== this.repeatPassword) {
        alert("Password does not match. Please repeat the same password.");
        return;
      } else {
        this.updateUserData();
        this.repeatPassword = "";
      }
    },
  },
  created() {
    const userId = this.$route.params.userId;
    const selectedUser = this.users.find((user) => user.id === userId);
    this.id = userId;
    this.email = selectedUser.email;
    this.name = selectedUser.name;
    this.postalCode = selectedUser.postalCode;
    this.city = selectedUser.city;
    this.phone = selectedUser.phone;
    this.password = selectedUser.password;
  },
};
</script>

<style></style>
