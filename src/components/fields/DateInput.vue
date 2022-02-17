<template>
  <div class="p-grid">
    <div class="p-col">
      <label :for="'input' + field">{{ label }}</label>
    </div>
    <div class="p-col">
      <Calendar
        :id="'input' + field"
        v-model="date"
        date-format="yy-mm-dd"
        v-bind="properties"
        @update:modelValue="onUpdate($event)"
      />
    </div>
  </div>
</template>

<script>
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
    let { fieldValue } = fieldBaseValue(useProps)

    let onUpdate = (event) => {
      if (!get(useProps, ['properties', 'showTime'])) {
        // Subtract timezone offset from time to 'convert' to UTC
        // and prevent processing in local time and potentially cross the day boundary
        event.setMinutes(event.getMinutes() - event.getTimezoneOffset())
      }
      // Send event as ISO8601 string,removing time part
      context.emit('update', event.toISOString())
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
        this.fieldValue = newDate
      },
    },
  },
}
</script>
