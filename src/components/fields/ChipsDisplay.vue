<template>
  <div class="p-d-flex p-ai-center p-flex-column p-flex-sm-row">
    <div
      v-for="(chip, index) in field.data"
      :key="index"
    >
      <Chip
        v-bind="properties"
        class="p-mr-2 p-mb-2"
      >
        {{ chip[field.name] }}
      </Chip>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import Chip from 'primevue/chip'
import fieldBase from '../fieldBase.js'
let { useProps, fieldBaseIterable } = fieldBase()

export default {
  components: { Chip },
  props: useProps,
  setup(useProps) {
    let field = computed(() => fieldBaseIterable(useProps))
    return { field }
  },
}
</script>
