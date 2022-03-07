<template>
  <div class="grid">
    <div class="col">
      <label :for="'input' + fieldValue">{{ label }}</label>
    </div>
    <div class="col">
      <InputText
        :id="'input' + fieldValue"
        v-model="fieldValue"
        v-bind="properties"
        @update:modelValue="$emit('update', $event)"
      />
    </div>
  </div>
</template>

<script>
import InputText from 'primevue/inputtext'
import fieldBase from '../fieldBase.js'

let { useProps, fieldBaseValue } = fieldBase()
export default {
  components: { InputText },
  props: useProps,
  emits: ['update'],
  setup(useProps) {
    let fieldValue = fieldBaseValue(useProps)
    return { fieldValue }
  },
}
</script>
