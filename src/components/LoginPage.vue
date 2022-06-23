<template>
  <div class="container mt-5" id="box-container">
    <div class="row text-center mb-4 mt-5">
      <h1>Login</h1>
    </div>
    <div class="row d-flex justify-content-center">
      <div class="invalid alert alert-danger" v-if="error">
          <p>{{ error }}</p>
        </div>
      <div class="invalid alert alert-danger" v-if="!formIsValid">
        <p>Bitte prüfen und korrigieren Sie die markierten Felder.</p>
      </div>
      <form @submit.prevent="confirmLogin">
        <div class="mb-3" :class="{ invalid: !email.isValid }">
          <label class="col-form-label" for="email">E-Mail</label>
          <input
              class="form-control"
              id="email"
              type="email"
              placeholder="E-Mail"
              v-model="email.value"
            />
        </div>
        <div class="mb-3" :class="{ invalid: !password.isValid }">
          <label class="col-form-label" for="password">Passwort</label>
          <input
              class="form-control"
              id="password"
              type="password"
              placeholder="Passwort"
              v-model="password.value"
            />
        </div>
        <div class="mt-5">
          <button class="btn btn-primary col-12">Login</button>
        </div>
      </form>
    </div>
    <div class="mt-5 d-flex justify-content-center">
        <p>Noch nicht angemeldet?
          <router-link to="/register">Hier klicken</router-link> um sich zu
          registrieren.
        </p>
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
        this.password.isValid = false;
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
  max-width: 400px;
}
.alert {
  max-width: 380px;
  padding: 5px 5px 5px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.alert p {
  margin: 0;
}
</style>
