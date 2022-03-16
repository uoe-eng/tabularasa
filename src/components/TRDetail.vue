<template>
  <div :id="'detailcard-' + name">
    <div
      v-for="field in fields"
      :key="field.label"
      class="grid grid-nogutter"
    >
      <div class="component col">
        <component
          :is="field.component"
          :configuration="configuration"
          :item="item"
          v-bind="field"
          @blur="onBlur(field.field)"
          @update="onUpdate(field.field, $event)"
        />
      </div>
      <div :class="`col-${maxButtonCount}`">
        <Button
          v-for="button in field.buttons"
          :key="button"
          :icon="`pi pi-${button.icon}`"
          class="buttons"
          @click="onButton(button, field, item)"
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
import { computed, defineEmits, defineProps, reactive, toRefs } from 'vue'
import Button from 'primevue/button'
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

const maxButtonCount = computed(() => {
  // Count buttons to decide on column width
  let count = []
  for (let field of fields) {
    if ('buttons' in field) {
      count.push(field.buttons.length)
    }
  }
  // Default to col width of 1
  let width = 1
  if (count.length) {
    // Can fit several buttons in 1 col, so scale things
    width = Math.ceil(Math.max(...count) / 2)
  }
  return width
})

const onButton = (button, field, item) => {
  trBus.emit(`TRDetail:button:${button.name}`, [button, field, item])
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

<style>
/* Stretch field components to fit column - don't resize buttons */
.component .p-component:not(button) {
  width: 100%;
}

.buttons {
  margin-left: 1px;
}
</style>
