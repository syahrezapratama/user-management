<template>
  <div class="container col-8">
      <h1>Willkommen, {{ name }}</h1>
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

<style>
</style>