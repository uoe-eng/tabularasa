<template>
  <div :id="'listtable-' + name">
    <DataTable
      v-model:filters="filters"
      :value="collection"
      :class="'listtable-' + name"
      v-bind="dtProps"
      @filter="onLazy('filter', $event)"
      @sort="onLazy('sort', $event)"
      @page="onLazy('page', $event)"
      @row-select="onRowSelect"
    >
      <Column
        v-for="col of columns"
        :key="col.field"
        :field="col.field"
        :header="col.label"
        v-bind="col.properties"
      >
        <template
          v-if="col.field in filters"
          #filter="{filterModel,filterCallback}"
        >
          <InputText
            v-model="filterModel.value"
            type="text"
            class="p-column-filter"
            placeholder="Filter..."
            @keydown.enter="filterCallback()"
          />
        </template>
        <template #body="slotProps">
          <component
            :is="col.component"
            v-if="col.component"
            :key="slotProps.index"
            :configuration="configuration"
            :item="slotProps.data"
            v-bind="col"
            v-on="col.events || {}"
          />
          <div
            v-else
            v-on="col.events || {}"
          >
            {{ getFieldValue(slotProps.data, slotProps.column.key) }}
          </div>
        </template>
      </Column>
      <template #paginatorstart>
        <button
          :id="'newButton_' + name"
          type="submit"
          @click="onRowSelect"
        >
          New
        </button>
        <button
          type="submit"
          @click="onReload"
        >
          <i class="icon pi pi-replay" />
        </button>
      </template>
      <template #paginatorend />
    </DataTable>
    <TRDialog
      v-if="configuration.TRDetail"
      :header="dialogHeader"
      :configuration="configuration"
      :visible="dialogVisible"
      v-bind="configuration.TRDetail"
      :item="selectedRow"
      :name="name"
    />
  </div>
</template>

<script setup>
import { computed, defineProps, ref, toRefs, watch } from 'vue'
import { trBus } from '@/index'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import merge from 'lodash.merge'
import { getFieldValue } from '@/helpers'

// Default config values
const DT_PROPS = {
  // Define props to be passed 'direct' to DataTable
  autoLayout: true,
  lazy: true,
  paginator: true,
  paginatorPosition: 'both',
  removableSort: true,
  rows: 20,
}

let props = defineProps({
  configuration: {
    type: Object,
    required: true,
  },
  collection: {
    type: Array,
    default: () => [],
  },
  // Collection name
  name: {
    type: String,
    default: '',
  },
})

const { collection } = toRefs(props)
let dialogHeader = ref('')
let dialogVisible = ref(false)
// Use ref, not reactive, as we replace the whole object, rather than modify its properties
let dtProps = ref({})
let selectedRow = ref({})
let rowIndex = ref()
let filters = ref({})

const columns = computed(() => {
  // Get column metadata from collections
  return props.configuration.TRList.fields
})

const onLazy = (type, event) => {
  dtProps.value.limit = event.rows
  trBus.emit(`TRList:${type}:${props.name}`, event)
}

const onReload = () => {
  trBus.emit(`TRList:reload:${props.name}`)
}

const onRefresh = () => {
  // Create a new object with a new reference, or it won't be reactive if underlying data is unchanged
  selectedRow.value = Object.assign({}, collection.value[rowIndex.value])
}

const onRowSelect = (event) => {
  // Existing data or empty object
  dialogHeader.value = 'New item'
  selectedRow.value = {}
  if (event.data) {
    dialogHeader.value = 'Edit item'
    selectedRow.value = event.data
    // Preserve the rowIndex so we can access the item data in onRefresh
    rowIndex.value = event.index
  }
  trBus.emit(`TRList:rowSelect:${props.name}`, selectedRow.value)
  // Updating the prop value will open dialog (actual boolean value is irrelevant)
  dialogVisible.value = !dialogVisible.value
}

// Listen for detail card refresh events
trBus.on('*', (type) => {
  if (type.startsWith('TRDetail:refresh')) {
    onRefresh()
  }
})

watch(
  props.configuration,
  (newVal) => {
    // Enable row selection if TRDetail defined
    if ('TRDetail' in newVal) {
      DT_PROPS.selectionMode = 'single'
    }
    if ('filters' in newVal.TRList) {
      // Enable filtering in UI
      DT_PROPS.filterDisplay = 'menu'
      filters.value = newVal.TRList.filters
    }
    // Merge defaults with passed-in property
    dtProps.value = merge(dtProps.value, DT_PROPS, newVal.TRList.properties)
  },
  {
    immediate: true,
    deep: true,
  }
)

trBus.emit(`TRList:load:${props.name}`)
</script>

<style></style>
