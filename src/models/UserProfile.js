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
    bio: firebaseUser.bio ? firebaseUser.bio : "",
    gender: firebaseUser.gender ? firebaseUser.gender : "",
    creationTimestamp: firebaseUser.creationTimestamp ? firebaseUser.creationTimestamp : "",
    favGymOrCrag: firebaseUser.favGymOrCrag ?? "",
    otherInterests: firebaseUser.otherInterests ? firebaseUser.otherInterests : "",
    moreInfo: firebaseUser.moreInfo ? firebaseUser.moreInfo : "",
    website: firebaseUser.website ? firebaseUser.website : "",
    favGyms: firebaseUser.favGyms ? firebaseUser.favGyms : [],
  };
}
