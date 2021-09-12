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
import commonBase from '../commonBase.js'

let { useProps, commonBaseMethods } = commonBase()
export default {
  components: { Checkbox },
  props: useProps,
  setup(useProps) {
    let { displayValue } = commonBaseMethods(useProps)
    return { displayValue }
  },
}
</script>
