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
    dateOfBirth: firebaseUser.dateOfBirth ? firebaseUser.dateOfBirth : "",
    homeLocation: firebaseUser.homeLocation ? firebaseUser.homeLocation : "",
    email: firebaseUser.email ? firebaseUser.email : "",
    role: firebaseUser.role ? firebaseUser.role : "",
    otherInterests: firebaseUser.otherInterests ? firebaseUser.otherInterests : "",
    favGymOrCrag: firebaseUser.favGymOrCrag ? firebaseUser.favGymOrCrag : "",
    moreInfo: firebaseUser.moreInfo ? firebaseUser.moreInfo : "",
    website: firebaseUser.website ? firebaseUser.website : "",
    favGyms: firebaseUser.favGyms ? firebaseUser.favGyms : [],
  };
}
