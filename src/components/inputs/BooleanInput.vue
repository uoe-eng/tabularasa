<template>
  <div class="p-grid">
    <div class="p-col">
      <label :for="'input' + field">{{ label }}</label>
    </div>
    <div class="p-col">
      <Checkbox
        :id="'input' + field"
        v-model="display"
        v-bind="properties"
        :binary="true"
        @update:modelValue="$emit('update', $event)"
      />
    </div>
  </div>
</template>

<script>
import Checkbox from 'primevue/checkbox'
import { getField } from '../../helpers'

export default {
  name: 'BooleanInput',
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
  emits: ['update'],
  data() {
    return {
      // We must use v-model for Checkbox, so 'copy' the boolean value here
      // We still rely on the 'update' to modify the data in DetailCard
      display: this.getField(this.item, this.field),
    }
  },
  methods: {
    getField,
  },
}
</script>
