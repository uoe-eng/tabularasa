<template>
  <div class="p-grid">
    <div class="p-col">
      <!-- <span>{{ label }}</span> -->
      <label :for="'input' + field">{{ label }}</label>
    </div>
    <div class="p-col">
      <Textarea
        :id="'input' + field"
        :value="getField(item[field])"
        @input.self="$emit('update', $event)"
      />
    </div>
  </div>
</template>

<script>
import Textarea from 'primevue/textarea'
import { getField } from '../../helpers'

export default {
  name: 'TextArea',
  components: {
    Textarea,
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
