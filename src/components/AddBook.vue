<template>
  <section class="search section-with-margin">
    <AddBookForm :search="search" :getVolume="getVolume" />
    <div class="search-results" v-if="results">
      <BookSearchItem
        v-for="(book,i) in results"
        :key="i"
        :book="book" />
    </div>
  </section>
</template>

<script>
import {mapMutations} from 'vuex';
import {defaultVolume, stringFromArrayOfStrings} from '../helpers';
import AddBookForm from './AddBookForm.vue';
import BookSearchItem from './BookSearchItem';
const api = require('../../api.json');

export default {
  components: {
    AddBookForm,
    BookSearchItem
  },
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
              let newVolume = Object.assign({}, defaultVolume, v.volumeInfo);
              if (newVolume.authors) {
                newVolume.author = stringFromArrayOfStrings(newVolume.authors)
              }
              delete newVolume.allowAnonLogging;
              delete newVolume.averageRating;
              delete newVolume.canonicalVolumeLink;
              delete newVolume.infoLink;
              delete newVolume.panelizationSummary;
              delete newVolume.readingModes;
              return newVolume;
            }
          })
          console.log('dataVolumes', dataVolumes);
          this.results = [];
          this.results = this.results.concat(dataVolumes);
        })
    }
  }
}
</script>

<style lang="scss">
.search {
  .search-results {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    @media (min-width: 768px) {
      justify-content: flex-start;
    }
  }
}
</style>