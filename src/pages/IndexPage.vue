<template>
  <q-page class="flex flex-cencircleter">
<!--    <img-->
<!--      alt="Quasar logo"-->
<!--      src="~assets/quasar-logo-vertical.svg"-->
<!--      style="width: 200px; height: 200px"-->
<!--    >-->
    <div class="text-h3 text-weight-bold text-center absolute-top q-mt-lg">
      Welcome to BelayBoard!
      <div class="text-h5 q-mt-lg">
        The best way to find a climbing partner.
      </div>
    </div>

    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" flat bordered>
        <q-img
          src="https://cdn.quasar.dev/img/parallax2.jpg"
        />

        <q-card-section>
          <div class="text-overline text-orange-9">Overline</div>
          <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
          <div class="text-caption text-grey">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </q-card-section>

        <q-card-actions>
          <q-btn flat color="primary" label="Share" />
          <q-btn flat color="secondary" label="Book" />

          <q-space />

          <q-btn
            color="grey"
            round
            flat
            dense
            :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
            @click="expanded = !expanded"
          />
        </q-card-actions>

        <q-slide-transition>
          <div v-show="expanded">
            <q-separator />
            <q-card-section class="text-subitle2">
              {{ lorem }}
            </q-card-section>
          </div>
        </q-slide-transition>
      </q-card>
    </div>
  </q-page>

  <add-climbing-plan-dialog v-model="plan" />

</template>




<script>
import { defineComponent } from 'vue'
import { useQuasar } from "quasar";
import { date } from "quasar";
import AddClimbingPlanDialog from "components/AddClimbingPlanDialog.vue";

export default defineComponent({
  name: 'IndexPage',
  components: {AddClimbingPlanDialog},
  data(){
    return{
      $q: useQuasar(),
      expanded: false,
      lorem:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      plan: true,

    }
  },
  methods: {

  },
  mounted() {
    // console.log(this.minYearMonth)
  }
})
</script>
