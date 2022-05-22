<template>
  <div class="container col-8">
    <h1>Search</h1>
    <form>
      <div class="row mb-3">
        <label class="col-sm-3 col-form-label" for="email">E-Mail</label>
        <div class="col-sm-8">
          <input
            class="form-control"
            id="email"
            name="email"
            type="email"
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
      postalCode: '',
      city: '',
      phone: ''
    }
  },
  methods: {
    searchUsers() {}
  }
};
</script>

<style></style>
