<template>
  <div class="p-grid">
    <div class="p-col">
      <!-- <span>{{ label }}</span> -->
      <label :for="'input' + field">{{ label }}</label>
    </div>
    <div class="p-col">
      <Textarea
        :id="'input' + field"
        v-model="inputValue"
        v-bind="properties"
        @update:modelValue="$emit('update', $event)"
      />
    </div>
  </div>
</template>

<script>
import Textarea from 'primevue/textarea'

import fieldBase from '../fieldBase.js'

let { useProps, fieldBaseMethods } = fieldBase()
export default {
  components: { Textarea },
  props: useProps,
  emits: ['update'],
  setup(useProps) {
    let { inputValue } = fieldBaseMethods(useProps)
    return { inputValue }
  },
}
</script>
