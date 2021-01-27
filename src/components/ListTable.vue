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
          <div>{{ fieldDisplay(slotProps) }}</div>
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
          @click="$emit('sld:reload')"
        >
          <i class="icon pi pi-replay" />
        </button>
      </template>
    </DataTable>
    <Dialog
      :visible.sync="dialogVisible"
      :content-style="{overflow: 'visible'}"
      :header="dialogHeader"
    >
      <DetailCard
        :configuration="configuration.DetailCard"
        :item="selectedRow"
        :data-type="name"
        @sld:save="dialogVisible = false"
      />
    </Dialog>
  </div>
</template>

<script>
import merge from 'lodash.merge'
import { fieldDisplay } from '@/helpers'

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
  name: 'ListTable',
  components: {
    Column: () => import(/* webpackPrefetch: true */ 'primevue/column'),
    DataTable: () => import(/* webpackPrefetch: true */ 'primevue/datatable'),
    Dialog: () => import(/* webpackPrefetch: true */ 'primevue/dialog'),
  },
  props: {
    configuration: {
      type: Object,
      default: () => ({}),
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
    // Merge defaults with passed-in property
    let dtProps = merge({}, DT_PROPS, this.configuration.ListTable.props)
    return {
      dtProps: dtProps,
      dialogHeader: '',
      dialogVisible: false,
      filter: {},
      offset: 0,
      limit: dtProps.pageLimit,
      // Data object for the selected row
      selectedRow: undefined,
    }
  },
  computed: {
    columns() {
      // Get column metadata from collections
      return this.configuration.ListTable.fields
    },
    processedRows() {
      let collection = this.collection
      // Trim the data for pagination
      if (this.offset && this.limit) {
        collection = collection.slice(this.offset, this.offset + this.limit)
      }
      return collection
    },
  },
  created() {},
  methods: {
    fieldDisplay,
    onPage(event) {
      this.offset = event.first
      this.limit = event.rows
      this.$emit('sld:page', { offset: this.offset, limit: this.limit })
    },
    onRowSelect(event) {
      // Existing data or empty object
      this.dialogHeader = 'New item'
      this.selectedRow = {}
      if (event.data) {
        this.dialogHeader = 'Edit item'
        this.selectedRow = event.data
      }
      this.$emit('sld:row-select', this.selectedRow)
      this.dialogVisible = true
    },
  },
}
</script>

<style scoped></style>
