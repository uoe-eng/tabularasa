<template>
  <div class="p-grid">
    <div class="p-col">
      <label :for="'input' + field">{{ label }}</label>
    </div>
    <div class="p-col">
      <AutoComplete
        :id="'input' + field"
        v-model="display"
        :delay="600"
        :min-length="1"
        :suggestions="suggestions"
        v-bind="properties"
        placeholder="Search..."
        v-on="events"
        @complete="onComplete"
        @update:modelValue="$emit('update', $event)"
      >
        <template
          v-if="properties.multiple"
          #chip="slotProps"
        >
          <div>
            <span>{{ slotProps.value[childField] }}</span>
          </div>
        </template>
      </AutoComplete>
    </div>
  </div>
</template>

<script>
import AutoComplete from 'primevue/autocomplete'
import { fieldDisplay } from '../../helpers'

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
    // First part of 'field' is the 'root' name
    // Last part of 'field' is the property to display in each object
    let fields = this.field.split('[].')
    let parentField = fields[0]
    let childField = fields[fields.length - 1]
    return {
      childField: childField,
      display: this.fieldDisplay(this.item, this.field),
      parentField: parentField,
      suggestions: [],
    }
  },
  methods: {
    fieldDisplay,
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
