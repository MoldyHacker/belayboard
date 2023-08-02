<script>
import {defineComponent} from 'vue'
import {useUserStore} from "stores/user-store";

export default defineComponent({
  name: "ProfilePage",
  data(){
    return{
      userStore: useUserStore(),
      name: 'test',
      username: 'test',
      email: 'test@gmail.com',
      bio: 'bio',
    }
  },
})
</script>

<template>
  <q-page class="constrain">
    <div class="profileImage text-center q-mt-lg">
<!--      <q-icon name="account_circle" size="128px"/>-->
      <q-avatar size="128px">
        <img v-if="userStore.authUser.photoURL" :src="userStore.authUser.photoURL" />
        <q-icon v-else name="account_circle"/>
      </q-avatar>

    </div>
    <div class="text-center text-h3">
      Profile
    </div>
    <div class="text-h5 text-grey-8 q-ml-lg">
      Name: <span class="text-black">{{ name }}</span><br>
      Username: <span class="text-black">@{{ username }}</span><br>
      Email: <span class="text-black">{{ email }}</span><br>
      Bio: <span class="text-black">{{ bio }}</span><br>
    </div>
  </q-page>
</template>

<style scoped>
.constrain{
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
</style>
