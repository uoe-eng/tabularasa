<template>
  <div :id="'detailcard-' + name">
    <div v-for="(field, index) in fields" :key="index" class="grid grid-nogutter">
      <div class="component col">
        <component
          :is="field.component"
          :ref="
            (el) => {
              fieldComponents.push(el)
            }
          "
          :configuration="configuration"
          :ignored="ignored"
          :item="item"
          :new-item="newItem"
          v-bind="field"
          @blur="onBlur(field.field)"
          @update="onUpdate(field, $event)"
          @valid="onValid(field.field, $event)"
        />
      </div>
      <div :class="`col-${maxButtonCount}`">
        <Button
          v-for="button in field.buttons"
          :key="button"
          :icon="`pi pi-${button.icon}`"
          class="buttons"
          @click="onButton(button, name, field, item)"
        />
      </div>
    </div>
    <div class="flex justify-content-center">
      <Button
        class="flex-3 flex-grow-0 align-items-center action_button"
        :disabled="saveDisabled"
        type="submit"
        @click.once="onSave"
      >
        Save
      </Button>
      <Button class="flex-3 flex-grow-0 align-items-center action_button" @click="onRefresh"> Revert </Button>
      <Button class="flex-3 flex-grow-0 align-items-center action_button" @click="onClose"> Cancel </Button>
    </div>
  </div>
</template>

<script setup>
import { computed, defineEmits, defineProps, onMounted, ref, toRefs, watch } from 'vue'
import Button from 'primevue/button'
import { trBus } from '@/index'
import merge from 'lodash/merge'
import set from 'lodash/set'
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
  // If true, 'item' values should be considered 'new' and added to newItem
  dirty: {
    type: Boolean,
    default: false,
  },
})

let { configuration, dirty, item } = toRefs(props)
const emit = defineEmits(['close'])

// Array of refs to the field components
let fieldComponents = ref([])
// We start with an empty object and update it as fields change
let newItem = ref({})
// Store changed but ignored fields for e.g. onComplete methods
let ignored = ref({})

// Fields to display in the card (from schema)
let fields = configuration.value.fields
// Update field validity on 'valid' events
let validFields = ref({})
// Toggle for disabling save button
let saveDisabled = ref(true)

onMounted(() => {
  if (dirty.value) {
    // Add field name and value from input component to newItem
    for (let field of fieldComponents.value) {
      if (field.fieldValue) {
        set(newItem.value, field.field, field.fieldValue)
      }
    }
  }
})

const onBlur = (field) => {
  // Emit if the blurred field's value has changed
  if (field in newItem.value) {
    trBus.emit(`TRDetail:blur:${props.name}`, [props.item, { [field]: newItem.value[field] }])
  }
}

const onClose = () => {
  trBus.emit(`TRDetail:close:${props.name}`)
  emit('close')
}
const onRefresh = () => {
  // Empty any values already set in newItem
  Object.keys(newItem.value).forEach((key) => delete newItem.value[key])
  trBus.emit(`TRDetail:refresh:${props.name}`)
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

const onButton = (button, name, field, item) => {
  trBus.emit(`TRDetail:button:${button.name}`, {
    button: button,
    cardName: name,
    field: field,
    item: item,
  })
}

const onUpdate = (field, event) => {
  // Update newItem with field changes
  // Remove brackets to avoid creating empty arrays/objects
  let fld = field.field.replace(TYPERE, '')
  // Parse dot-notation field name into a nested object using _.set
  let parsed = set({}, fld, event)
  if (field.ignoreField) {
    // Save ignored field change, but don't emit update
    // Use merge as ignored fields may be nested with shared 'root' property
    merge(ignored.value, parsed)
    return
  }
  // Use spread notation to shallow copy - Object.assign causes side-effects in deep/recursive objects
  newItem.value = { ...newItem.value, ...parsed }
  // Emit just the changed field
  trBus.emit(`TRDetail:update:${props.name}`, [props.item, parsed])
}

const onValid = (field, event) => {
  // Update field validity status from event
  validFields.value[field] = event
}

const recurseRemove = (obj, props) => {
  let childProp = props.shift()
  // Skip fields that don't appear in saved data
  if (!Object.hasOwn(obj, childProp)) {
    return obj
  }
  if (props.length === 0) {
    // Delete the last prop
    delete obj[childProp]
    return obj
  } else {
    // 'Step down' into the child prop
    recurseRemove(obj[childProp], props)
  }
  if (Object.keys(obj[childProp]).length === 0) {
    // Delete the child prop if it is (now) empty
    delete obj[childProp]
  }
  return obj
}

const onSave = () => {
  // Remove ignored fields from save data
  let saveItem = newItem.value
  for (let field of fields) {
    if (field.ignoreField) {
      saveItem = recurseRemove(saveItem, field.field.split('.'))
    }
  }
  trBus.emit(`TRDetail:save:${props.name}`, [props.item, saveItem])
  emit('close')
}

const toggleSave = () => {
  saveDisabled.value = true
  if (Object.keys(newItem.value).length == 0 || Object.values(validFields.value).some((x) => x === false)) {
    // Leave disabled if no new items, or invalid fields
    return
  }
  for (let [key, val] of Object.entries(newItem.value)) {
    // Allow saving if new key or changed value
    if (!(key in item.value) || (key in item.value && item.value[key] !== val)) {
      saveDisabled.value = false
      break
    }
  }
}

watch(newItem, () => {
  // Update save status when field values change
  toggleSave()
})

// FIXME: validFields has to be watched as well due to PrimeVue bug: https://github.com/primefaces/primevue/issues/4338
// This triggers updates when autocomplete is mid-edit, firing watcher for newItem
// Field is still valid until focus is lost, so Save is enabled
// We therefore watch validFields as well to disable Save when it eventually catches up
// We can't combine this into a single watcher with newItem, since it can be recursive which breaks with 'deep: true'
watch(
  validFields,
  () => {
    // Update save status when field validity changes
    toggleSave()
  },
  { deep: true }
)
</script>

<style>
/* Stretch field components to fit column - don't resize buttons */
.component .p-component:not(button) {
  width: 100%;
}

.buttons {
  margin-left: 1px;
}

/* space between Save/Cancel etc buttons */
.action_button {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
