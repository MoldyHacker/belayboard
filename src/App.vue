<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import {useUserStore} from "stores/user-store";
import {useQuasar} from "quasar";

export default defineComponent({
  name: 'App',
  data() {
    return {
      userStore: useUserStore(),
      $q: useQuasar(),
    }
  },

  methods: {
    showLoading () {
      this.$q.loading.show({
        message: 'Loading user profile. Hang on...',
      })
    },
    endLoading() {
      setTimeout(() => {this.$q.loading.hide()}, 100)
    },
  },

  beforeUnmount() {
    this.$q.loading.hide()
  },
  mounted() {
    this.showLoading()
    this.userStore.init().then(() => {this.endLoading()});
    // auth
    //   .onAuthStateChanged(user => {
    //     this.authStore.setUser(user ? new AuthUser(user) : null);
    //     this.authStore.isLoaded = true;
    //   })

  },
})
</script>
