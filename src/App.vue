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
body {
  box-sizing: border-box;
  margin: 0;
  background: #C0C0C0;
  font-family: 'Cabin', sans-serif;
}
h1, h2, h3, h4 {
  font-family: 'Roboto', sans-serif;
  margin: 0;
}
.main-container {
  margin-left: 50px;
  transition: margin-left .5s;
  .section-with-margin {
    padding: 50px;
  }
}
.nav_open {
  margin-left: 250px;
}
</style>
