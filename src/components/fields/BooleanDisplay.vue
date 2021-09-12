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

let { useProps, fieldBaseMethods } = fieldBase()
export default {
  components: { Checkbox },
  props: useProps,
  setup(useProps) {
    let { displayValue } = fieldBaseMethods(useProps)
    return { displayValue }
  },
}
</script>
