import Vue from 'vue';
import Vuex from 'vuex';
const fb = require('../firebaseConfig.js');

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    status: null,
    currentShelf: 'default-reading',
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
    setCurrentUser: (state, payload) => {
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
    setCurrentShelf: (state, payload) => {
      state.currentShelf = payload;
    },
    changeNav: state => {
      state.showNav = !state.showNav;
    }
  },
  actions: {
    signUpAction({commit, dispatch}, payload) {
      return new Promise((resolve, reject) => {
        console.log('Begin signUpAction');
        commit('setStatus', 'loading');
        fb.auth.createUserWithEmailAndPassword(payload.email, payload.password)
          .then(response => {
            commit('setCurrentUser', response.user);
            fb.usersCollection.doc(response.user.uid).set({
              name: payload.name,
              shelves: [
                {
                  name: 'Read',
                  volumes: [],
                  id: 'default-read'
                },
                {
                  name: 'To be Read',
                  volumes: [],
                  id: 'default-tbr'
                },
                {
                  name: 'Reading',
                  volumes: [],
                  id: 'default-reading'
                }
              ]
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
            commit('setCurrentUser', response.user);
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
            commit('setCurrentUser', null);
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
    },
    addVolumeToShelf({commit, dispatch, state}, payload) {
      return new Promise((resolve, reject) => {
        console.log('Begin addVolumeToShelf');
        const newShelves = state.userProfile.shelves;
        newShelves.find((s) => s.id === payload.shelf).volumes.push(payload.book);
        commit('setStatus', 'loading');
        fb.usersCollection.doc(state.currentUser.uid).update({
          shelves: newShelves
        })
          .then(() => {
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
    updateShelves({commit, dispatch, state}) {
      return new Promise((resolve, reject) => {
        console.log('Begin updateShelves');
        const shelves = state.userProfile.shelves;
        console.log('shelves', shelves);
        const newShelves = shelves.map((s) => {
          let i;
          for (i = 0; i < s.volumes.length; i++) {
            s.volumes[i].expanded = false;
          }
          return s;
        })
        console.log('newShelves', newShelves);
        fb.usersCollection.doc(state.currentUser.uid).update({
          shelves: newShelves
        })
          .then(() => {
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
    }
  }
});