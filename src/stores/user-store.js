import { defineStore } from 'pinia'
import { auth } from 'boot/firebase'
import AuthUser from 'src/models/AuthUser'
import firebase from "firebase";

export const useUserStore = defineStore('user', {
  state: () => ({
    authUser: null,
    isLoaded: false,
  }),

  getters: {
    isAuthenticated(state) {return !!state.authUser}
  },

  actions: {
    setUser(user) {
      this.authUser = user;
    },
    onAuthStateChange() {
      auth
        .onAuthStateChanged(user => {
          this.setUser(user ? new AuthUser(user) : null);
        })
    },
    async init() {
      await auth
        .onAuthStateChanged(user => {
          this.setUser(user ? new AuthUser(user) : null);
          this.isLoaded = true;
        })
    },
    async signInWithPopup() {
      let provider = new firebase.auth.GoogleAuthProvider();
      try {
        await auth.signInWithPopup(provider);
      } catch (error) {
        console.error('Error during signInWithPopup', error);
      }
    },
    registerUser(credentials) {
      console.log('registerUser action', credentials)
      firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ..
        });
    },
    async signOut() {
      try {
        await auth.signOut();
        this.authUser = null;
      } catch (error) {
        console.error('Error during signOut', error);
      }
    },
  }
})
