<script>
import { db } from "boot/firebase";
import { useUserStore } from "stores/user-store";

export default {
  name: "CreateUsername",
  data() {
    return {
      userStore: useUserStore(),
      username: "",
      usernameAvailable: false,
    };
  },
  methods: {
    async checkUsername() {

      let username = this.usernameFixed;

      if (username.length >= 3 && username.length <= 15) {
        console.log("checked name");
        const exists = await db
          .doc(`usernames/${this.usernameFixed}`)
          .get()
          .then((doc) => {
            return doc.exists;
          });
        this.usernameAvailable = !exists;
      }
    },

    submit() {
      if (this.usernameAvailable) {
        this.userStore.addUsernameToDb(this.username);
      }
    },
  },
  computed: {
    usernameFixed() {
      return this.username.toLowerCase().trim();
    },
  },
};
</script>

<template>
  <q-page>
    <div class="q-mr-auto q-ml-auto q-mt-lg" style="max-width: 500px">
<!--      <q-form autofocus>-->
        <q-input
          ref="usernameInput"
          v-model="username"
          :rules="[
            (value) =>
              (value.length >= 3 && value.length <= 15) ||
              'Username must be longer than 3 characters and shorter than 15 characters',
          ]"
          filled
          label="Username"
          lazy-rules
          maxlength="15"
          type="text"
          @keyup="checkUsername"
        />
<!--      </q-form>-->
      <div
        v-show="username.length > 3"
        :style="{ color: usernameAvailable ? 'green' : 'red' }"
        class="display"
      >
        @{{ usernameFixed }}
        <span>{{
          usernameAvailable ? "is available" : "is not available"
        }}</span>
      </div>

      <q-btn class="q-mt-lg" color="primary" label="Submit" @click="submit" />
    </div>
  </q-page>
</template>

<style scoped></style>
