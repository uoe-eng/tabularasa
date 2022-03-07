<template>
  <div class="grid">
    <div class="col">
      <!-- <span>{{ label }}</span> -->
      <label :for="'input' + fieldValue">{{ label }}</label>
    </div>
    <div class="col">
      <Textarea
        :id="'input' + fieldValue"
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
