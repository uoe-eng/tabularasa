<template>
  <div class="grid">
    <div class="col-4">
      <label :for="'input' + fieldValue">{{ label }}</label>
    </div>
    <div class="col-8">
      <InputNumber
        :id="'input' + fieldValue"
        v-model="fieldValue"
        v-bind="properties"
        :class="{ 'p-invalid': errorMessage }"
        @update:model-value="$emit('update', $event)"
      />
      <small v-if="errorMessage" class="p-error">{{ errorMessage }}</small>
    </div>
  </div>
</template>

<script>
import { toRefs, watch } from 'vue'
import { useField } from 'vee-validate'
import InputNumber from 'primevue/inputnumber'
import fieldBase from '../fieldBase.js'

let { useProps, fieldBaseValue } = fieldBase()
export default {
  components: { InputNumber },
  props: useProps,
  emits: ['update', 'valid'],
  setup(useProps, { emit }) {
    let props = toRefs(useProps)
    let field = useField(props.label.value, props.validator.value)
    let errorMessage = field.errorMessage
    let fieldValue = field.value
    let meta = field.meta

    watch(meta, () => {
      // Emit validation events when field VV meta changes
      emit('valid', meta.valid)
    })

    watch(
      [props.field, props.item],
      () => {
        fieldValue.value = fieldBaseValue(useProps)
      },
      { immediate: true }
    )

    return { errorMessage, fieldValue }
  },
}
</script>
