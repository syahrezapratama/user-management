<template>
  <div class="container">
    <div class="row d-flex justify-content-center">
      <div class="row mt-5 mb-4">
        <h1 class="text-center">Vielen Dank!</h1>
      </div>
      <div class="row alert alert-success">
        <p>Ihr Account wurde freigeschaltet.</p>
        <p>
          Bitte <router-link to="/login">klicken Sie hier,</router-link> um sich anzumelden.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVerified: false,
    };
  },
  methods: {
    async verifyEmail(route) {
      const verificationToken = route.params.verificationToken;
      try {
        const response = await fetch(
          `http://localhost:8081/api/auth/verify/${verificationToken}`
        );
        console.log(response);
        if (!response.ok) {
          throw new Error("Cannot verify email");
        }
        this.isVerified = true;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.verifyEmail(this.$route);
  },
};
</script>

<style scoped>
.alert {
  max-width: 380px;
}
</style>
