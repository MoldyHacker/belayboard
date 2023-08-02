export default function UserProfile(firebaseUser) {
  // const firebaseProfile = db
  //   .doc(`users/${firebaseUser.uid}`)
  //   .get()
  //   .then((doc) => {
  //     console.log('model data: ', doc.data())
  //     doc.data();
  //   })
  //   .catch((e) => console.error("Error fetching user profile", e));
  firebaseUser = firebaseUser ?? {};

  return {
    displayName: firebaseUser.displayName ? firebaseUser.displayName : "",
    username: firebaseUser.username ? firebaseUser.username : "",
    photoURL: firebaseUser.photoURL ? firebaseUser.photoURL : "",
    email: firebaseUser.email ? firebaseUser.email : "",
    role: firebaseUser.role ? firebaseUser.role : "",
    bio: firebaseUser.bio ? firebaseUser.bio : "",
  };
}
