<template>
  <div :id="'detailcard-' + name">
    <div class="p-grid p-dir-col">
      <div class="p-col">
        <component
          :is="field.fieldType"
          v-for="field in fields"
          :key="field.label"
          :collections="collections"
          :item="item"
          :field="field.field"
          v-bind="field"
          @update="onUpdate($event, field)"
        />
      </div>
    </div>
    <button
      type="submit"
      @click="onSave"
    >
      Save
    </button>
  </div>
</template>

<script>
export default {
  name: 'DetailCard',
  components: {
    TextInput: () => import(/* webpackPrefetch: true */ './inputs/TextInput'),
  },
  props: {
    // Collection schema data
    collections: {
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
      fields: this.collections.detail,
    }
  },
  methods: {
    onUpdate(event, field) {
      // Update newItem with field changes
      this.$emit('sld:update', field, event)
      this.newItem[field['field']] = event
    },
    onSave() {
      this.$emit('sld:save', this.item, this.newItem)
    },
  },
}
</script>

<style></style>
