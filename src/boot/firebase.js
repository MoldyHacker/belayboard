// import { boot } from 'quasar/wrappers'
//
// // "async" is optional;
// // more info on params: https://v2.quasar.dev/quasar-cli/boot-files
// export default boot(async (/* { app, router, ... } */) => {
//   // something to do
// })
import firebase from 'firebase';
// import {useAuthStore} from "stores/auth-store";
// import AuthUser from "src/models/AuthUser";

const firebaseConfig = {
  apiKey: "AIzaSyAeMC--3D_L_Pbvcf1x99S7aagVUn9qMA4",
  authDomain: "belayboard.firebaseapp.com",
  projectId: "belayboard",
  storageBucket: "belayboard.appspot.com",
  messagingSenderId: "805968607762",
  appId: "1:805968607762:web:be28d10c8315b9f7ff76cb",
  measurementId: "G-T0FLKCP6S0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const analytics = firebase.analytics();

// in case I want to use Pinia persistent
// const authStore = useAuthStore();
// firebase.auth().onAuthStateChanged(user => {
//   authStore.setUser(user ? new AuthUser(user) : null);
//   console.log('logged in as: ', authStore.authUser)
// });

export {db, auth, storage, analytics}
