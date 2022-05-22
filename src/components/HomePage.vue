<template>
  <div class="container col-8">
      <h1>Willkommen</h1>
  </div>
</template>

<script>
export default {
  methods: {
    async loadUsers() {
      try {
        await this.$store.dispatch("loadUsers");
        console.log(this.$store.getters.users);
      } catch (error) {
        this.error = error.message;
        console.log(this.error)
      }
    },
  },
  created() {
    this.loadUsers();
    
  }
}
</script>

<style>
</style>