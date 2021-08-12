<template>
  <div class="p-d-flex p-ai-center p-flex-column p-flex-sm-row">
    <div
      v-for="(chip, index) in chips"
      :key="index"
    >
      <Chip
        v-bind="properties"
        class="p-mr-2 p-mb-2"
      >
        {{ chip[field_name] }}
      </Chip>
    </div>
  </div>
</template>

<script>
import Chip from 'primevue/chip'
import { getField } from '../../helpers'

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
      chips: [],
      field_name: '',
    }
  },
  created() {
    ;[this.chips, this.field_name] = this.getField(this.item, this.field)
  },
  methods: {
    getField,
  },
}
</script>
