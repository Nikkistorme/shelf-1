<template>
  <section id="read" class="section-with-margin" @click="test">
    <div class="volume" v-for="(volume, i) in userProfile.shelfRead" :key="i">
      <div class="movie-poster">
        <img :src="volume.imageLinks.thumbnail" :alt="volume.description">
      </div>
    </div>
  </section>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'userProfile',
      'currentUser'
    ])
  },
  methods: {
    test() {
      console.log(this.currentUser)
    }
  }
}
</script>

<style lang="scss">
#read {
  display: flex;
  .volume {
    padding: 10px;
  }
  .movie-poster {
    img {
      width: 100%;
      height: 100%;
      object-fit: scale-down;
    }
  }
}

</style>