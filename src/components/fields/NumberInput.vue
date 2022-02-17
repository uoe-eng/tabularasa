<template>
  <div class="p-grid">
    <div class="p-col">
      <label :for="'input' + field">{{ label }}</label>
    </div>
    <div class="p-col">
      <InputNumber
        :id="'input' + field"
        v-model="fieldValue"
        v-bind="properties"
        @update:modelValue="$emit('update', $event)"
      />
    </div>
  </div>
</template>

<script>
import InputNumber from 'primevue/inputnumber'
import fieldBase from '../fieldBase.js'

let { useProps, fieldBaseValue } = fieldBase()
export default {
  components: { InputNumber },
  props: useProps,
  emits: ['update'],
  setup(useProps) {
    let { fieldValue } = fieldBaseValue(useProps)
    return { fieldValue }
  },
}
</script>
