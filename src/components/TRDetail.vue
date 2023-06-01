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
          @click="onButton(button, name, field, item)"
        />
      </div>
    </div>
    <div class="flex justify-content-center">
      <Button class="flex-3 flex-grow-0 align-items-center action_button" type="submit" @click.once="onSave">
        Save
      </Button>
      <Button class="flex-3 flex-grow-0 align-items-center action_button" @click="onRefresh"> Revert </Button>
      <Button class="flex-3 flex-grow-0 align-items-center action_button" @click="emit('close')"> Cancel </Button>
    </div>
  </div>
</template>

<script setup>
import { computed, defineEmits, defineProps, onMounted, reactive, ref, toRefs } from 'vue'
import Button from 'primevue/button'
import { trBus } from '@/index'
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
let newItem = reactive({})
// Fields to display in the card (from schema)
let fields = configuration.value.fields

onMounted(() => {
  if (dirty.value) {
    // Add field name and value from input component to newItem
    for (let field of fieldComponents.value) {
      set(newItem, field.field, field.fieldValue)
    }
  }
})

const onBlur = (field) => {
  // Emit if the blurred field's value has changed
  if (field in newItem) {
    trBus.emit(`TRDetail:blur:${props.name}`, [props.item, { [field]: newItem[field] }])
  }
}

const onRefresh = () => {
  // Empty any values already set in newItem
  newItem = reactive({})
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

/* space between Save/Cancel etc buttons */
.action_button {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
