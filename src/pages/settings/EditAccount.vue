<script>
import {useUserStore} from 'stores/user-store';

export default {
  name: "EditAccount",
  data(){
    return {
      userStore: useUserStore(),
    }
  },
}
</script>

<template>
  <q-page v-if="!!userStore.userProfile">
    <div class="row q-mb-md q-pt-md">
      <div class="col-xs-12">
        <q-tabs align="left" no-caps active-color="black" class="text-primary" >
          <q-route-tab label="Account Settings" to="/edit/account" exact />
          <q-route-tab label="Edit Profile" to="/edit/profile" exact />
        </q-tabs>
        <hr>
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
</style>
