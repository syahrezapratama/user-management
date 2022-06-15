<template>
  <div class="row mt-5">
    <div class="col-sm-4 text-center">
      <h1>Registrierung</h1>
    </div>
    <div class="col-sm-8 mt-3">
      <form @submit.prevent="submitForm">
        <div class="invalid" v-if="error">
          <p>{{ error }}</p>
        </div>
        <div class="invalid" v-if="!formIsValid">
          <p>Bitte prüfen und korrigieren Sie die markierten Felder.</p>
        </div>
        <div class="row mb-3" :class="{ invalid: !email.isValid }">
          <label class="col-sm-3 col-form-label" for="email">E-Mail</label>
          <div class="col-sm-6">
            <input
              class="form-control"
              id="email"
              type="email"
              v-model="email.value"
              @blur="clearValidity('email')"
            />
          </div>
        </div>
        <div class="row mb-3" :class="{ invalid: !name.isValid }">
          <label class="col-sm-3 col-form-label" for="name">Name</label>
          <div class="col-sm-6">
            <input
              class="form-control"
              id="name"
              type="text"
              v-model="name.value"
              @blur="clearValidity('name')"
            />
          </div>
        </div>
        <div class="row mb-3" :class="{ invalid: !zipCode.isValid }">
          <label class="col-sm-3 col-form-label" for="zipCode">PLZ</label>
          <div class="col-sm-6">
            <input
              class="form-control"
              id="zipCode"
              type="text"
              v-model="zipCode.value"
              @blur="clearValidity('zipCode')"
            />
          </div>
        </div>
        <div class="row mb-3" :class="{ invalid: !city.isValid }">
          <label class="col-sm-3 col-form-label" for="city">Ort</label>
          <div class="col-sm-6">
            <input
              class="form-control"
              id="city"
              type="text"
              v-model="city.value"
              @blur="clearValidity('city')"
            />
          </div>
        </div>
        <div class="row mb-3" :class="{ invalid: !phone.isValid }">
          <label class="col-sm-3 col-form-label" for="phone">Telefon</label>
          <div class="col-sm-6">
            <input
              class="form-control"
              id="phone"
              type="text"
              v-model="phone.value"
              @blur="clearValidity('phone')"
            />
          </div>
        </div>
        <div class="row mb-3" :class="{ invalid: !password.isValid }">
          <label class="col-sm-3 col-form-label" for="password">Passwort</label>
          <div class="col-sm-6">
            <input
              class="form-control"
              id="password"
              type="password"
              v-model="password.value"
              @blur="clearValidity('password')"
            />
          </div>
        </div>
        <div class="row mb-3" :class="{ invalid: !password.isValid }">
          <label class="col-sm-3 col-form-label" for="repeatPassword"
            >Wiederholung</label
          >
          <div class="col-sm-6">
            <input
              class="form-control"
              id="repeatPassword"
              type="password"
              v-model="repeatPassword"
            />
          </div>
        </div>
        <div
          class="form-check mt-4 col-sm-7"
          :class="{ invalid: !confirm.isValid }"
        >
          <input
            class="form-check-input"
            type="checkbox"
            id="confirmTerms"
            name="confirmTerms"
            v-model="confirm.value"
            @blur="clearValidity('confirm')"
          />
          <label class="form-check-label" for="confirmTerms">
            Ich stimme den <b>Nutzungsbedingungen</b> zu und habe die
            <b>Datenschutzerklärung</b> gelesen.
          </label>
        </div>
        <div class="row mt-4 justify-content-center">
          <button class="btn btn-primary col-sm-4">Registrieren</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: { value: "", isValid: true },
      name: { value: "", isValid: true },
      zipCode: { value: "", isValid: true },
      city: { value: "", isValid: true },
      phone: { value: "", isValid: true },
      password: { value: "", isValid: true },
      repeatPassword: "",
      confirm: { value: false, isValid: true },
      formIsValid: true,
      error: null,
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
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
        this.password.value === "" ||
        this.password.value !== this.repeatPassword
      ) {
        this.password.isValid = false;
        this.formIsValid = false;
      }
      if (!this.confirm.value) {
        this.confirm.isValid = false;
        this.formIsValid = false;
      }
    },
    async submitForm() {
      this.validateForm();
      this.error = null;
      if (!this.formIsValid) {
        return;
      }
      const newUserData = {
        email: this.email.value,
        name: this.name.value,
        zipCode: this.zipCode.value,
        city: this.city.value,
        phone: this.phone.value,
        password: this.password.value,
      };
      try {
        await this.$store.dispatch("registerUser", newUserData);
        this.$router.replace("/registrationSuccess");
      } catch (error) {
        this.error = error.message;
        console.log(error);
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
</style>
