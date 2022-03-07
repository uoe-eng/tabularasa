<template>
  <div class="grid">
    <div class="col">
      <label :for="'input' + fieldValue">{{ label }}</label>
    </div>
    <div class="col">
      <InputNumber
        :id="'input' + fieldValue"
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
    let fieldValue = fieldBaseValue(useProps)
    return { fieldValue }
  },
}
</script>
