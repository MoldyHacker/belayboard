import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    authUser: null,
    isLoaded: false,
  }),

  getters: {
    isAuthenticated(state) {return !!state.authUser}
  },

  actions: {
    setUser(user) {},
    onAuthStateChange() {},
    async init() {},
    registerUser(credentials) {},
    async signInWithPopup() {
      let provider = new firebase.auth.GoogleAuthProvider();
      try {
        await auth.signInWithPopup(provider);
      } catch (error) {
        console.error('Error during signInWithPopup', error);
      }
    },
    async signOut() {},

  }
})
