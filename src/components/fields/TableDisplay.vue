<template>
  <div class="grid">
    <div class="col-4">
      <label :for="'input' + field.name">{{ label }}</label>
    </div>
    <div class="col-8">
      <DataTable :value="field.data" selection-mode="single" @row-select="onRowSelect">
        <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.label"></Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
import { computed, toRef } from 'vue'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import { trBus } from '@/index'
import fieldBase from '../fieldBase.js'
let { useProps, fieldBaseIterable } = fieldBase()

export default {
  components: { Column, DataTable },
  props: useProps,
  setup(useProps) {
    let field = computed(() => fieldBaseIterable(useProps))
    let item = toRef(useProps, 'item')
    let methods = toRef(useProps, 'methods')
    let columns = methods.value.columns()
    console.log('METHODS', methods.value)

    const onRowSelect = (event) => {
      trBus.emit(`TRDetail:TableDisplay`, {
        config: methods.value.config,
        data: event.data,
      })
    }

    return { columns, field, item, onRowSelect }
  },
}
</script>
