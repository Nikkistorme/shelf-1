import Vue from 'vue';
import Vuex from 'vuex';
const fb = require('../firebaseConfig.js');

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    status: null,
    showNav: false
  },
  getters: {
    currentUser: state => {
      return  state.currentUser;
    },
    status: state => {
      return  state.status;
    },
    showNav: state => {
      return state.showNav;
    },
    userProfile: state => {
      return state.userProfile;
    }
  },
  mutations: {
    setUser: (state, payload) => {
      state.currentUser = payload;
    },
    setUserProfile: (state, payload) => {
      state.userProfile = payload;
    },
    removeUser: state => {
      state.currentUser = null;
    },
    setStatus: (state, payload) => {
      state.status = payload;
    },
    changeNav: state => {
      state.showNav = !state.showNav
    },
    addToRead: (state, {book}) => {
      state.read.unshift(book);
    }
  },
  actions: {
    signUpAction({commit, dispatch}, payload) {
      return new Promise((resolve, reject) => {
        console.log('Begin signUpAction');
        commit('setStatus', 'loading');
        fb.auth.createUserWithEmailAndPassword(payload.email, payload.password)
          .then(response => {
            commit('setUser', response.user);
            fb.usersCollection.doc(response.user.uid).set({
              name: payload.name,
              shelfRead: []
            })
          })
          .then(() => {
            dispatch('fetchUserProfile');
            commit('setStatus', 'success');
            resolve();
          })
          .catch(error => {
            console.log('error', error);
            commit('setStatus', error.message);
            reject();
          })
      })
    },
    signInAction({commit, dispatch}, payload) {
      return new Promise((resolve, reject) => {
        console.log('Begin signInAction');
        commit('setStatus', 'loading');
        fb.auth.signInWithEmailAndPassword(payload.email, payload.password)
          .then(response => {
            commit('setUser', response.user);
            dispatch('fetchUserProfile');
            commit('setStatus', 'success');
            resolve();
          })
          .catch((error) => {
            console.log('error', error);
            commit('setStatus', error.message);
            reject();
          })
      })
    },
    signOutAction({commit}) {
      return new Promise((resolve, reject) => {
        console.log('Begin signOutAction');
        fb.auth.signOut()
          .then(() => {
            commit('setUser', null);
            commit('setStatus', 'success');
            resolve();
          })
          .catch((error) => {
            console.log('error', error);
            commit('setStatus', 'failure');
            reject();
          })
      })
    },
    fetchUserProfile({commit, state}) {
      return new Promise((resolve, reject) => {
        console.log('Begin fetchUserProfile');
        commit('setStatus', 'loading');
        fb.usersCollection.doc(state.currentUser.uid).get()
          .then(response => {
            commit('setUserProfile', response.data());
            commit('setStatus', 'success');
            resolve();
          }).catch(error => {
            console.log(error);
            commit('setStatus', error.message);
            reject();
          })
      })
    }
  }
});