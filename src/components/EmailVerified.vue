<template>
  <div class="container">
    <h1 class="mb-4">Vielen Dank!</h1>
    <p>Ihr Account wurde freigeschaltet.</p>
    <p>
      Bitte klicken Sie
      <router-link to="/login"> hier </router-link>
      um sich anzumelden.
    </p>
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
          `http://localhost:8081/api/verify/${verificationToken}`
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

<style></style>
