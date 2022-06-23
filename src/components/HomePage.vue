<template>
  <div class="container d-flex justify-content-center" >
      <div class="row mt-5" id="box-container">
        <h1>Willkommen, {{ name }}</h1>
      </div>
  </div>
</template>

<script>
export default {
  computed: {
    name() {
      return this.$store.getters.currentUser.name;
    }
  }
}
</script>

<style scoped>
#box-container {
  border: 1px solid #ced4da;
  border-radius: 5px;
  background-color: #f8f9fa;
  padding: 50px;
}
</style>