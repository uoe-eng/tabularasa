<template>
  <div class="p-grid">
    <div class="p-col">
      <label :for="'input' + field">{{ label }}</label>
    </div>
    <div class="p-col">
      <InputText
        :id="'input' + field"
        :value="getField(item[field])"
        @blur="$emit('blur', $event)"
        @input="$emit('input', $event)"
      />
    </div>
  </div>
</template>

<script>
import InputText from 'primevue/inputtext'
import { getField } from '../../helpers'

export default {
  name: 'TextInput',
  components: {
    InputText,
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
  emits: ['blur', 'input'],
  methods: {
    getField,
  },
}
</script>
