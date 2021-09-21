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
        @update:modelValue="onUpdate($event)"
      />
    </div>
  </div>
</template>

<script>
import Calendar from 'primevue/calendar'
import fieldBase from '../fieldBase.js'

let { useProps, fieldBaseValue } = fieldBase()

export default {
  name: 'DateInput',
  components: { Calendar },
  props: useProps,
  emits: ['update'],
  setup(useProps, context) {
    let { inputValue } = fieldBaseValue(useProps)

    let onUpdate = (event) => {
      // Subtract timezone offset from time to 'convert' to UTC
      // and prevent processing in local time and potentially cross the day boundary
      event.setMinutes(event.getMinutes() - event.getTimezoneOffset())
      // Send event as ISO8601 string,removing time part
      context.emit('update', event.toISOString().strip('T')[0])
    }
    return { inputValue, onUpdate }
  },
  computed: {
    date: {
      get() {
        // Convert date string to date object for Calendar
        // only if inputValue is defined (Date(undefined) == 'now')
        let date
        if (this.inputValue) {
          date = new Date(this.inputValue)
        }
        return date
      },
      set(newDate) {
        this.inputValue = newDate
      },
    },
  },
}
</script>
