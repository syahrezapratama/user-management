<template>
  <div class="container container col-8">
    <h1>List Persons</h1>
    <table class="table">
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
        <tr v-for="user in users" :key="user.id">
          <th scope="row">{{ user.email }}</th>
          <td>{{ user.name }}</td>
          <td>{{ user.postalCode }}</td>
          <td>{{ user.city }}</td>
          <td>{{ user.phone }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  inject: ["users"],
};
</script>

<style></style>
