<template>
  <div class="container col-8">
    <form @submit.prevent="submitForm">
      <div class="invalid" v-if="!formIsValid">
        <p>Bitte prüfen und korrigieren Sie die markierten Felder.</p>
      </div>
      <div class="row mb-3" :class="{ invalid: !email.isValid }">
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
      <div class="row mb-3" :class="{ invalid: !name.isValid }">
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
      <div class="row mb-3" :class="{ invalid: !zipCode.isValid }">
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
      <div class="row mb-3" :class="{ invalid: !city.isValid }">
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
      <div class="row mb-3" :class="{ invalid: !phone.isValid }">
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
      <div class="row mb-3" :class="{ invalid: !password.isValid }">
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
      <div class="row mb-3" :class="{ invalid: !password.isValid }">
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
      <div class="row mb-3">
        <label for="userType" class="col-sm-3 col-form-label">Rechte</label>
        <div class="col-sm-8">
          <select
            class="form-select"
            id="userType"
            name="userType"
            v-model="userType"
          >
            <option value="normal">Normaler User</option>
            <option value="admin">Administrator</option>
          </select>
        </div>
      </div>
      <div class="row mt-5 justify-content-center">
        <button class="btn btn-primary col-sm-4">Aktualisieren</button>
      </div>
    </form>
    <div class="row mt-3 justify-content-center">
      <button class="btn btn-danger col-sm-4" @click="deleteUser">
        Löschen
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
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
      if (
        this.password.value === "" ||
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
        id: this.id,
        email: this.email.value,
        name: this.name.value,
        zipCode: this.zipCode.value,
        city: this.city.value,
        phone: this.phone.value,
        password: this.password.value,
        type: this.userType,
      };
      console.log(updatedUserData);
      try {
        await this.$store.dispatch("updateUserData", updatedUserData);
        this.$router.replace("/persons/" + this.id);
      } catch (error) {
        this.error = error.message || "Failed to update data.";
        console.log(this.error);
      }
    },
    async deleteUser() {
      const userId = this.id;
      this.$store.dispatch("deleteUser", userId);
      this.$router.replace("/persons");
    },
  },
  computed: {
    selectedUser() {
      return this.$store.getters["selectedUser"];
    },
  },
  created() {
    this.id = this.selectedUser.id;
    this.email.value = this.selectedUser.email;
    this.name.value = this.selectedUser.name;
    this.zipCode.value = this.selectedUser.zipCode;
    this.city.value = this.selectedUser.city;
    this.phone.value = this.selectedUser.phone;
    this.password.value = this.selectedUser.password;
    this.userType = this.selectedUser.type;
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
