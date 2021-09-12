<template>
  <div class="p-grid">
    <div class="p-col">
      <!-- <span>{{ label }}</span> -->
      <label :for="'input' + field">{{ label }}</label>
    </div>
    <div class="p-col">
      <Textarea
        :id="'input' + field"
        v-model="display"
        v-bind="properties"
        @update:modelValue="$emit('update', $event)"
      />
    </div>
  </div>
</template>

<script>
import Textarea from 'primevue/textarea'

import commonBase from '../commonBase.js'

let { useProps, commonBaseMethods } = commonBase()
export default {
  components: { Textarea },
  props: useProps,
  emits: ['update'],
  setup(useProps) {
    let { inputValue } = commonBaseMethods(useProps)
    return { inputValue }
  },
}
</script>
