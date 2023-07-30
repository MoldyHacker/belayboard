<script>
import { defineComponent } from "vue";
import {date} from "quasar";

export default defineComponent({
  name: "AddClimbingPlanDialog",
  props: {modelValue: { type: Boolean, required: true }},
  emits: ['update:modelValue'],
  methods: {},
  data() {
    return {
      gymDialog: false,
      // plan: true,

      date: new Date().toLocaleDateString(),
      minYearMonth: date.formatDate(Date.now(),"YYYY/MM"),
      startTime: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      duration: 2,
      gym: ''
    }
  },
})
</script>

<template>
  <q-dialog v-model="model" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6 text-center">Climbing Plan</div>
      </q-card-section>

      <q-card-section>

        <q-input filled v-model="date" rules="['date']" label="Date">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
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

        <q-input filled v-model="startTime" rules="['time']" label="Arrival Time">
          <template v-slot:append>
            <q-icon name="schedule" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-time
                  v-model="startTime"
                  mask="h:mm A"
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input filled v-model="duration" :rules="[value => value > 0 || 'Duration must be greater than 0']" label="Duration" suffix="Hours" type="number">
          <template v-slot:append>
            <q-icon name="hourglass_empty" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">


              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input filled v-model="gym" label="Gym" rules="['']">
          <template v-slot:append>
            <q-icon name="fitness_center" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">

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
</template>

<style scoped>

</style>
