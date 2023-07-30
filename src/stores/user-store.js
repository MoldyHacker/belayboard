import {defineStore} from 'pinia'
import {auth, db} from 'boot/firebase'
import AuthUser from 'src/models/AuthUser'
import firebase from "firebase";

export const useUserStore = defineStore('user', {
  state: () => ({
    authUser: null,
    isLoaded: false,
  }),

  getters: {
    isAuthenticated(state) {
      return !!state.authUser
    }
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
        await auth.signInWithPopup(provider)
            .then(async (result) => {
              const user = result.user
              try {
                if (!await this.queryDbForUserUID(user.uid)) {
                  this.addNewUserToDb(user)
                  console.log('User added to db', user)
                }
              } catch (e) {
                console.error('Error identifying if document exists', e)
              }
            })
      } catch (error) {
        console.error('Error during signInWithPopup', error);
      }
    },
    addNewUserToDb(user) {
      db
          .doc(`users/${user.uid}`)
          .set({
            displayName: user.displayName,
            email: user.email,
            role: 'user'
          })
          .then(() => {
            console.log(`New ${this.role} ${user.displayName} added to db`)
          })
          .catch((e) => {
            console.error('Error: Entering user data', e.message)
          })
    },
    async queryDbForUserUID(uid) {
      return await db
          .doc(`users/${uid}`).get()
          .then((doc) => {
            return doc.exists;
          })
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
