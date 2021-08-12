<template>
  <div :id="'detailcard-' + name">
    <div class="p-grid p-dir-col">
      <div class="p-col">
        <component
          :is="field.component"
          v-for="field in fields"
          :key="field.label"
          :configuration="configuration"
          :item="item"
          v-bind="field"
          @blur="onBlur(field.field)"
          @update="onUpdate(field.field, $event)"
        />
      </div>
    </div>
    <button
      type="submit"
      @click.once="onSave"
    >
      Save
    </button>
  </div>
</template>

<script>
import set from 'lodash.set'
import AutocompleteInput from '@/components/inputs/AutocompleteInput'
import BooleanInput from '@/components/inputs/BooleanInput'
import DateInput from '@/components/inputs/DateInput'
import TextInput from '@/components/inputs/TextInput'
import TextareaInput from '@/components/inputs/TextareaInput'
import { TYPERE } from '@/helpers'

export default {
  name: 'SLDDetail',
  components: {
    AutocompleteInput,
    BooleanInput,
    DateInput,
    TextInput,
    TextareaInput,
  },
  props: {
    // Collection schema data
    configuration: {
      type: Object,
      required: true,
    },
    item: {
      type: Object,
      default: () => ({}),
    },
    name: {
      type: String,
      default: '',
    },
  },
  emits: ['close'],
  data() {
    return {
      // We start with an empty object and update it as fields change
      newItem: {},
      // Fields to display in the card (from schema)
      fields: this.configuration.fields,
    }
  },
  methods: {
    onBlur(field) {
      // Emit if the blurred field's value has changed
      if (field in this.newItem) {
        this.$sldbus.emit(`SLDDetail:blur:${this.name}`, [this.item, { [field]: this.newItem[field] }])
      }
    },
    onUpdate(field, event) {
      // Update newItem with field changes
      // Remove brackets to avoid creating empty arrays/objects
      field = field.replace(TYPERE, '')
      // Parse dot-notation field name into a nested object using _.set
      let newObj = set({}, field, event)
      Object.assign(this.newItem, newObj)
      // Emit just the changed field
      this.$sldbus.emit(`SLDDetail:update:${this.name}`, [this.item, newObj])
    },
    onSave() {
      this.$sldbus.emit(`SLDDetail:save:${this.name}`, [this.item, this.newItem])
      this.$emit('close')
    },
  },
}
</script>

<style></style>
