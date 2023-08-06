<script>
import {useUserStore} from "stores/user-store";
import {defineComponent} from "vue";

export default defineComponent( {
  name: "GymListItem",
  props: ['data'],
  emits: ['gym-id'],
  data() {
    return {
      gymInfoDialog: false,
      userStore: useUserStore()
    }
  },
  methods: {
    openGymInfoDialog() {
      this.gymInfoDialog = true;
    },
    emitGym(){
      this.$emit('gym-id', this.data.gymId)
      console.log('gym-id: ', this.data.gymId)
    }
  },
  computed: {

  },
})
</script>

<template>
  <q-item v-if="!!data">
    <q-item-section>
      <q-item-label class="row flex-center" style="width: 250px">
        <div class="text-bold col-8 cursor-pointer ellipsis" style="font-size: 16px" @click="emitGym" >
          {{ data.displayName }}
        </div>
        <div class="buttons col-4 text-right">
          <q-btn class="" round dense flat icon="info_outline" @click="openGymInfoDialog" />
          <q-btn v-if="data.favorite" class="" round dense flat icon="favorite" color="red" />
          <q-btn v-else class="" round dense flat icon="favorite_outline" />
        </div>
      </q-item-label>
    </q-item-section>
  </q-item>

  <q-dialog v-model="gymInfoDialog">
    <q-card>
      <q-card-section>
        <div class="text-h6 text-center">{{ data.displayName }}</div>
      </q-card-section>

      <q-card-section>
        <div class="address">
          <span class="label">Address: </span>
          <span class="">{{ data.address }}</span>
        </div>
        <div class="contact">
          <span class="label">Phone: </span>
          <span class="">{{ data.phone }}</span>
        </div>
        <div class="website">
          <span class="label">Website: </span>
          <span class="">{{ data.website }}</span>
        </div>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Close" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.label {
  font-weight: bold;
}
</style>
