<template>
  <div
    class="search-results-item"
    :class="{expanded: book.expanded}">
    <div class="img-container">
      <img
        :src="book.imageLinks.thumbnail"
        :alt="book.description"
        @click="expandCard">
    </div>
    <div class="book-info">
      <h3>{{book.title}} ({{book.publishedDate}})</h3>
      <p>By: {{book.author}}</p>
      <p>{{book.pageCount}}p</p>
      <div>
        <select name="selectShelf" v-model="chosenShelf">
          <option :value="null">Choose a Shelf</option>
          <option v-for="(shelf, i) in userProfile.shelves" :key="i" :value="shelf.id">{{shelf.name}}</option>
        </select>
        <button @click.stop="addToShelf(book)">Add to Shelf</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { defaultVolume } from '../helpers';

export default {
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chosenShelf: null
    }
  },
  computed: {
    ...mapGetters([
      'userProfile'
    ])
  },
  methods: {
    expandCard() {
      console.log(this.userProfile);
      this.book.expanded = !this.book.expanded;
    },
    addToShelf(book) {
      console.log('Adding ${book} to ${this.chosenShelf}');
      book.expanded = false;
      const payload = {
        book: book,
        shelf: this.chosenShelf
      }
      this.$store.dispatch('addVolumeToShelf', payload)
    },
    test() {
      console.log('test');
      console.log('userProfile.shelves', this.userProfile.shelves);
    }
  }
}
</script>

<style lang="scss">
.search-results-item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  overflow: hidden;
  height: 109px;
  width: 68px;
  padding: 5px;
  transition: all 0.3s ease;
  will-change: width, height;
  @media (min-width: 768px) {
    height: 205px;
    width: 128px;
    margin: 10px;
  }
  .book-info {
    width: 0;
    opacity: 0;
    padding: 0;
    white-space: nowrap;
    width: calc(258px - 58px);
    will-change: opacity;
    transition: all 0.3s ease;
    @media (min-width: 768px) {
      padding: 10px;
    }
  }
  .img-container {
    display: flex;
    width: 68px;
    flex-shrink: 0;
    @media (min-width: 768px) {
      width: 128px;
    }
    img {
      height: 100%;
      width: 100%;
      object-fit: scale-down;
    }
  }
  &.expanded {
    width: 100%;
    height: 130px;
    border-bottom: 1px solid rgba(0,0,0,.3);
    @media (min-width: 768px) {
      width: 485px;
      height: auto;
    }
    .book-info {
      display: flex;
      opacity: 1;
      flex-direction: column;
      padding: 0 0 0 10px;
      @media (min-width: 768px) {
        width: calc(485px - 138px);
      }
    }
  }
}
</style>