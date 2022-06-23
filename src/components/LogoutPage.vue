<template>
  <div class="container">
    <div class="row d-flex justify-content-center">
      <div class="row mt-5 mb-4">
        <h1 class="text-center">Auf Wiedersehen!</h1>
      </div>
      <div class="row alert alert-secondary">
        <p>Sie haben sich erfolgreich ausgeloggt.</p>
        <p>
          Bitte klicken Sie<router-link to="/login"> hier </router-link> um sich
          wieder einzuloggen.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.alert {
  max-width: 380px;
}
</style>
