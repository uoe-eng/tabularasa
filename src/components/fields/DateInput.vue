<template>
  <div class="grid">
    <div class="col-4">
      <label :for="'input' + fieldValue">{{ label }}</label>
    </div>
    <div class="col-8">
      <Calendar
        :id="'input' + fieldValue"
        v-model="date"
        date-format="yy-mm-dd"
        v-bind="properties"
        @update:modelValue="onUpdate($event)"
      />
    </div>
  </div>
</template>

<script>
import { ref, toRefs, watch } from 'vue'
import get from 'lodash.get'
import Calendar from 'primevue/calendar'
import fieldBase from '../fieldBase.js'

let { useProps, fieldBaseValue } = fieldBase()

export default {
  name: 'DateInput',
  components: { Calendar },
  props: useProps,
  emits: ['update'],
  setup(useProps, context) {
    let fieldValue = ref()
    let props = toRefs(useProps)
    watch(
      [props.field, props.item],
      () => {
        fieldValue.value = fieldBaseValue(useProps)
      },
      { immediate: true }
    )

    let onUpdate = (event) => {
      // Ignore field being cleared
      if (event) {
        if (!get(useProps, ['properties', 'showTime'])) {
          // Subtract timezone offset from time to 'convert' to UTC
          // and prevent processing in local time and potentially cross the day boundary
          event.setMinutes(event.getMinutes() - event.getTimezoneOffset())
        }
        // Send event as ISO8601 string,removing time part
        context.emit('update', event.toISOString())
      }
    }
    return { fieldValue, onUpdate }
  },
  computed: {
    date: {
      get() {
        // Convert date string to date object for Calendar
        // only if fieldValue is defined (Date(undefined) == 'now')
        let date
        if (this.fieldValue) {
          date = new Date(this.fieldValue)
        }
        return date
      },
      set(newDate) {
        // Ignore falsey values
        if (newDate) {
          this.fieldValue = newDate
        }
      },
    },
  },
}
</script>
