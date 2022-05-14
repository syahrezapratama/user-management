<template>
  <div class="container col-8" >
    <h1>My Data</h1>
    <form @submit.prevent="checkPassword">
      <div class="row mb-3">
        <label class="col-sm-3 col-form-label" for="email">E-Mail</label>
        <div class="col-sm-8">
          <input
            class="form-control"
            id="email"
            name="email"
            type="email"
            v-model="myData.email"
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
            v-model="myData.name"
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
            v-model="myData.postalCode"
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
            v-model="myData.city"
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
            v-model="myData.phone"
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
            v-model="myData.password"
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
  </div>
</template>

<script>

export default {
  inject: ['myData', 'updateData'],
  data() {
    return {
      repeatPassword: ''
    };
  },
  methods: {
    checkPassword() {
      if (this.myData.password !== this.repeatPassword) {
        alert("Password does not match. Please repeat the same password.");
        return;
      } else {
        this.updateData();
        this.repeatPassword = '';
      }
    }
  }
};
</script>

<style scoped>
div {
  min-width: 600px;
}
form div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
}
input {
  min-width: 400px;
}
.button-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
