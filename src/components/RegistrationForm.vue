<template>
  <div class="container mt-5" id="box-container">
    <div class="row text-center mb-4 mt-4">
      <h1>Registrierung</h1>
    </div>
    <div
      class="row d-flex justify-content-center"
      v-if="registrationDone"
    >
      <div class="alert alert-success">
        <p>Vielen Dank für Ihre Anmeldung. Um Ihre Registrierung abzuschließen, klicken Sie bitte auf den Link in
          der E-Mail.
        </p>
      </div>
    </div>
    <div class="row" v-else>
      <div class="row d-flex justify-content-center">
        <div class="alert alert-danger" v-if="error">
          <p>{{ error }}</p>
        </div>
        <div class="alert alert-danger" v-if="!formIsValid">
          <p>Bitte prüfen und korrigieren Sie die markierten Felder.</p>
        </div>
        <form @submit.prevent="submitForm">
          <div class="row mb-3" :class="{ invalid: !email.isValid }">
            <label class="col-3 col-form-label" for="email">E-Mail</label>
            <div class="col-9">
              <input
                class="form-control"
                id="email"
                type="email"
                placeholder="E-Mail"
                v-model="email.value"
                @blur="clearValidity('email')"
              />
            </div>
          </div>
          <div class="row mb-3" :class="{ invalid: !name.isValid }">
            <label class="col-3 col-form-label" for="name">Name</label>
            <div class="col-9">
              <input
                class="form-control"
                id="name"
                type="text"
                placeholder="Name"
                v-model="name.value"
                @blur="clearValidity('name')"
              />
            </div>
          </div>
          <div class="row mb-3" :class="{ invalid: !zipCode.isValid }">
            <label class="col-3 col-form-label" for="zipCode">PLZ</label>
            <div class="col-9">
              <input
                class="form-control"
                id="zipCode"
                type="text"
                placeholder="PLZ"
                v-model="zipCode.value"
                @blur="clearValidity('zipCode')"
              />
            </div>
          </div>
          <div class="row mb-3" :class="{ invalid: !city.isValid }">
            <label class="col-3 col-form-label" for="city">Ort</label>
            <div class="col-9">
              <input
                class="form-control"
                id="city"
                type="text"
                placeholder="Ort"
                v-model="city.value"
                @blur="clearValidity('city')"
              />
            </div>
          </div>
          <div class="row mb-3" :class="{ invalid: !phone.isValid }">
            <label class="col-3 col-form-label" for="phone">Telefon</label>
            <div class="col-9">
              <input
                class="form-control"
                id="phone"
                type="text"
                placeholder="Telefon"
                v-model="phone.value"
                @blur="clearValidity('phone')"
              />
            </div>
          </div>
          <div class="row mb-3" :class="{ invalid: !password.isValid }">
            <label class="col-3 col-form-label" for="password">Passwort</label>
            <div class="col-9">
              <input
                class="form-control"
                id="password"
                type="password"
                placeholder="Passwort"
                v-model="password.value"
                @blur="clearValidity('password')"
              />
            </div>
          </div>
          <div class="row mb-3" :class="{ invalid: !password.isValid }">
            <label class="col-3 col-form-label" for="repeatPassword"
              >Wiederholung</label
            >
            <div class="col-9">
              <input
                class="form-control"
                id="repeatPassword"
                type="password"
                placeholder="Passwort wiederholen"
                v-model="repeatPassword"
              />
            </div>
          </div>
          <div
            class="form-check mt-4 col-12"
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
          <div class="mt-4 justify-content-center">
            <button class="btn btn-primary col-12">Registrieren</button>
          </div>
        </form>
        <div class="mt-4 d-flex justify-content-center">
          <p>
            Bereits registriert?
            <router-link to="/login">Hier klicken</router-link> um sich
            einzuloggen.
          </p>
        </div>
      </div>
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
      registrationDone: false,
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
        this.registrationDone = true;
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
#box-container {
  border: 1px solid #ced4da;
  border-radius: 5px;
  background-color: #f8f9fa;
  max-width: 540px;
}
form {
  max-width: 440px;
}
.form-check {
  font-size: 0.85rem;
}
.alert {
  max-width: 380px;
  padding: 5px 5px 5px 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.alert p {
  margin: 0;
}
</style>
