<template>
  <div class="grid">
    <div class="col-4">
      <label :for="'input' + fieldName">{{ label }}</label>
    </div>
    <div class="col-8">
      <AutoComplete
        :id="'input' + fieldName"
        v-model="data"
        :field="fieldName"
        :delay="600"
        :force-selection="true"
        :suggestions="suggestions"
        v-bind="properties"
        placeholder="Search..."
        v-on="events"
        @complete="onComplete"
        @update:modelValue="$emit('update', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, toRefs, watch } from 'vue'
import AutoComplete from 'primevue/autocomplete'
import { getFieldIterable } from '../../helpers'

let props = defineProps({
  events: {
    type: Object,
    default: () => ({}),
  },
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
  methods: {
    type: Object,
    default: () => ({}),
  },
  properties: {
    type: Object,
    default: () => ({}),
  },
})

defineEmits(['update'])

let data = ref([])
let fieldName = ref('')
let suggestions = ref([])

let { item, field, methods } = toRefs(props)

let onComplete = async (query) => {
  if ('onComplete' in methods.value) {
    // Use await as method might return a promise/be async
    suggestions.value = await methods.value.onComplete(query.query)
  } else {
    // Blank the suggestions, as if not modified the AC ui 'blocks' forever.
    suggestions.value = []
  }
}

watch(
  [item, field],
  ([newItem, newField]) => {
    ;[data.value, fieldName.value] = getFieldIterable(newItem, newField)
  },
  { immediate: true }
)
</script>
