<template>
  <q-layout view="hHh LpR fFf" class="container-fluid">
    <q-header elevated class="bg-primary text-white header-container">
      <q-toolbar class="container-fluid">
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <q-btn
              icon="assignment"
              class="appTitle cursor-pointer"
              @click="this.$router.push({ name: 'index' })"
            />
          </q-avatar>
          {{ appName }}
          <q-badge color="orange">v{{ appVersion }}</q-badge>
        </q-toolbar-title>

        <q-avatar v-if="userStore.authUser" class="cursor-pointer">
          <q-menu>
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md">
                  Settings
                  <q-btn flat round icon="settings" @click="pushToSiteSettings"
                    ><q-tooltip>Site Settings</q-tooltip></q-btn
                  >
                </div>
                <q-toggle disable v-model="darkMode" label="Dark Mode" />
              </div>

              <q-separator vertical inset class="q-mx-lg" />

              <div class="column items-center">
                <q-avatar
                  class="cursor-pointer"
                  size="72px"
                  @click="pushToProfileSettings"
                >
                  <q-tooltip>Profile Settings</q-tooltip>
                  <img v-if="userStore.authUser.photoURL" :src="userStore.authUser.photoURL" />
                  <q-icon v-else name="account_circle"/>
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">
<!--                  {{ userStore.authUser.displayName }}-->
                  @{{ userStore.userProfile.username }}
                </div>

                <q-btn
                  color="primary"
                  label="Logout"
                  icon-right="logout"
                  no-wrap
                  push
                  size="sm"
                  @click="logout"
                  v-close-popup
                />
              </div>
            </div>
          </q-menu>
          <q-tooltip>Profile</q-tooltip>
          <img v-if="userStore.authUser.photoURL" :src="userStore.authUser.photoURL" />
          <q-icon v-else name="account_circle"/>
        </q-avatar>

        <q-avatar v-else class="cursor-pointer">
          <q-tooltip>Login</q-tooltip>
          <q-icon name="login" @click="login" />
        </q-avatar>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      overlay
      behavior="default"
      elevated
    >
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab
        v-model="fab"
        vertical-actions-align="right"
        color="primary"
        icon="add"
        direction="up"
      >
        <q-fab-action
          external-label
          label-position="left"
          color="primary"
          @click="openClimbingDialog"
          icon="post_add"
          label="Add Plan"
        />
        <q-fab-action
          external-label
          label-position="left"
          color="secondary"
          @click="onClick"
          icon="landscape"
          label="Add Climb"
        />
      </q-fab>
    </q-page-sticky>
  </q-layout>

  <!--Add Climbing Plan Dialog-->
  <q-dialog v-model="climbingPlanDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6 text-center">Climbing Plan</div>
      </q-card-section>

      <q-card-section>
        <q-input filled v-model="date" rules="['date']" label="Date">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="date"
                  :navigation-min-year-month="minYearMonth"
                  mask="M/D/YYYY"
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input
          filled
          v-model="startTime"
          rules="['time']"
          label="Arrival Time"
        >
          <template v-slot:append>
            <q-icon name="schedule" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-time v-model="startTime" mask="h:mm A">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input
          filled
          v-model="duration"
          lazy-rules
          :rules="[(value) => value > 0 && value <= 12 || 'Duration must be greater than 0 and less than 12']"
          label="Duration"
          suffix="Hours"
          type="number"
        >
          <template v-slot:append>
            <q-icon name="hourglass_empty" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input filled v-model="gym" label="Gym" rules="['']">
          <template v-slot:append>
            <q-icon name="fitness_center" class="cursor-pointer" @click="openGymDialog">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Post" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!--Select Gym Dialog-->
  <q-dialog v-model="gymsDialog">
    <q-card>
      <q-card-section>
        <div class="text-h6 text-center">Pick a Gym</div>
      </q-card-section>

      <q-card-section>
        <q-list>
          <GymListItem v-for="gym in userStore.gyms" :key="gym.gymId" :data="gym" />
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!--Gym Info Dialog-->

  <!--Add climb log Dialog-->

  <!--Create Username Dialog-->
  <q-dialog v-model="createUsernameDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6 text-center">Create Username</div>
      </q-card-section>

      <q-card-section>
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
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="submit" @click="submitUsername" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { version, productName } from "../../package.json";
import { date } from "quasar";
import { useUserStore } from "stores/user-store";
import { db } from "boot/firebase";
import { useQuasar } from "quasar";
import GymListItem from "components/GymListItem.vue";

const linksList = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];

export default defineComponent({
  name: "MainLayout",
  data() {
    return {
      userStore: useUserStore(),
      $q: useQuasar(),

      leftDrawerOpen: false,
      appVersion: version,
      appName: productName,
      essentialLinks: linksList,
      darkMode: false,

      username: "",
      usernameAvailable: false,
      createUsernameDialog: false,

      fab: false,

      climbingPlanDialog: false,
      climbingPlan: {
        date: date.buildDate({ year: this.date }),
      },
      date: new Date().toLocaleDateString(),
      minYearMonth: date.formatDate(Date.now(), "YYYY/MM"),
      startTime: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      duration: 2,
      gym: "",

      gymsDialog: false
    };
  },

  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    postClimbingPlan() {},
    resetClimbingPlan() {},
    pushToProfileSettings() {
      this.$router.push({ name: "Profile" });
    },
    pushToSiteSettings() {
      this.$router.push({ name: "Account-Settings" });
    },
    login() {
      this.userStore.signInWithPopup();
    },
    logout() {
      this.userStore.signOut();
    },
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

    submitUsername() {
      if (this.usernameAvailable) {
        this.userStore.addUsernameToDb(this.username)
            .then(() => {
              this.createUsernameDialog = false;
              this.$q.notify({
                message: `Username updated: ${this.username}`,
                color: 'positive',
                position: 'top-right'
              });
              this.$forceUpdate();
            });
      }
    },
    openClimbingDialog() {
      this.climbingPlanDialog = true;
    },
    openGymDialog() {
      this.userStore.retrieveGyms()
      this.gymsDialog = true;
    },
  },
  computed: {
    usernameFixed() {
      return this.username.toLowerCase().trim();
    },
  },
  mounted() {
    // this.userStore.onAuthStateChange()
    setTimeout(() => {
      if (!this.userStore.hasUsername && this.userStore.isAuthenticated) {
        this.createUsernameDialog = true;
      }
    },1000)

  },

  components: {
    GymListItem,
    EssentialLink,
  },

  watch: {
    $route: function () {
      console.log("Current route: ", this.$router.currentRoute.name);
    },
  },

  // setup () {
  //   const leftDrawerOpen = ref(false)
  //
  //   return {
  //     appVersion: version,
  //     appName:productName,
  //     essentialLinks: linksList,
  //     leftDrawerOpen,
  //     toggleLeftDrawer () {
  //       leftDrawerOpen.value = !leftDrawerOpen.value
  //     }
  //   }
  // }
});
</script>

<style>

</style>
