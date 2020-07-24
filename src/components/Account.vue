<template>
  <section class="section-with-margin">
    <div class="account-info">
      <h3>Your Account</h3>
      <h4 @click="logout">logout</h4>
    </div>
  </section>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  methods: {
    logout() {
      this.$store.dispatch('signOutAction')
        .then(() => {
          this.$router.push('./login');
        });
    }
  }
}
</script>

<style lang="scss">

</style>