<script>
import { db } from "boot/firebase";
import {date} from 'quasar';
export default {
  name: "PlanBoardPage",
  data() {
    return {
      gyms: [],
      model: null,
      minYearMonth: date.formatDate(Date.now(), "YYYY/MM"),
      date: new Date().toLocaleDateString(),
      times: this.generateTimes(),
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
    generateTimes() {
      const times = [];
      for (let h = 0; h <= 23; h++) {  // Hour loop from 0 to 23
        for (let m = 0; m < 60; m += 15) {  // Minute loop from 0 to 45
          const hour = h < 10 ? `0${h}` : `${h}`;
          const minute = m < 10 ? `0${m}` : `${m}`;
          const time = `${hour}:${minute}`;
          times.push(time);
        }
      }
      return times;
    }
  },
  mounted() {
    this.getGyms()
  },
};
</script>

<template>
  <q-page class="">
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
      <div class="q-pa-md" style="width: 300px">
        <q-input filled v-model="date" :rules="['/^[0-9]{1,2}\\/[0-9]{1,2}\\/[0-9]{4}$/']" label="Date">
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
                  today-btn
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>
    <q-card class="card" flat bordered>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>Title</q-item-label>
          <q-item-label caption>
            Subhead
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-card-section horizontal>
        <q-card-section>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="col-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </q-card-section>
      </q-card-section>

      <q-separator/>
      <q-card-section>
        <q-card-section>
          Attending
        </q-card-section>
        <div class="q-gutter-sm" style="height: 50px">
          <q-avatar
            v-for="n in 5"
            :key="n"
            size="40px"
            class="overlapping"
            :style="`left: ${n * 25}px`"
          >
            <img :src="`https://cdn.quasar.dev/img/avatar${n + 1}.jpg`">
          </q-avatar>
        </div>
      </q-card-section>
    </q-card>

    <q-timeline color="primary">
      <q-timeline-entry heading>
        Heading
      </q-timeline-entry>
      <q-timeline-entry v-for="time in times" :key="time">{{ time }}</q-timeline-entry>
    </q-timeline>
  </q-page>
</template>

<style scoped>
.card {
  width: 100%;
  max-width: 350px;
}
.overlapping {
  border: 2px solid white;
  position: absolute;
}

</style>
