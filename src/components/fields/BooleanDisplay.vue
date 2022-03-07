<template>
  <div>
    <Checkbox
      :id="'checkbox' + fieldValue"
      class="pointer-events-none"
      :model-value="fieldValue"
      :binary="true"
      v-bind="properties"
      readonly="true"
    />
  </div>
</template>

<script>
import { computed } from 'vue'
import Checkbox from 'primevue/checkbox'
import fieldBase from '../fieldBase.js'

let { useProps, fieldBaseValue } = fieldBase()
export default {
  components: { Checkbox },
  props: useProps,
  setup(useProps) {
    let fieldValue = computed(() => fieldBaseValue(useProps))
    return { fieldValue }
  },
}
</script>
