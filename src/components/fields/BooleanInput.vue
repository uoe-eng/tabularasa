<template>
  <div class="grid">
    <div class="col-4">
      <label :for="'input' + fieldValue">{{ label }}</label>
    </div>
    <div class="col-8">
      <Checkbox
        :id="'input' + fieldValue"
        v-model="fieldValue"
        :binary="true"
        v-bind="properties"
        @update:model-value="$emit('update', $event)"
      />
    </div>
  </div>
</template>

<script>
import { ref, toRefs, watch } from 'vue'
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
