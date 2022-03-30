<template>
  <div class="grid">
    <div class="col-4">
      <!-- <span>{{ label }}</span> -->
      <label :for="'input' + fieldValue">{{ label }}</label>
    </div>
    <div class="col-8">
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
import { ref, toRefs, watch } from 'vue'
import Textarea from 'primevue/textarea'

import fieldBase from '../fieldBase.js'

let { useProps, fieldBaseValue } = fieldBase()
export default {
  components: { Textarea },
  props: useProps,
  emits: ['update'],
  setup(useProps) {
    let fieldValue = ref()
    let props = toRefs(useProps)
    watch(
      [props.field, props.item],
      () => {
        fieldValue.value = fieldBaseValue(useProps)
      },
      { immediate: true }
    )
    return { fieldValue }
  },
}
</script>
