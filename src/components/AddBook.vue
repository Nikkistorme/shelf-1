<template>
  <section class="search section-with-margin">
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
        @click="getVolume"
        :disabled="!search.keyword && !search.author">
        Search for Book
      </button>
    </form>
    <div class="search-results" v-if="results">
      <div
        v-for="(book,i) in results"
        :key="i">
        <transition name="flip">
          <div
            class="search-results-item"
            @click="flip(book)"
            v-if="book.imageLinks && book.imageLinks.thumbnail && !book.flipped"
            key="front">
              <img
                :src="book.imageLinks.thumbnail"
                :alt="book.description">
          </div>
          <div
            class="search-results-item back-side"
            @click="flip(book)"
            v-else
            key="back">
            <h3>{{book.title}}</h3>
            <p>
              <span v-for="(author, i) in book.authors" :key="i">
                {{i === 0 ? author : `, ${author}`}}
              </span>
              </p>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<script>
import {mapMutations} from 'vuex';
const api = require('../../api.json');

export default {
  data() {
    return {
      results: [],
      search: {
        keyword: "",
        author: ""
      }
    }
  },
  methods: {
    ...mapMutations([
      'addToRead'
    ]),
    getVolume() {
      const keywordUrl = `${this.search.keyword}`;
      let authorUrl = '';
      if(this.search.author && !this.search.keyword) {
        authorUrl = `inauthor:${this.search.author}`;
      } else if(this.search.author && this.search.keyword) {
        authorUrl = `+inauthor:${this.search.author}`;
      }
      const url = `https://www.googleapis.com/books/v1/volumes?q=${this.search.keyword ? keywordUrl : ''}${this.search.author ? authorUrl : ''}&key=${api.GOOGLE_BOOKS_API_KEY}`;
      console.log(url);
      this.$http.get(url)
        .then(response => {
          return response.json();
        }, error => {
          console.log(error);
        })
        .then(data => {
          const dataVolumes = data.items.map((v) => {
            if(v.volumeInfo) {
              v.volumeInfo.flipped = false;
              return v.volumeInfo;
            }
          })
          console.log('dataVolumes', dataVolumes);
          this.results = [];
          this.results = this.results.concat(dataVolumes);
        })
    },
    flip(book) {
      book.flipped = !book.flipped;
    },
    addToShelf(volume) {
      console.log(volume.title);
    }
  }
}
</script>

<style lang="scss">
.search {
  .get-volume {
    display: flex;
    flex-direction: column;
  }
  .search-results {
    display: flex;
    flex-wrap: wrap;
    &-item {
      display: flex;
      justify-content: center;
      overflow: hidden;
      height: 250px;
      margin: 10px;
      width: 175px;
      border: 1px solid gray;
      border-radius: 5px;
      background-color: royalblue;
      will-change: transform;
      flex-direction: column;
      &.back-side {
        padding: 10px;
        width: 155px;
        height: 230px;
      }
      img {
        width: auto;
        height: 100%;
        object-fit: scale-down;
        cursor: pointer;
      }
    }
  }
  .flip-enter-active {
    transition: all 0.4s ease;
  }
  .flip-leave-active {
    display: none;
  }
  .flip-enter, .flip-leave {
    transform: rotateY(180deg);
    opacity: 0;
  }
}
</style>