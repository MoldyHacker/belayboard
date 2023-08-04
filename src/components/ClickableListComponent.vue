<script>
export default {
  name: "ClickableListComponent",
  props: ['label', 'value', 'hasHtml', 'canEdit'],
  data() {
    return {
      hover: false,
      model: this.value,
    }
  },
  methods: {

  },
}
</script>
<!--TODO: make this component more accessible for mobile-->
<template>
  <q-item clickable @mouseover="hover = true" @mouseleave="hover = false">
    <q-item-section avatar v-if="hover && canEdit">
      <q-icon name="edit"/>
    </q-item-section>
    <q-item-section>
      <q-item-label overline class="" style="font-size: 24px">{{ label }}</q-item-label>
      <div v-if="hasHtml" class="q-ml-md" style="font-size: 20px" v-html="value" ></div>
      <q-item-label v-else class="q-ml-md" style="font-size: 20px">{{ value }}</q-item-label>

    </q-item-section>
    <q-item-section side v-if="canEdit" class="mobileEdit">
      <q-icon name="edit"/>
    </q-item-section>
    <slot></slot>
  </q-item>
</template>

<style scoped>
.mobileEdit {
  display: none;
}
@media (max-width: 1200px) {
  .mobileEdit {
    display: flex;
  }
}

</style>
