import Vue from 'vue';
import VueResource from 'vue-resource';
import router from './routes';
import {store} from './store/store.js';
import App from './App.vue'
const fb = require('./firebaseConfig.js');

Vue.config.productionTip = false

Vue.use(VueResource);

let app;
fb.auth.onAuthStateChanged(user => {
  if(!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App)
    })
  }
})

