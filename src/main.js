import Vue from 'vue';
import VueResource from 'vue-resource';
import router from './routes';
import {store} from './store/store.js';
import App from './App.vue'
const fb = require('./firebaseConfig.js');
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(VueResource);

let app;
fb.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit('setCurrentUser', user);
    store.dispatch('fetchUserProfile');
  }
  if(!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App)
    })
  }
})
