<template>
  <div class="p-d-flex p-ai-center p-flex-column p-flex-sm-row">
    <div
      v-for="(chip, index) in data"
      :key="index"
    >
      <Chip
        v-bind="properties"
        class="p-mr-2 p-mb-2"
      >
        {{ chip[fieldName] }}
      </Chip>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import Chip from 'primevue/chip'
import fieldBase from '../fieldBase.js'
let { useProps, fieldBaseIterable } = fieldBase()

export default {
  components: { Chip },
  props: useProps,
  setup(useProps) {
    let data = ref({})
    let fieldName = ref('')
    watch(
      useProps,
      (newProps) => {
        let result = fieldBaseIterable(newProps)
        data.value = result.data
        fieldName.value = result.fieldName
      },
      { immediate: true }
    )

    return { data, fieldName }
  },
}
</script>
