<template>
  <div class="grid">
    <div class="col-4">
      <label :for="'input' + data.name">{{ label }}</label>
    </div>
    <div class="col-8">
      <DataTable :value="data.data" :striped-rows="true" :selection-mode="selectionMode" @row-select="onRowSelect">
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
import { TYPERE } from '@/helpers'
import fieldBase from '../fieldBase.js'
let { useProps, fieldBaseIterable, fieldBaseValue } = fieldBase()

export default {
  components: { Column, DataTable },
  props: useProps,
  setup(useProps) {
    let field = toRef(useProps, 'field')
    let item = toRef(useProps, 'item')
    let methods = toRef(useProps, 'methods')
    let columns = methods.value.columns()

    let data = computed(() => {
      let fld
      if (TYPERE.test(field.value)) {
        // Field is a nested iterable
        fld = fieldBaseIterable(useProps)
      } else {
        // Field value should be an object - restructure for DataTable props
        fld = { data: [fieldBaseValue(useProps)], name: field.value }
      }
      return fld
    })

    const selectionMode = computed(() => {
      // Enable row selection if config schema is defined
      if (Object.hasOwn(methods.value, 'config')) {
        return 'single'
      }
      return null
    })

    const onRowSelect = (event) => {
      trBus.emit(`TRDetail:TableDisplay:${useProps.name}`, {
        config: methods.value.config,
        data: event.data,
      })
    }

    return { columns, data, item, onRowSelect, selectionMode }
  },
}
</script>
