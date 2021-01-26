<template>
  <div class="p-grid">
    <div class="p-col">
      <label :for="'input' + field">{{ label }}</label>
    </div>
    <div class="p-col">
      <InputText
        :id="'input' + field"
        :value="this.getField(this.item[this.field])"
        @input="$emit('update', $event)"
      />
    </div>
  </div>
</template>

<script>
import { getField } from '@/helpers'

export default {
  name: 'TextInput',
  components: {
    InputText: () => import(/* webpackPrefetch: true */ 'primevue/inputtext'),
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
  },
  methods: {
    getField,
  },
}
</script>
