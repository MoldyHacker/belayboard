import { db } from "boot/firebase";

export default function UserProfile(firebaseUser) {
  const firebaseProfile = db
    .doc(`users/${firebaseUser.uid}`)
    .get()
    .then((doc) => doc)
    .catch((e) => console.error("Error fetching user profile", e));
  let p = {
    username: null,
  };

  if (firebaseProfile) {
    p.username = firebaseProfile.username ? firebaseProfile.username : null;
  }

  return p;
}
