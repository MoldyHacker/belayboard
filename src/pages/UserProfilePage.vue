<script>
import { useUserStore } from "stores/user-store";
import { db } from "boot/firebase";
import UserProfile from "src/models/UserProfile";

export default {
  name: "UserProfilePage",
  props: ["uid"],
  data() {
    return {
      userStore: useUserStore(),
      currentUser: null,
    };
  },
  methods: {
    async getUser(id) {
      await db
        .doc(`users/${id}`)
        .get()
        .then((doc) => {
          this.currentUser = new UserProfile(doc.data());
          console.log(this.currentUser);
        });
    },
  },
  beforeMount() {
    this.getUser(this.uid);
  },
  computed: {
    contact() {
      return "Contact " + this.currentUser.displayName.split(" ")[0];
    },
    age() {
      const today = new Date();
      const birthday = new Date(this.currentUser.dateOfBirth)
      const ageInMilliseconds = today - birthday;
      const ageInYears = ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000); // Taking into account leap years
      const roundedAge = Math.floor(ageInYears);
      return roundedAge ?? 'N/A';
    },
    memberSince() {
      return this.currentUser.creationTimestamp.toDate().toLocaleDateString()
    }
  },
};
</script>

<template>
  <q-page v-if="currentUser">
    <div class="contact flex flex-center column q-pt-lg">
      <div class="image">
        <q-avatar size="100px">
          <img v-if="!!currentUser?.photoURL" :src="currentUser.photoURL"  alt="Users profile image"/>
          <q-icon v-else name="account_circle"/>
        </q-avatar>
      </div>
      <div class="name text-h4 text-bold">{{ currentUser.displayName }}</div>
      <div class="location">{{ currentUser.homeLocation }}</div>
      <div class="age">{{ age }} years old &#x2022; {{ currentUser.gender }}</div>
      <div class="q-mt-xs text-center q-col-gutter-md">
        <div class="contact-btn">
          <q-btn square class="bg-primary text-white" :label="contact" @click="this.$router.push({ name: 'Contact User' })"/>
        </div>
        <div class="">
          <div v-if="userStore.authUser.uid === uid" class="edit-profile-btn"><q-btn class="bg-primary text-white" no-caps square label="Edit Profile" @click="this.$router.push({ name: 'Edit Your Profile' })"/></div>
          <div v-else class="ignore-user-btn"><q-btn class="bg-primary text-white" no-caps square label="Ignore User"/></div>
        </div>
      </div>
    </div>
    <q-separator class="q-my-md"/>
    <div class="member-status flex flex-center column">
      <div class="text-h6 text-bold">
        Member Since
      </div>
      <div class="">
        {{ memberSince }}
      </div>
    </div>
    <q-separator class="q-mt-md" />
  </q-page>
</template>

<style scoped></style>
