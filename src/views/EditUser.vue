<template>
  <div class="container mt-5" id="box-container">
    <base-dialog :show="openDialog" @close="() => openDialog = false" @confirm="deleteUser()"></base-dialog>
    <div class="alert alert-danger mt-3" v-if="error">
      <p>{{ error }}</p>
    </div>
    <div class="alert alert-danger mt-3" v-if="!formIsValid">
      <p>Bitte prüfen und korrigieren Sie die markierten Felder.</p>
    </div>
    <div class="row mx-3 my4">
      <form @submit.prevent="submitForm">
        <div class="row mb-3 mt-4" :class="{ invalid: !email.isValid }">
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
          <label class="col-4 col-form-label" for="zipCode">PLZ</label>
          <div class="col-8">
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
          <label class="col-4 col-form-label" for="repeatPassword"
            >Wiederholung</label
          >
          <div class="col-8">
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
        <div class="row mb-3">
          <label for="userType" class="col-4 col-form-label">Rechte</label>
          <div class="col-8">
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
        <div class="row mt-4 mb-4 justify-content-around">
          <button
            type="button"
            class="btn btn-danger col-5"
            @click="confirmDelete"
          >
            Löschen
          </button>
          <button type="submit" class="btn btn-primary col-5">
            Aktualisieren
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import BaseDialog from "../components/BaseDialog.vue";
export default {
  components: {
    BaseDialog
  },
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
      openDialog: false
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
        this.$router.replace("/users/" + this.id);
      } catch (error) {
        this.error = error.message || "Failed to update data.";
        console.log(this.error);
      }
    },
    confirmDelete() {
      this.openDialog = true;
    },
    async deleteUser() {
      const userId = this.id;
      try {
          await this.$store.dispatch("deleteUser", userId);
          this.openDialog = false;
          this.$router.replace("/users");
        } catch (error) {
          console.log(error);
        }
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
