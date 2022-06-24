<template>
  <div class="container">
    <div class="row d-flex justify-content-center mt-5">
        <div class="row alert alert-secondary">
            <p>Seite nicht gefunden.</p>
            <p>Bitte  <router-link to="/home">klicken Sie hier,</router-link> um zurückzugehen.</p>
        </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.alert {
    max-width: 540px;
}
</style>