<template>
  <div class="grid">
    <div class="col-4">
      <label :for="'input' + fieldName">{{ label }}</label>
    </div>
    <div class="col-8">
      <AutoComplete
        :id="'input' + fieldName"
        v-model="fieldValue"
        :field="fieldName"
        :delay="600"
        :force-selection="true"
        :suggestions="suggestions"
        placeholder="Search..."
        v-bind="properties"
        :class="{ 'p-invalid': errorMessage }"
        v-on="events"
        @complete="onComplete"
        @update:model-value="$emit('update', $event)"
      />
      <small v-if="errorMessage" class="p-error">{{ errorMessage }}</small>
    </div>
  </div>
</template>

<script>
import { ref, toRefs, watch } from 'vue'
import { useField } from 'vee-validate'
import AutoComplete from 'primevue/autocomplete'
import fieldBase from '../fieldBase.js'

let { useProps, fieldBaseIterable } = fieldBase()

export default {
  components: { AutoComplete },
  props: useProps,
  emits: ['update', 'valid'],
  setup(useProps, { emit }) {
    let props = toRefs(useProps)
    let fieldName = ref('')
    let suggestions = ref([])
    let field = useField(props.label.value, props.validator.value)
    let errorMessage = field.errorMessage
    let fieldValue = field.value
    let meta = field.meta

    watch(meta, () => {
      // Emit validation events when field VV meta changes
      emit('valid', meta.valid)
    })

    watch(
      [props.item, props.field],
      () => {
        let result = fieldBaseIterable(useProps)
        fieldName.value = result.name
        fieldValue.value = result.data
      },
      { immediate: true }
    )

    let onComplete = async (query) => {
      if ('onComplete' in props.methods.value) {
        // Use await as method might return a promise/be async
        suggestions.value = await props.methods.value.onComplete(query.query, props.item.value, props.newItem.value)
      } else {
        // Blank the suggestions, as if not modified the AC ui 'blocks' forever.
        suggestions.value = []
      }
    }

    return { errorMessage, fieldName, fieldValue, onComplete, suggestions }
  },
}
</script>
