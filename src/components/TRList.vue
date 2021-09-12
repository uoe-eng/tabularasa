<template>
  <div :id="'listtable-' + name">
    <DataTable
      :value="processedRows"
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
          type="submit"
          class="icon"
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
      :content-style="{overflow: 'visible'}"
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

<script>
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

export default {
  name: 'TRList',
  components: {
    Column,
    DataTable,
    Dialog,
  },
  props: {
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
  },
  data() {
    return {
      dialogHeader: '',
      dialogVisible: false,
      dtProps: undefined,
      filter: {},
      offset: 0,
      // Data object for the selected row
      selectedRow: undefined,
    }
  },
  computed: {
    columns() {
      // Get column metadata from collections
      return this.configuration.TRList.fields
    },
    processedRows() {
      // Trim the data for pagination
      if (this.offset && this.dtProps.limit) {
        return this.collection.slice(this.offset, this.offset + this.dtProps.limit)
      }
      return this.collection
    },
  },
  watch: {
    configuration: {
      immediate: true,
      deep: true,
      handler(newVal) {
        // Merge defaults with passed-in property
        this.dtProps = merge({}, DT_PROPS, newVal.TRList.properties)
      },
    },
  },
  created() {
    this.onLoad()
  },
  methods: {
    getFieldValue,
    onPage(event) {
      this.offset = event.first
      this.dtProps.limit = event.rows
      trBus.emit(`TRList:page:${this.name}`, { offset: this.offset, limit: this.dtProps.limit })
    },
    onLoad() {
      trBus.emit(`TRList:load:${this.name}`)
    },
    onReload() {
      trBus.emit(`TRList:reload:${this.name}`)
    },
    onRowSelect(event) {
      // Existing data or empty object
      this.dialogHeader = 'New item'
      this.selectedRow = {}
      if (event.data) {
        this.dialogHeader = 'Edit item'
        this.selectedRow = event.data
      }
      trBus.emit(`TRList:rowSelect:${this.name}`, this.selectedRow)
      this.dialogVisible = true
    },
  },
}
</script>

<style scoped></style>
