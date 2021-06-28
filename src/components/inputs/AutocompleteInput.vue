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
        @item-select="$emit('update', $event)"
      >
        <template
          v-if="properties.multiple"
          #chip="slotProps"
        >
          <div>
            <span>{{ slotProps.value[field.split(':')[1]] }}</span>
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
    properties: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['update'],
  data() {
    return {
      // v-model can't take a method 'directly'
      display: this.fieldDisplay(this.item, this.field),
      suggestions: [],
    }
  },
  methods: {
    fieldDisplay,
    onComplete(query) {
      if ('onComplete' in this.properties) {
        this.suggestions = this.properties.onComplete(query.query)
      }
    },
  },
}
</script>
