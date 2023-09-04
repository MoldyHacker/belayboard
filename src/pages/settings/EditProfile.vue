<script>
import {useUserStore} from 'stores/user-store';

export default {
  name: "EditProfile",
  data() {
    return {
      userStore: useUserStore(),
      avatarUpload: null,
    }
  },
}
</script>

<template>
  <q-page v-if="!!userStore.userProfile">
    <div class="row q-mb-md q-pt-md">
      <div class="col-xs-12">
        <q-tabs align="left" no-caps active-color="black" class="text-primary" breakpoint="576" >
          <q-route-tab label="Account Settings" to="/edit/account" exact />
          <q-route-tab label="Edit Profile" to="/edit/profile" exact />
        </q-tabs>
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 q-mb-md flex">
        <div class="centerContent">
          <q-avatar size="100px" @click="this.$router.push({ name: 'Profile' })">
            <img v-if="!!userStore.authUser?.photoURL" :src="userStore.authUser.photoURL"  alt="Users profile image"/>
            <q-icon v-else name="account_circle"/>
          </q-avatar>
        </div>
        <div class="q-ml-lg centerContent">
          <span class="label">
            Change Your Avatar
          </span>
          <q-form class="">
            <q-file
              v-model="avatarUpload"
              label="Choose File"
              filled
              style="max-width: 300px"
              accept=".jpg, .gif, .png"
            />
          </q-form>
          <span class="text-grey-8">
            JPG, GIF, PNG. At least 200 x 200 pixels
          </span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-3 col-12 firstItemSpacing">
        <div class="flex flex-center justify-between">
          <span class="label">Name</span>
          <span class="text-grey-8">Required</span>
        </div>
        <q-input dense outlined v-model="userStore.userProfile.displayName" debounce="500" @blur="userStore.updateUserProfileValue('displayName', userStore.userProfile.displayName )"/>
      </div>
      <div class="col-sm-3 col-12 middleItemSpacing">
        <span class="label no-wrap">Username</span>
        <q-input dense outlined v-model="userStore.userProfile.username" disable  >  </q-input>
      </div>
      <div class="col-sm-6 col-12 lastItemSpacing">
        <span class="label">Home City, State</span>
        <q-input dense outlined v-model="userStore.userProfile.homeLocation" @blur="userStore.updateUserProfileValue('homeLocation', userStore.userProfile.homeLocation )" />
      </div>
    </div>
    <div class="row q-pt-md">
      Please use your real name.
    </div>
    <q-separator class="q-my-lg"/>
    <div class="row">
      <div class="col-sm-6 col-12 firstItemSpacing">
        <span class="label">Other Interests</span>
        <q-input outlined v-model="userStore.userProfile.otherInterests" @blur="userStore.updateUserProfileValue('otherInterests', userStore.userProfile.otherInterests )" />
      </div>
      <div class="col-sm-6 col-12 lastItemSpacing">
        <span class="label">Favorite Gym or Crag</span>
        <q-input outlined v-model="userStore.userProfile.favGymOrCrag" @blur="userStore.updateUserProfileValue('favGymOrCrag', userStore.userProfile.favGymOrCrag )" />
      </div>
      <div class="col-sm-6 col-12 firstItemSpacing">
        <span class="label">More Information</span>
        <q-input outlined v-model="userStore.userProfile.moreInfo" @blur="userStore.updateUserProfileValue('moreInfo', userStore.userProfile.moreInfo )" />
      </div>
      <div class="col-sm-6 col-12 lastItemSpacing">
        <span class="label">Website</span>
        <q-input outlined v-model="userStore.userProfile.website" @blur="userStore.updateUserProfileValue('website', userStore.userProfile.website )" />
      </div>
    </div>
  </q-page>
</template>

<style>
.q-tab__label {
  font-size: 16px;
  font-weight: bold;
  font-family: Atlas Grotesk Web,Roboto Condensed,Helvetica Neue,Helvetica,Arial,sans-serif;
}
.label {
  font-weight: bold;
  font-size: 18px;

}
.firstItemSpacing {
  padding-right: 15px;
}
.middleItemSpacing {
  padding-right: 15px;
  padding-left: 15px;
}
.lastItemSpacing {
  padding-left: 15px;
}
.itemSpacing {
  padding-right: 15px;
  padding-left: 15px;
}
@media (max-width: 600px) {
  .firstItemSpacing {
    padding-right: 0;
  }
  .middleItemSpacing {
    padding-right: 0;
    padding-left: 0;
  }
  .lastItemSpacing {
    padding-left: 0;
  }
}
@media (max-width: 400px) {
  .centerContent {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
