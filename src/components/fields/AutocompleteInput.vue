<template>
  <div class="p-grid">
    <div class="p-col">
      <label :for="'input' + fieldName">{{ label }}</label>
    </div>
    <div class="p-col">
      <AutoComplete
        :id="'input' + fieldName"
        v-model="data"
        :field="fieldName"
        :delay="600"
        :min-length="1"
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

<script>
import { ref, toRefs, watch } from 'vue'
import AutoComplete from 'primevue/autocomplete'
import { getFieldIterable } from '../../helpers'

export default {
  name: 'AutocompleteInput',
  components: {
    AutoComplete,
  },
  props: {
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
  },
  emits: ['update'],
  setup(props) {
    let data = ref([])
    let fieldName = ref('')
    let suggestions = ref([])

    let { item, field, methods } = toRefs(props)

    let onComplete = (query) => {
      if ('onComplete' in methods.value) {
        suggestions.value = methods.value.onComplete(query.query)
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

    return { getFieldIterable, onComplete, data, fieldName, suggestions }
  },
}
</script>
