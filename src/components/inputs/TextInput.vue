<template>
  <div class="p-grid">
    <div class="p-col">
      <label :for="'input' + field">{{ label }}</label>
    </div>
    <div class="p-col">
      <InputText
        :id="'input' + field"
        :value="item[field]"
        @input="$emit('update', $event)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  components: {
    InputText: () => import(/* webpackPrefetch: true */ 'primevue/inputtext'),
  },
  props: {
    label: {
      type: String,
      default: '',
    },
    item: {
      type: Object,
      default: () => {},
    },
    field: {
      type: String,
      default: '',
    },
  },
}
</script>
