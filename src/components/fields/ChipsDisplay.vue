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
        {{ chip[fieldName] }}
      </Chip>
    </div>
  </div>
</template>

<script setup>
import { defineProps, toRefs, watch } from 'vue'
import Chip from 'primevue/chip'
import { getFieldIterable } from '../../helpers'

let props = defineProps({
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

let chips = []
let fieldName = ''

let { item, field } = toRefs(props)

watch(
  [item, field],
  ([newItem, newField]) => {
    ;[chips, fieldName] = getFieldIterable(newItem, newField)
  },
  { immediate: true }
)
</script>
