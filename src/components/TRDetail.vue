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
import { trBus } from '@/index'
import set from 'lodash.set'
import { TYPERE } from '@/helpers'

export default {
  name: 'TRDetail',
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
        trBus.emit(`TRDetail:blur:${this.name}`, [this.item, { [field]: this.newItem[field] }])
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
      trBus.emit(`TRDetail:update:${this.name}`, [this.item, newObj])
    },
    onSave() {
      trBus.emit(`TRDetail:save:${this.name}`, [this.item, this.newItem])
      this.$emit('close')
    },
  },
}
</script>

<style></style>
