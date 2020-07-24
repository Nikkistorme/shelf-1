<template>
  <section class="section-with-margin">
    <div class="header">
      <h2>Welcome to Shelf!</h2>
      <h3>Create an account or log in to continue.</h3>
    </div>
    <form
      class="login"
      v-on:submit.prevent="login"
      v-if="showLoginForm">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="email"
        v-model="loginForm.email">
      <input
        type="password"
        placeholder="password"
        v-model="loginForm.password">
      <button
        type="submit"
        :disabled="!loginForm.email || !loginForm.password">
        Login
      </button>
    </form>
    <form
      class="sign-up"
      v-on:submit.prevent="signUp"
      v-else>
      <h2>Sign up</h2>
      <input
        type="text"
        placeholder="first name"
        v-model="signupForm.firstName">
      <input
        type="text"
        placeholder="last name"
        v-model="signupForm.lastName">
      <input
        type="email"
        placeholder="email"
        v-model="signupForm.email">
      <input
        type="password"
        placeholder="password"
        v-model="signupForm.password">
      <button
        type="submit"
        :disabled="!signupForm.email || !signupForm.password || !signupForm.firstName || !signupForm.lastName">
        Sign up
      </button>
    </form>
    <a @click="showLoginForm = !showLoginForm">{{showLoginForm ? 'Create Account' : 'Back to Login'}}</a>
  </section>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  data() {
    return {
      showLoginForm: false,
      signupForm: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      },
      loginForm: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    signUp() {
      const user = {
        name: `${this.signupForm.firstName} ${this.signupForm.lastName}`,
        email: this.signupForm.email,
        password: this.signupForm.password
      };
      this.$store.dispatch('signUpAction', user)
        .then(() => {
          this.$router.push('./read');
        });
    },
    login() {
      const user = {
        email: this.loginForm.email,
        password: this.loginForm.password
      };
      this.$store.dispatch('signInAction', user)
        .then(() => {
          this.$router.push('./read');
        });
    },
  }
}
</script>

<style lang="scss">
.header {
  margin-bottom: 50px;
}
</style>