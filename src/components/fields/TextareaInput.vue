<template>
  <div class="p-grid">
    <div class="p-col">
      <!-- <span>{{ label }}</span> -->
      <label :for="'input' + field">{{ label }}</label>
    </div>
    <div class="p-col">
      <Textarea
        :id="'input' + field"
        v-model="fieldValue"
        v-bind="properties"
        @update:modelValue="$emit('update', $event)"
      />
    </div>
  </div>
</template>

<script>
import Textarea from 'primevue/textarea'

import fieldBase from '../fieldBase.js'

let { useProps, fieldBaseValue } = fieldBase()
export default {
  components: { Textarea },
  props: useProps,
  emits: ['update'],
  setup(useProps) {
    let fieldValue = fieldBaseValue(useProps)
    return { fieldValue }
  },
}
</script>
