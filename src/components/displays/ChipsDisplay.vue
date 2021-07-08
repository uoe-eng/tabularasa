<template>
  <div class="p-d-flex p-ai-center p-flex-column p-flex-sm-row">
    <div
      v-for="value in display"
      :key="value"
    >
      <Chip
        :id="'display' + value"
        :label="value[childField]"
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
    // First part of 'field' is the 'root' name
    // Last part of 'field' is the property to display in each object
    let fields = this.field.split('[].')
    let parentField = fields[0]
    let childField = fields[fields.length - 1]
    return {
      display: this.fieldDisplay(this.item, this.field),
      parentField: parentField,
      childField: childField,
    }
  },
  methods: {
    fieldDisplay,
  },
}
</script>
