<template>
  <div>
    <SideNav />
    <div :class="[{nav_open: showNav}]" class="main-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import SideNav from './components/SideNav.vue';

export default {
  components: {
    SideNav
  },
  computed: {
    ...mapGetters([
      'showNav'
    ])
  },
  methods: {
  }
}
</script>

<style lang="scss">
html {
  box-sizing: border-box;
  font-size: 10px;
}
body {
  margin: 0;
  background: #C0C0C0;
  font-family: 'Cabin', sans-serif;
  font-size: 1.4rem;
}
h1, h2, h3, h4 {
  font-family: 'Roboto', sans-serif;
  margin: 0;
}
p { margin: 0; }
.main-container {
  margin-left: 50px;
  transition: margin-left .5s;
  .section-with-margin {
    padding: 15px;
    @media (min-width: 768px) {
      padding: 50px;
    }
  }
}
.nav_open {
  margin-left: 250px;
}
</style>
