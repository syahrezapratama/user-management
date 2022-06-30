<template>
  <div class="container mt-5" id="box-container">
    <p v-if="isLoading">Loading...</p>
    <div class="py-4 px-4" v-if="!isLoading && updateDone">
      <p>Die Daten wurden erfolgreich aktualisiert.</p>
      <p>
        Bitte <router-link to="" @click="() => {updateDone = false}">klicken Sie hier</router-link> um die
        aktualisierten Daten aufzurufen.
      </p>
    </div>
    <div class="row mx-3 my-4" v-else>
      <h1 class="mb-4">My Data</h1>
      <div class="alert alert-danger" v-if="error">
        <p>{{ error }}</p>
      </div>
      <div class="alert alert-danger" v-if="!formIsValid">
        <p>Bitte prüfen und korrigieren Sie die markierten Felder.</p>
      </div>
      <form @submit.prevent="submitForm">
        <div class="row mb-3" :class="{ invalid: !email.isValid }">
          <label class="col-4 col-form-label" for="email">E-Mail</label>
          <div class="col-8">
            <input
              class="form-control"
              id="email"
              name="email"
              type="email"
              v-model="email.value"
            />
          </div>
        </div>
        <div class="row mb-3" :class="{ invalid: !name.isValid }">
          <label class="col-4 col-form-label" for="name">Name</label>
          <div class="col-8">
            <input
              class="form-control"
              id="name"
              name="name"
              type="text"
              v-model="name.value"
            />
          </div>
        </div>
        <div class="row mb-3" :class="{ invalid: !zipCode.isValid }">
          <label class="col-4 col-form-label" for="postalCode">PLZ</label>
          <div class="col-8">
            <input
              class="form-control"
              id="postalCode"
              name="postalCode"
              type="text"
              v-model="zipCode.value"
            />
          </div>
        </div>
        <div class="row mb-3" :class="{ invalid: !city.isValid }">
          <label class="col-4 col-form-label" for="city">Ort</label>
          <div class="col-8">
            <input
              class="form-control"
              id="city"
              name="city"
              type="text"
              v-model="city.value"
            />
          </div>
        </div>
        <div class="row mb-3" :class="{ invalid: !phone.isValid }">
          <label class="col-4 col-form-label" for="phone">Telefon</label>
          <div class="col-8">
            <input
              class="form-control"
              id="phone"
              name="phone"
              type="text"
              v-model="phone.value"
            />
          </div>
        </div>
        <div class="row mb-3" :class="{ invalid: !password.isValid }">
          <label class="col-4 col-form-label" for="password"
            >Neues Passwort</label
          >
          <div class="col-8">
            <input
              class="form-control"
              id="password"
              name="password"
              type="password"
              placeholder="Neues Passwort eingeben"
              v-model="password.value"
            />
          </div>
        </div>
        <div class="row mb-3" :class="{ invalid: !password.isValid }">
          <label class="col-sm-4 col-form-label" for="repeatPassword"
            >Wiederholung</label
          >
          <div class="col-sm-8">
            <input
              class="form-control"
              id="repeatPassword"
              name="repeatPassword"
              type="password"
              placeholder="Passwort wiederholen"
              v-model="repeatPassword"
            />
          </div>
        </div>
        <div class="row mt-5 justify-content-center">
          <button class="btn btn-primary col-6">Aktualisieren</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: null,
      email: { value: "", isValid: true },
      name: { value: "", isValid: true },
      zipCode: { value: "", isValid: true },
      city: { value: "", isValid: true },
      phone: { value: "", isValid: true },
      password: { value: "", isValid: true },
      repeatPassword: "",
      userType: "",
      formIsValid: true,
      error: null,
      isLoading: false,
      updateDone: false,
    };
  },
  created() {
    this.userId = this.$store.getters.currentUser.id;
    this.loadUser(this.userId);
  },
  computed: {
    selectedUser() {
      return this.$store.getters["selectedUser"];
    },
  },
  methods: {
    async loadUser(id) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("selectUser", id);
        const selectedUser = this.$store.getters["selectedUser"];
        this.email.value = selectedUser.email;
        this.name.value = selectedUser.name;
        this.zipCode.value = selectedUser.zipCode;
        this.city.value = selectedUser.city;
        this.phone.value = selectedUser.phone;
        this.userType = selectedUser.type;
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.email.value === "") {
        this.email.isValid = false;
        this.formIsValid = false;
      }
      if (this.name.value === "") {
        this.name.isValid = false;
        this.formIsValid = false;
      }
      if (this.zipCode.value === "") {
        this.zipCode.isValid = false;
        this.formIsValid = false;
      }
      if (this.city.value === "") {
        this.city.isValid = false;
        this.formIsValid = false;
      }
      if (this.phone.value === "") {
        this.phone.isValid = false;
        this.formIsValid = false;
      }
      if (
        this.password.value !== "" &&
        this.password.value !== this.repeatPassword
      ) {
        this.password.isValid = false;
        this.formIsValid = false;
      }
    },
    async submitForm() {
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }
      const updatedUserData = {
        id: this.userId,
        email: this.email.value,
        name: this.name.value,
        zipCode: this.zipCode.value,
        city: this.city.value,
        phone: this.phone.value,
        password: this.password.value,
        type: this.userType,
      };
      try {
        await this.$store.dispatch("updateUserData", updatedUserData);
        this.updateDone = true;
        this.email.isValid = true;
        this.name.isValid = true;
        this.zipCode.isValid = true;
        this.city.isValid = true;
        this.phone.isValid = true;
        this.password.isValid = true;
        this.password.value = "";
        this.repeatPassword = "";
        this.error = null;
      } catch (error) {
        this.error = error.message || "Failed to update data.";
        console.log(this.error);
      }
    },
  },
};
</script>

<style scoped>
.invalid p,
.invalid label {
  color: red;
}
.invalid input {
  border: 1px solid red;
}
#box-container {
  border: 1px solid #ced4da;
  border-radius: 5px;
  background-color: #f8f9fa;
  max-width: 720px;
}
.alert p {
  margin: 0;
}
</style>
