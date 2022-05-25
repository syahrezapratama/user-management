<template>
  <div class="container col-8">
    <form @submit.prevent="submitForm">
      <div class="invalid"  v-if="!formIsValid">
          <p>Bitte prüfen und korrigieren Sie die markierten Felder.</p>
        </div>
      <div class="row mb-3" :class="{invalid: !email.isValid}">
        <label class="col-sm-3 col-form-label" for="email">E-Mail</label>
        <div class="col-sm-8">
          <input
            class="form-control"
            id="email"
            name="email"
            type="email"
            v-model="email.value"
          />
        </div>
      </div>
      <div class="row mb-3" :class="{invalid: !name.isValid}">
        <label class="col-sm-3 col-form-label" for="name">Name</label>
        <div class="col-sm-8">
          <input
            class="form-control"
            id="name"
            name="name"
            type="text"
            v-model="name.value"
          />
        </div>
      </div>
      <div class="row mb-3" :class="{invalid: !zipCode.isValid}">
        <label class="col-sm-3 col-form-label" for="zipCode">PLZ</label>
        <div class="col-sm-8">
          <input
            class="form-control"
            id="zipCode"
            name="zipCode"
            type="text"
            v-model="zipCode.value"
          />
        </div>
      </div>
      <div class="row mb-3" :class="{invalid: !city.isValid}">
        <label class="col-sm-3 col-form-label" for="city">Ort</label>
        <div class="col-sm-8">
          <input
            class="form-control"
            id="city"
            name="city"
            type="text"
            v-model="city.value"
          />
        </div>
      </div>
      <div class="row mb-3" :class="{invalid: !phone.isValid}">
        <label class="col-sm-3 col-form-label" for="phone">Telefon</label>
        <div class="col-sm-8">
          <input
            class="form-control"
            id="phone"
            name="phone"
            type="text"
            v-model="phone.value"
          />
        </div>
      </div>
      <div class="row mb-3" :class="{invalid: !password.isValid}">
        <label class="col-sm-3 col-form-label" for="password">Passwort</label>
        <div class="col-sm-8">
          <input
            class="form-control"
            id="password"
            name="password"
            type="password"
            v-model="password.value"
          />
        </div>
      </div>
      <div class="row mb-3" :class="{invalid: !password.isValid}">
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
      <button class="btn btn-danger col-sm-4" @click="goBack">Löschen</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      email: { value: "", isValid: true },
      name: { value: "", isValid: true },
      zipCode: { value: "", isValid: true },
      city: { value: "", isValid: true },
      phone: { value: "", isValid: true },
      password: { value: "", isValid: true },
      repeatPassword: "",
      formIsValid: true,
      error: null,
      isLoading: false
    };
  },
  methods: {
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
      if (this.password.value === "" || this.password.value !== this.repeatPassword) {
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
        id: this.id,
        email: this.email.value,
        name: this.name.value,
        zipCode: this.zipCode.value,
        city: this.city.value,
        phone: this.phone.value,
        password: this.password.value
      }
      console.log(updatedUserData);
      try {
        await this.$store.dispatch('updateUserData', updatedUserData);
        this.$router.replace("/persons/" + this.id);
      } catch (error) {
        this.error = error.message  || 'Failed to update data.';
        console.log(this.error);
      }
    },
    async loadUserData(id) {
      const userId = id;
      const selectedUser = this.$store.getters["users"].find(
        (user) => user.id === userId
      );
      this.id = userId;
      this.email.value = selectedUser.email;
      this.name.value = selectedUser.name;
      this.postalCode.value = selectedUser.postalCode;
      this.city.value = selectedUser.city;
      this.phone.value = selectedUser.phone;
      this.password.value = selectedUser.password;
    },
    goBack() {
      this.$router.replace('/persons')
    },
    async loadUser(route) {
      this.isLoading = true;
      const userId = route.params.userId;
      const response = await fetch(`http://localhost:8081/api/users/${userId}`);
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (response.status !== 200) {
        const error = new Error(
          response.statusText || `Failed to load users with id: ${userId}.`
        );
        throw error;
      }
      this.id = data.id;
      this.email.value = data.email;
      this.name.value = data.name;
      this.zipCode.value = data.zipCode;
      this.city.value = data.city;
      this.phone.value = data.phone;
      this.password.value = data.password;
      this.isLoading = false;
    },
  },
  created() {
    this.loadUser(this.$route);
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
</style>
