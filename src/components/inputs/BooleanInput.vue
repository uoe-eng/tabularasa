<template>
  <div class="p-grid">
    <div class="p-col">
      <label :for="'input' + field">{{ label }}</label>
    </div>
    <div class="p-col">
      <Checkbox
        :id="'input' + field"
        v-model="checked"
        :binary="true"
        @input="$emit('update', $event)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BooleanInput',
  components: {
    Checkbox: () => import(/* webpackPrefetch: true */ 'primevue/checkbox'),
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
  data() {
    return {
      // We must use v-model for Checkbox, so 'copy' the boolean value here
      // We still rely on the 'update' to modify the data in DetailCard
      checked: this.item[this.field],
    }
  },
}
</script>
