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
            :is="col.display"
            v-if="col.display"
            :key="slotProps.index"
            :configuration="configuration"
            :item="slotProps.data"
            v-bind="col"
          />
          <span v-else>{{ fieldDisplay(slotProps.data, slotProps.column.key) }}</span>
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
      v-model:visible="dialogVisible"
      :content-style="{overflow: 'visible'}"
      :header="dialogHeader"
    >
      <SLDDetail
        :configuration="configuration.SLDDetail"
        :item="selectedRow"
        :name="name"
        @close="dialogVisible = false"
      />
    </Dialog>
  </div>
</template>

<script>
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import Dialog from 'primevue/dialog'
import merge from 'lodash.merge'
import { fieldDisplay } from '@/helpers'

// FIXME: global import (DRY with SLDDetail)
import BooleanDisplay from '@/components/displays/BooleanDisplay'
import ChipsDisplay from '@/components/displays/ChipsDisplay'

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
  name: 'SLDList',
  components: {
    BooleanDisplay,
    ChipsDisplay,
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
    // Merge defaults with passed-in property
    let dtProps = merge({}, DT_PROPS, this.configuration.SLDList.properties)
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
      return this.configuration.SLDList.fields
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
  created() {
    this.onLoad()
  },
  methods: {
    fieldDisplay,
    onPage(event) {
      this.offset = event.first
      this.limit = event.rows
      this.$sldbus.emit(`SLDList:page:${this.name}`, { offset: this.offset, limit: this.limit })
    },
    onLoad() {
      this.$sldbus.emit(`SLDList:load:${this.name}`)
    },
    onReload() {
      this.$sldbus.emit(`SLDList:reload:${this.name}`)
    },
    onRowSelect(event) {
      // Existing data or empty object
      this.dialogHeader = 'New item'
      this.selectedRow = {}
      if (event.data) {
        this.dialogHeader = 'Edit item'
        this.selectedRow = event.data
      }
      this.$sldbus.emit(`SLDList:rowSelect:${this.name}`, this.selectedRow)
      this.dialogVisible = true
    },
  },
}
</script>

<style scoped></style>
