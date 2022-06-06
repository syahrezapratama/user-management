<template>
  <div class="container col-8">
    <h1>Search</h1>
    <form @submit.prevent="searchUsers">
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
        <label class="col-sm-3 col-form-label" for="zipCode">PLZ</label>
        <div class="col-sm-8">
          <input
            class="form-control"
            id="zipCode"
            name="zipCode"
            type="text"
            v-model="zipCode"
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
      <div class="row mt-5 justify-content-center">
        <button class="btn btn-primary col-sm-4">Suchen</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      name: '',
      zipCode: '',
      city: '',
      phone: ''
    }
  },
  methods: {
    async searchUsers() {
      const queries = {
        email: this.email,
        name: this.name,
        zipCode: this.zipCode,
        city: this.city,
        phone: this.phone
      };
      console.log(queries);
      try {
        await this.$store.dispatch("searchUsers", queries);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style></style>
