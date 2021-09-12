<template>
  <div class="p-grid">
    <div class="p-col">
      <label :for="'input' + field">{{ label }}</label>
    </div>
    <div class="p-col">
      <InputText
        :id="'input' + field"
        v-model="inputValue"
        v-bind="properties"
        @update:modelValue="$emit('update', $event)"
      />
    </div>
  </div>
</template>

<script>
import InputText from 'primevue/inputtext'
import commonBase from '../commonBase.js'

let { useProps, commonBaseMethods } = commonBase()
export default {
  components: { InputText },
  props: useProps,
  emits: ['update'],
  setup(useProps) {
    let { inputValue } = commonBaseMethods(useProps)
    return { inputValue }
  },
}
</script>
