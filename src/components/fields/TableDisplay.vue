<template>
  <div class="grid">
    <div class="col-4">
      <label :for="'input' + field.name">{{ label }}</label>
    </div>
    <div class="col-8">
      <DataTable :value="field.data" :striped-rows="true" :selection-mode="selectionMode" @row-select="onRowSelect">
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
    let field = computed(() => {
      let fld = fieldBaseIterable(useProps)
      // Convert single objects to an array for DataTable to display
      if (!Array.isArray(fld)) {
        fld = [fld]
      }
      return fld
    })

    let item = toRef(useProps, 'item')
    let methods = toRef(useProps, 'methods')
    let columns = methods.value.columns()

    const selectionMode = computed(() => {
      // Enable row selection if config schema is defined
      if (Object.hasOwn(methods.value, 'config')) {
        return 'single'
      }
      return null
    })

    const onRowSelect = (event) => {
      trBus.emit(`TRDetail:TableDisplay`, {
        config: methods.value.config,
        data: event.data,
      })
    }

    return { columns, field, item, onRowSelect, selectionMode }
  },
}
</script>
