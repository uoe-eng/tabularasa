<template>
  <div>
    <Checkbox
      :id="'checkbox' + displayValue"
      :model-value="displayValue"
      :binary="true"
      v-bind="properties"
      readonly="true"
    />
  </div>
</template>

<script>
import Checkbox from 'primevue/checkbox'
import fieldBase from '../fieldBase.js'

let { useProps, fieldBaseValue } = fieldBase()
export default {
  components: { Checkbox },
  props: useProps,
  setup(useProps) {
    let { displayValue } = fieldBaseValue(useProps)
    return { displayValue }
  },
}
</script>
