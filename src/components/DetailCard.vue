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
          @blur="onBlur($event, field)"
          @input="onInput($event, field)"
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
  name: 'DetailCard',
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
      default: () => ({}),
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
      // We start with an empty object and update it as fields change
      newItem: {},
      // Fields to display in the card (from schema)
      fields: this.configuration.fields,
    }
  },
  methods: {
    onBlur(event, schema) {
      // Emit if the blurred field's value has changed
      if (schema.field in this.newItem) {
        this.$emit('sld:blur', this.item, { [schema.field]: this.newItem[schema.field] })
      }
    },
    onInput(event, schema) {
      // Update newItem with field changes
      this.newItem[schema.field] = event
      // Emit the new value
      this.$emit('sld:input', this.name, this.item, event)
    },
    onSave() {
      this.$emit('sld:save', this.item, this.newItem)
    },
  },
}
</script>

<style></style>
