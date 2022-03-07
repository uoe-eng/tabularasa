<template>
  <div class="grid">
    <div class="col">
      <label :for="'input' + fieldValue">{{ label }}</label>
    </div>
    <div class="col">
      <Checkbox
        :id="'input' + fieldValue"
        v-model="fieldValue"
        :binary="true"
        v-bind="properties"
        @update:modelValue="$emit('update', $event)"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
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
    let fieldValue = ref(fieldBaseValue(useProps))
    return { fieldValue }
  },
}
</script>
