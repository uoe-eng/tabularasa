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
          />
          <span v-else>{{ getFieldValue(slotProps.data, slotProps.column.key) }}</span>
        </template>
      </Column>
      <template #paginatorLeft>
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
    </DataTable>
    <Dialog
      v-if="configuration.TRDetail"
      v-model:visible="dialogVisible"
      :maximizable="true"
      v-bind="configuration.TRDetail.properties"
      :header="dialogHeader"
    >
      <TRDetail
        :configuration="configuration.TRDetail"
        :item="selectedRow"
        :name="name"
        @close="dialogVisible = false"
      />
    </Dialog>
  </div>
</template>

<script setup>
import { computed, defineProps, ref, watch } from 'vue'
import { trBus } from '@/index'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import Dialog from 'primevue/dialog'
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
  selectionMode: 'single',
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

let dialogHeader = ref('')
let dialogVisible = ref(false)
// Use ref, not reactive, as we replace the whole object, rather than modify its properties
let dtProps = ref({})
let selectedRow = ref({})
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

const onRowSelect = (event) => {
  // Existing data or empty object
  dialogHeader.value = 'New item'
  selectedRow.value = {}
  if (event.data) {
    dialogHeader.value = 'Edit item'
    selectedRow.value = event.data
  }
  trBus.emit(`TRList:rowSelect:${props.name}`, selectedRow.value)
  dialogVisible.value = true
}

watch(
  props.configuration,
  (newVal) => {
    // Merge defaults with passed-in property
    dtProps.value = merge(dtProps.value, DT_PROPS, newVal.TRList.properties)
    if ('filters' in newVal.TRList) {
      // Enable filtering in UI
      dtProps.value.filterDisplay = 'row'
      filters.value = newVal.TRList.filters
    }
  },
  {
    immediate: true,
    deep: true,
  }
)

trBus.emit(`TRList:load:${props.name}`)
</script>

<style>
.p-dialog {
  display: flex;
  max-height: 100%;
  min-width: 50vw;
}

.p-dialog-content {
  overflow-y: auto;
}
</style>
