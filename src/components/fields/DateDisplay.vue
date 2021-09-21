<template>
  <div>
    <Calendar
      v-model="date"
      disabled="true"
      readonly="true"
      date-format="yy-mm-dd"
      v-bind="properties"
      class="date-display"
    />
  </div>
</template>

<script>
import { computed } from 'vue'
import Calendar from 'primevue/calendar'
import fieldBase from '../fieldBase.js'

let { useProps, fieldBaseValue } = fieldBase()
export default {
  components: { Calendar },
  props: useProps,
  setup(useProps) {
    let { displayValue } = fieldBaseValue(useProps)
    let date = computed(() => {
      return new Date(displayValue.value)
    })

    return { date }
  },
}
</script>

<style>
/* Make disabled input look like a span. */
.date-display input:disabled {
  pointer-events: none;
  opacity: 1 !important;
  background: inherit;
  border: 0px;
}
</style>
