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
        v-on="events"
        @complete="onComplete"
        @update:model-value="$emit('update', $event)"
      />
    </div>
  </div>
</template>

<script>
import { ref, toRefs, watch } from 'vue'
import AutoComplete from 'primevue/autocomplete'
import fieldBase from '../fieldBase.js'

let { useProps, fieldBaseIterable } = fieldBase()

export default {
  components: { AutoComplete },
  props: useProps,
  emits: ['update'],
  setup(useProps) {
    let props = toRefs(useProps)
    let fieldValue = ref([])
    let fieldName = ref('')
    let suggestions = ref([])

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
        suggestions.value = await props.methods.value.onComplete(query.query)
      } else {
        // Blank the suggestions, as if not modified the AC ui 'blocks' forever.
        suggestions.value = []
      }
    }

    return { fieldName, fieldValue, onComplete, suggestions }
  },
}
</script>
