<template>
  <div class="container col-8">
    <h1>Search</h1>
    <form @submit.prevent="searchUsers">
      <div class="invalid" v-if="!formIsValid">
        <p>Bitte füllen Sie mindestens ein Feld aus</p>
      </div>
      <div class="row mb-3">
        <label class="col-sm-3 col-form-label" for="email">E-Mail</label>
        <div class="col-sm-8">
          <input
            class="form-control"
            id="email"
            name="email"
            type="text"
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
      <div class="row mt-4 justify-content-center">
        <button class="btn btn-primary col-sm-4">Suchen</button>
      </div>
    </form>
    <div class="mt-5" v-if="searchResults.isFound && searchResults.values.length > 0">
      <h1>Results</h1>
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
            v-for="user in searchResults.values"
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
    <div class="mt-5" v-if="searchResults.isFound && searchResults.values.length === 0">
      <p>Keine Ergebnisse gefunden</p>
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
      searchResults: {
        isFound: false,
        values: []
      },
      error: null,
      formIsValid: true,
    };
  },
  methods: {
    validateForm() {
      this.formIsValid = true;
      if (this.email === "" && this.name === "" && this.zipCode === "" && this.city === "" && this.phone === "") {
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
      console.log(queries);
      try {
        const bearerToken = this.$store.getters.currentUser.token;
        const response = await fetch(
          "http://localhost:8081/api/search?" +
            new URLSearchParams(queries).toString(), {
              headers: { "Authorization" : "Bearer " + bearerToken }
            }
        );
        console.log(response);
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
          const error = new Error(response.statusText);
          throw error;
        }
        this.searchResults.isFound = true
        this.searchResults.values = data;
      } catch (error) {
        this.error = error;
        console.log(error);
      }
    },
    handleRowClick(userId) {
      this.$router.push("/persons/" + userId);
    }
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
</style>
