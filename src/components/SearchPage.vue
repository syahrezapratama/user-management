<template>
  <div class="container">
    <div class="row d-flex justify-content-center">
      <div class="mt-5" id="box-container">
        <div class="row mx-3 my-4">
          <h1 class="mb-4">Search</h1>
          <form @submit.prevent="searchUsers">
            <div class="invalid" v-if="!formIsValid">
              <p>Bitte füllen Sie mindestens ein Feld aus.</p>
            </div>
            <div class="row mb-3">
              <label class="col-3 col-form-label" for="email">E-Mail</label>
              <div class="col-9">
                <input
                  class="form-control"
                  id="email"
                  name="email"
                  type="text"
                  placeholder="E-Mail"
                  v-model="email"
                />
              </div>
            </div>
            <div class="row mb-3">
              <label class="col-3 col-form-label" for="name">Name</label>
              <div class="col-9">
                <input
                  class="form-control"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Name"
                  v-model="name"
                />
              </div>
            </div>
            <div class="row mb-3">
              <label class="col-3 col-form-label" for="zipCode">PLZ</label>
              <div class="col-9">
                <input
                  class="form-control"
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  placeholder="PLZ"
                  v-model="zipCode"
                />
              </div>
            </div>
            <div class="row mb-3">
              <label class="col-3 col-form-label" for="city">Ort</label>
              <div class="col-9">
                <input
                  class="form-control"
                  id="city"
                  name="city"
                  type="text"
                  placeholder="Ort"
                  v-model="city"
                />
              </div>
            </div>
            <div class="row mb-3">
              <label class="col-3 col-form-label" for="phone">Telefon</label>
              <div class="col-9">
                <input
                  class="form-control"
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="Telefon"
                  v-model="phone"
                />
              </div>
            </div>
            <div class="row mt-4 justify-content-center">
              <button class="btn btn-primary col-5">Suchen</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="my-5" v-if="searchResults.length > 0">
      <h1 class="mb-4">Results</h1>
      <table class="table table-striped mb-4">
        <thead>
          <tr>
            <th scope="col">E-Mail</th>
            <th scope="col">Name</th>
            <th scope="col">PLZ</th>
            <th scope="col">Ort</th>
            <th scope="col">Telefon</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in searchResults"
            :key="user.id"
            @click="handleRowClick(user.id)"
          >
            <th scope="row">{{ user.email }}</th>
            <td>{{ user.name }}</td>
            <td>{{ user.zipCode }}</td>
            <td>{{ user.city }}</td>
            <td>{{ user.phone }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-5" v-if="searchDone && searchResults.length === 0">
      <p>Keine Ergebnisse gefunden.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      name: "",
      zipCode: "",
      city: "",
      phone: "",
      error: null,
      formIsValid: true,
      searchDone: false,
    };
  },
  computed: {
    searchResults() {
      return this.$store.getters.searchResults;
    },
  },
  methods: {
    validateForm() {
      this.formIsValid = true;
      if (
        this.email === "" &&
        this.name === "" &&
        this.zipCode === "" &&
        this.city === "" &&
        this.phone === ""
      ) {
        this.formIsValid = false;
      }
    },
    async searchUsers() {
      this.validateForm();
      if (!this.formIsValid) return;
      const queries = {
        email: this.email,
        name: this.name,
        zipCode: this.zipCode,
        city: this.city,
        phone: this.phone,
      };
      try {
        await this.$store.dispatch("searchUsers", queries);
        this.searchDone = true;
      } catch (error) {
        this.error = error;
        console.log(error);
      }
    },
    handleRowClick(userId) {
      this.$router.push("/users/" + userId);
    },
  },
};
</script>

<style scoped>
.invalid p {
  color: red;
}
tbody > tr:hover {
  cursor: pointer;
}
#box-container {
  border: 1px solid #ced4da;
  border-radius: 5px;
  background-color: #f8f9fa;
  max-width: 540px;
}
</style>
