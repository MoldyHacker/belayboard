<script>
import {defineComponent} from 'vue'
import {useUserStore} from "stores/user-store";
import ClickableListComponent from 'components/ClickableListComponent.vue';

export default defineComponent({
  name: "ProfilePage",
  components: {ClickableListComponent},
  data(){
    return{
      userStore: useUserStore(),
    }
  },
  methods: {
    updateUserVariable(variable, data){
      this.userStore.updateUserProfileValue(variable, data)
    },
  }
})
</script>

<template>
  <q-page class="constrain">
    <div class="profileImage text-center q-mt-lg">
<!--      <q-icon name="account_circle" size="128px"/>-->
      <q-avatar size="128px">
        <img v-if="!!userStore.authUser?.photoURL" :src="userStore.authUser.photoURL"  alt="Users profile image"/>
        <q-icon v-else name="account_circle"/>
      </q-avatar>

    </div>
    <div class="text-center text-h3 q-my-md">
      Profile
    </div>
    <div v-if="!!userStore.userProfile" class="profile">
      <div v-if="userStore.userProfile.role !== 'user'" class="role q-mb-md" >
        <q-list class="q-mx-auto text-center" style="max-width: 360px">
          <q-item>
            <q-item-section>
              <q-item-label overline class="text-bold" style="font-size: 24px">App Role</q-item-label>
              <q-separator/>
              <q-item-label overline class="text-accent" style="font-size: 22px">{{ userStore.userProfile.role.toUpperCase() }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <q-list class="q-mx-auto" style="max-width: 480px">
        <clickable-list-component label="Display Name" :value="userStore.userProfile.displayName" can-edit="true" >
          <q-popup-edit v-model="userStore.userProfile.displayName" buttons v-slot="scope" :cover="false" @update:modelValue="updateUserVariable('displayName', userStore.userProfile.displayName)">
            <q-input v-model="scope.value" dense autofocus @keyup.enter="scope.set"/>
          </q-popup-edit>
        </clickable-list-component>
        <clickable-list-component label="Birthday" :value="userStore.userProfile.dateOfBirth" can-edit="true" >
          <q-popup-edit v-model="userStore.userProfile.dateOfBirth" buttons v-slot="scope" :cover="false" @update:modelValue="updateUserVariable('dateOfBirth', userStore.userProfile.dateOfBirth)">
            <q-date v-model="scope.value" dense autofocus mask="MM/DD/YYYY" @keyup.enter="scope.set"/>
          </q-popup-edit>
        </clickable-list-component>
        <clickable-list-component label="Username" :value="'@'+userStore.userProfile.username" > <q-tooltip>No reassignment permitted</q-tooltip> </clickable-list-component>
        <clickable-list-component label="Email" :value="userStore.userProfile.email" > <q-tooltip>Set by Google Login</q-tooltip> </clickable-list-component>
        <clickable-list-component label="Bio" :value="userStore.userProfile.bio" can-edit="true" has-html="true">
          <q-popup-edit v-model="userStore.userProfile.bio" buttons v-slot="scope" :cover="false" @update:modelValue="updateUserVariable('bio', userStore.userProfile.bio)">
            <q-editor v-model="scope.value" autofocus @keyup.enter.stop="scope.set"/>
          </q-popup-edit>
        </clickable-list-component>
      </q-list>
    </div>
  </q-page>
</template>

<style scoped>
.constrain{
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
.hover {

}
.hover:hover {
  display: block;
}
</style>
