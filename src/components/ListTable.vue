<template>
  <div :id="'listtable-' + type">
    <DataTable
      :value="processedRows"
      :class="'listtable-' + type"
      :paginator="paginator"
      :paginator-position="paginatorPosition"
      :lazy="true"
      :rows="pageLimit"
      :total-records="totalRecords"
      selection-mode="single"
      @page="onPage($event)"
      @row-select="onRowSelect"
    >
      <Column
        v-for="col of columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
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
  </div>
</template>

<script>
// FIXME: Config from props
const CONFIG = {
  pageLimit: 20,
  paginator: true,
  paginatorPosition: 'both',

}

export default {
  name: 'ListTable',
  components: {
    Column: () => import(/* webpackPrefetch: true */ 'primevue/column'),
    DataTable: () => import(/* webpackPrefetch: true */ 'primevue/datatable'),
  },
  props: {
    // Collection schema data
    collections: {
      type: Object,
      default: () => {},
    },
    // Collection type
    type: {
      type: String,
      default: '',
    },
    rows: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      filter: {},
      offset: 0,
      limit: CONFIG.pageLimit,
      pageLimit: CONFIG.pageLimit,
      paginator: CONFIG.paginator,
      paginatorPosition: CONFIG.paginatorPosition,
      // Set totalRecords to pageLimit on start, until it updates async
      totalRecords: CONFIG.pageLimit,
      // Data object for the selected row
      selectedRow: undefined,
    }
  },
  computed: {
    columns() {
      // Get column metadata from collections
      return this.collections[this.type].columns
    },
    processedRows() {
      let data = this.rows
      // Trim the data for pagination
      if (this.offset && this.limit) {
        data = this.rows.slice(this.offset, this.offset + this.limit)
      }
      return data
    },
  },
  created() {},
  methods: {
    fieldDisplay(slotProps) {
      return slotProps.data[slotProps.column.field]
    },
    onPage(event) {
      this.offset = event.first
      this.limit = event.rows
      this.getData()
    },
    onRowSelect(event) {
      // Existing data or empty object
      this.dialogHeader = 'New item'
      this.selectedRow = {}
      if (event.data) {
        this.dialogHeader = 'Edit item'
        this.selectedRow = event.data
      }
    },
  },
}
</script>

<style scoped></style>
