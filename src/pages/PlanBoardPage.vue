<script>
import { db } from "boot/firebase";
export default {
  name: "PlanBoardPage",
  data() {
    return {
      gyms: [],
      model: null,
    };
  },
  methods: {
    getGyms() {
      db.collection(`gyms`)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
            let data = doc.data()
            this.gyms.push(data.displayName)
          });
        });
    },
  },
  mounted() {
    this.getGyms()
  },
};
</script>

<template>
  <q-page>
    <div class="q-pa-md row items-start q-gutter-md">
      <!--      <q-btn no-caps class="bg-red-8 text-white" label="Adventure Rock MKE"/>-->
      <div class="q-pa-md" style="width: 300px">
        <q-select
          clearable
          filled
          v-model="model"
          :options="gyms"
          label="Standard"
        />
      </div>

      <!--      <q-card class="my-card" flat bordered>-->
      <!--        <q-img-->
      <!--          src="https://cdn.quasar.dev/img/parallax2.jpg"-->
      <!--        />-->

      <!--        <q-card-section>-->
      <!--          <div class="text-overline text-orange-9">Overline</div>-->
      <!--          <div class="text-h5 q-mt-sm q-mb-xs">Title</div>-->
      <!--          <div class="text-caption text-grey">-->
      <!--            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.-->
      <!--          </div>-->
      <!--        </q-card-section>-->

      <!--        <q-card-actions>-->
      <!--          <q-btn flat color="primary" label="Share" />-->
      <!--          <q-btn flat color="secondary" label="Book" />-->

      <!--          <q-space />-->

      <!--          <q-btn-->
      <!--            color="grey"-->
      <!--            round-->
      <!--            flat-->
      <!--            dense-->
      <!--            :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"-->
      <!--            @click="expanded = !expanded"-->
      <!--          />-->
      <!--        </q-card-actions>-->

      <!--        <q-slide-transition>-->
      <!--          <div v-show="expanded">-->
      <!--            <q-separator />-->
      <!--            <q-card-section class="text-subitle2">-->
      <!--              {{ lorem }}-->
      <!--            </q-card-section>-->
      <!--          </div>-->
      <!--        </q-slide-transition>-->
      <!--      </q-card>-->
    </div>
  </q-page>
</template>

<style scoped></style>
