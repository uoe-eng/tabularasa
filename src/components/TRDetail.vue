<template>
  <div :id="'detailcard-' + name">
    <div class="p-grid">
      <div class="p-col p-fluid">
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

<script setup>
import { defineEmits, defineProps, reactive, toRefs } from 'vue'
import { trBus } from '@/index'
import set from 'lodash.set'
import { TYPERE } from '@/helpers'

let props = defineProps({
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
})

const emit = defineEmits(['close'])

let { configuration } = toRefs(props)
// We start with an empty object and update it as fields change
let newItem = reactive({})
// Fields to display in the card (from schema)
let fields = configuration.value.fields

const onBlur = (field) => {
  // Emit if the blurred field's value has changed
  if (field in newItem) {
    trBus.emit(`TRDetail:blur:${props.name}`, [props.item, { [field]: newItem[field] }])
  }
}

const onUpdate = (field, event) => {
  // Update newItem with field changes
  // Remove brackets to avoid creating empty arrays/objects
  field = field.replace(TYPERE, '')
  // Parse dot-notation field name into a nested object using _.set
  let newObj = set({}, field, event)
  Object.assign(newItem, newObj)
  // Emit just the changed field
  trBus.emit(`TRDetail:update:${props.name}`, [props.item, newObj])
}

const onSave = () => {
  trBus.emit(`TRDetail:save:${props.name}`, [props.item, newItem])
  emit('close')
}
</script>

<style></style>
