<template>
  <div class="p-grid">
    <div class="p-col">
      <label :for="'input' + field">{{ label }}</label>
    </div>
    <div class="p-col">
      <InputNumber
        :id="'input' + field"
        v-model="inputValue"
        v-bind="properties"
        @update:modelValue="$emit('update', $event)"
      />
    </div>
  </div>
</template>

<script>
import InputNumber from 'primevue/inputnumber'
import fieldBase from '../fieldBase.js'

let { useProps, fieldBaseMethods } = fieldBase()
export default {
  components: { InputNumber },
  props: useProps,
  emits: ['update'],
  setup(useProps) {
    let { inputValue } = fieldBaseMethods(useProps)
    return { inputValue }
  },
}
</script>
