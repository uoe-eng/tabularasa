<template>
  <div>
    <Checkbox
      :id="'checkbox' + display"
      :model-value="display"
      :binary="true"
      v-bind="properties"
      readonly="true"
    />
  </div>
</template>

<script>
import Checkbox from 'primevue/checkbox'
import { getField } from '../../helpers'

export default {
  name: 'BooleanDisplay',
  components: {
    Checkbox,
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
      display: this.getField(this.item, this.field),
    }
  },
  methods: {
    getField,
  },
}
</script>
