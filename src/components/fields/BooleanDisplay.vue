<template>
  <div>
    <Checkbox
      :id="'checkbox' + fieldValue"
      :model-value="fieldValue"
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
    let fieldValue = fieldBaseValue(useProps)
    return { fieldValue }
  },
}
</script>
