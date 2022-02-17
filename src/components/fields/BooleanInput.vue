<template>
  <div class="p-grid">
    <div class="p-col">
      <label :for="'input' + field">{{ label }}</label>
    </div>
    <div class="p-col">
      <Checkbox
        :id="'input' + field"
        v-model="fieldValue"
        :binary="true"
        v-bind="properties"
        @update:modelValue="$emit('update', $event)"
      />
    </div>
  </div>
</template>

<script>
import Checkbox from 'primevue/checkbox'
import fieldBase from '../fieldBase.js'

let { useProps, fieldBaseValue } = fieldBase()

export default {
  name: 'BooleanInput',
  components: {
    Checkbox,
  },
  props: useProps,
  emits: ['update'],
  setup(useProps) {
    let { fieldValue } = fieldBaseValue(useProps)
    return { fieldValue }
  },
}
</script>
