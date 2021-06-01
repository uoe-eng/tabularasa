<template>
  <div class="p-grid">
    <div class="p-col">
      <label :for="'input' + field">{{ label }}</label>
    </div>
    <div class="p-col">
      <!-- AutoComplete explanation...
        v-model is a temp copy to avoid overwriting object with string
        field is the property to look up in v-model object for display
        suggestions is the array of search matches
        @complete is the 'invoke search' method
        @item-select is the method to invoke when an item is selected
      -->
      <AutoComplete
        :id="'input' + field"
        :model-value="fieldDisplay(item,field)"
        :delay="600"
        :min-length="1"
        field="label"
        v-bind="props"
        :suggestions="searchResults"
        placeholder="Search..."
        @complete="search($event)"
        @item-select="$emit('update', $event)"
      >
        <template
          v-if="props.multiple"
          #chip="slotProps"
        >
          <div>
            <span>{{ slotProps.value[field.split(':')[1]] }}</span>
          </div>
        </template>
      </AutoComplete>
    </div>
  </div>
</template>

<script>
import AutoComplete from 'primevue/autocomplete'
import { fieldDisplay } from '../../helpers'

export default {
  name: 'DropdownInput',
  components: {
    AutoComplete,
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
    props: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['update'],
  data() {
    return {
      searchResults: null,
    }
  },
  methods: {
    fieldDisplay,
    search(value) {
      console.log('search', value)
      // FIXME: work out how to handle calling a search function and returning results
      this.searchResults = [{ label: 'CAT', value: 'black' }]
    },
  },
}
</script>
