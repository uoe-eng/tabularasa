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

export default {
  name: 'DateInput',
  components: {
    Calendar,
  },
  props: {
    field: {
      type: String,
      default: '',
    },
    item: {
      type: Object,
      default: () => ({}),
    },
    label: {
      type: String,
      default: '',
    },
  },
  emits: ['update'],
  data() {
    return {
      dateValue: this.item[this.field],
    }
  },
  computed: {
    date: {
      get() {
        // Convert date string to date object for Calendar
        // only if dateValue is defined (Date(undefined) == 'now')
        let date
        if (this.dateValue) {
          date = new Date(this.dateValue)
        }
        return date
      },
      set(newDate) {
        this.dateValue = newDate
      },
    },
  },
  methods: {
    onUpdate(event) {
      // Subtract timezone offset from time to 'convert' to UTC.
      event.setMinutes(event.getMinutes() - event.getTimezoneOffset())
      this.$emit('update', event)
    },
  },
}
</script>
