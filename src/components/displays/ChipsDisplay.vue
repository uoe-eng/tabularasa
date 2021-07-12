<template>
  <div class="p-d-flex p-ai-center p-flex-column p-flex-sm-row">
    <div
      v-for="value in display"
      :key="value"
    >
      <Chip
        :id="'display' + value"
        :label="value"
        v-bind="properties"
        class="p-mr-2 p-mb-2"
      />
    </div>
  </div>
</template>

<script>
import Chip from 'primevue/chip'
import { fieldDisplay } from '../../helpers'

export default {
  name: 'ChipsDisplay',
  components: {
    Chip,
  },
  props: {
    field: {
      type: String,
      default: '',
    },
    item: {
      type: Object,
      default: () => ({}),
    },
    label: {
      type: String,
      default: '',
    },
    properties: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      display: this.fieldDisplay(this.item, this.field),
    }
  },
  methods: {
    fieldDisplay,
  },
}
</script>
