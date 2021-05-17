<template>
  <div class="p-grid">
    <div class="p-col">
      <!-- <span>{{ label }}</span> -->
      <label :for="'input' + field">{{ label }}</label>
    </div>
    <div class="p-col">
      <Textarea
        :id="'input' + field"
        :model-value="getField(item[field])"
        @update:modelValue="$emit('update', $event)"
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
  emits: ['update'],
  methods: {
    getField,
  },
}
</script>
