<template>
  <div :id="'detailcard-' + name">
    <div class="p-grid p-dir-col">
      <div class="p-col">
        <component
          :is="field.input"
          v-for="field in fields"
          :key="field.label"
          :configuration="configuration"
          :item="item"
          :field="field.field"
          v-bind="field"
          @blur="onBlur(field.field)"
          @input="onInput(field.field, $event)"
        />
      </div>
    </div>
    <button
      type="submit"
      @click.once="onSave"
    >
      Save
    </button>
  </div>
</template>

<script>
export default {
  name: 'SLDDetail',
  components: {
    BooleanInput: () => import(/* webpackPrefetch: true */ './inputs/BooleanInput'),
    DateInput: () => import(/* webpackPrefetch: true */ './inputs/DateInput'),
    TextInput: () => import(/* webpackPrefetch: true */ './inputs/TextInput'),
    TextareaInput: () => import(/* webpackPrefetch: true */ './inputs/TextareaInput'),
  },
  props: {
    // Collection schema data
    configuration: {
      type: Object,
      required: true,
    },
    item: {
      type: Object,
      default: () => ({}),
    },
    name: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      eventName: `${this.name}:`,
      // We start with an empty object and update it as fields change
      newItem: {},
      // Fields to display in the card (from schema)
      fields: this.configuration.fields,
    }
  },
  methods: {
    onBlur(field) {
      // Emit if the blurred field's value has changed
      if (field in this.newItem) {
        this.$sldbus.emit(`${this.eventName}blur`, [this.item, { [field]: this.newItem[field] }])
      }
    },
    onInput(field, event) {
      // Update newItem with field changes
      this.newItem[field] = event
      this.$sldbus.emit(`${this.eventName}input`, [this.item, { [field]: this.newItem[field] }])
    },
    onSave() {
      this.$sldbus.emit(`${this.eventName}save`, [this.item, this.newItem])
      this.$emit('close')
    },
  },
}
</script>

<style></style>
