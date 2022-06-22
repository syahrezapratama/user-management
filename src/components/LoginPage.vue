<template>
  <div class="row mt-5">
    <div class="col-sm-4 text-center">
      <h1>Login</h1>
    </div>
    <div class="col-sm-8">
      <div class="invalid" v-if="error">
          <p>{{ error }}</p>
        </div>
      <div class="invalid" v-if="!formIsValid">
        <p>Bitte prüfen und korrigieren Sie die markierten Felder.</p>
      </div>
      <form @submit.prevent="confirmLogin">
        <div class="row mb-3" :class="{ invalid: !email.isValid }">
          <label class="col-sm-3 col-form-label" for="email">E-Mail</label>
          <div class="col-sm-6">
            <input
              class="form-control"
              id="email"
              type="email"
              placeholder="E-Mail"
              v-model="email.value"
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
              placeholder="Passwort"
              v-model="password.value"
            />
          </div>
        </div>
        <div class="row mt-4 justify-content-center">
          <button class="btn btn-primary col-sm-4">Login</button>
        </div>
      </form>
      <div class="mt-5">
        <p>Noch nicht angemeldet?</p>
        <p>
          <router-link to="/register">Hier klicken</router-link> um sich zu
          registrieren.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: { value: "", isValid: true },
      password: { value: "", isValid: true },
      formIsValid: true,
      error: null,
    };
  },
  methods: {
    validateForm() {
      this.formIsValid = true;
      if (this.email.value === "") {
        this.email.isValid = false;
        this.formIsValid = false;
      }
      if (this.password.value === "") {
        this.email.value = false;
        this.formIsValid = false;
      }
    },
    async confirmLogin() {
      this.validateForm();
      if (!this.formIsValid) return;
      const loginInfo = {
        email: this.email.value,
        password: this.password.value
      };
      try {
        await this.$store.dispatch("loginUser", loginInfo);
        this.$router.replace("/home");
      } catch (error) {
        this.error = error.message;
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
</style>
