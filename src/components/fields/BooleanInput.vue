<template>
  <div class="p-grid">
    <div class="p-col">
      <label :for="'input' + field">{{ label }}</label>
    </div>
    <div class="p-col">
      <Checkbox
        :id="'input' + field"
        v-model="inputValue"
        v-bind="properties"
        :binary="true"
        @update:modelValue="$emit('update', $event)"
      />
    </div>
  </div>
</template>

<script>
import Checkbox from 'primevue/checkbox'
import commonBase from '../commonBase.js'

let { useProps, commonBaseMethods } = commonBase()

export default {
  name: 'BooleanInput',
  components: {
    Checkbox,
  },
  props: useProps,
  emits: ['update'],
  setup(useProps) {
    let { inputValue } = commonBaseMethods(useProps)
    return { inputValue }
  },
}
</script>
