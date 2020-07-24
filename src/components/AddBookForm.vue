<template>
  <form class="get-volume" v-on:submit.prevent="getVolume">
    <input
      type="text"
      placeholder="keyword"
      class="search-input"
      v-model="search.keyword">
    <input
      type="text"
      placeholder="author"
      class="search-input"
      v-model="search.author">
    <button
      type="submit"
      :disabled="!search.keyword && !search.author">
      Search for Book
    </button>
  </form>
</template>

<script>
export default {
  props: {
    search: {
      type: Object,
      required: true
    },
    getVolume: {
      type: Function,
      required: true
    }
  }
}
</script>

<style lang="scss">
.get-volume {
  display: flex;
  flex-direction: column;
}
</style>