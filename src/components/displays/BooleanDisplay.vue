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

<script setup>
import { computed, defineProps, toRefs } from 'vue'
import Checkbox from 'primevue/checkbox'
import { getFieldValue } from '../../helpers'

const props = defineProps({
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
})

let { item, field } = toRefs(props)

let display = computed(() => {
  return getFieldValue(item.value, field.value)
})
</script>
