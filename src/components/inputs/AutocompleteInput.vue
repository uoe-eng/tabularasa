<template>
  <div class="p-grid">
    <div class="p-col">
      <label :for="'input' + field_name">{{ label }}</label>
    </div>
    <div class="p-col">
      <AutoComplete
        :id="'input' + field_name"
        v-model="data"
        :field="field_name"
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
  data() {
    return {
      data: [],
      field_name: '',
      suggestions: [],
    }
  },
  created() {
    ;[this.data, this.field_name] = this.getFieldIterable(this.item, this.field)
  },
  methods: {
    getFieldIterable,
    onComplete(query) {
      if ('onComplete' in this.methods) {
        this.suggestions = this.methods.onComplete(query.query)
      } else {
        // Blank the suggestions, as if not modified the AC ui 'blocks' forever.
        this.suggestions = []
      }
    },
  },
}
</script>
