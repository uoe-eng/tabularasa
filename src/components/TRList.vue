<template>
  <div :id="'listtable-' + name">
    <DataTable
      :value="collection"
      :class="'listtable-' + name"
      v-bind="dtProps"
      @page="onPage($event)"
      @row-select="onRowSelect"
    >
      <Column
        v-for="col of columns"
        :key="col.field"
        :field="col.field"
        :header="col.label"
      >
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
import merge from 'lodash.merge'
import { getFieldValue } from '@/helpers'

// Default config values
const DT_PROPS = {
  // Define props to be passed 'direct' to DataTable
  autoLayout: true,
  lazy: true,
  paginator: true,
  paginatorPosition: 'both',
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
let offset = ref(0)

const columns = computed(() => {
  // Get column metadata from collections
  return props.configuration.TRList.fields
})

const onPage = (event) => {
  offset.value = event.first
  dtProps.value.limit = event.rows
  trBus.emit(`TRList:page:${props.name}`, { offset: offset.value, limit: dtProps.value.limit })
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
