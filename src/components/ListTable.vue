<template>
  <div :id="'listtable-' + name">
    <DataTable
      :value="processedRows"
      :class="'listtable-' + name"
      :total-records="totalRows"
      v-bind="config.DataTable"
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
// Default config values
const CONFIG = {
  // Define properties to be passed 'direct' to DataTable
  DataTable: {
    autoLayout: true,
    lazy: true,
    paginator: true,
    paginatorPosition: 'both',
    rows: 20,
    selectionMode: 'single',
  },
}

export default {
  name: 'ListTable',
  components: {
    Column: () => import(/* webpackPrefetch: true */ 'primevue/column'),
    DataTable: () => import(/* webpackPrefetch: true */ 'primevue/datatable'),
  },
  props: {
    configuration: {
      type: Object,
      default: () => {},
    },
    // Collection schema data
    collections: {
      type: Object,
      default: () => {},
    },
    // Collection name
    name: {
      type: String,
      default: '',
    },
    // Collection data
    rows: {
      type: Array,
      default: () => [],
    },
    /* eslint-disable-next-line vue/require-default-prop */
    totalRows: {
      type: Number,
      // Defaults to DataTable's 'value' prop
      required: false,
    },
  },
  data() {
    // Merge defaults with passed-in property
    let config = Object.assign({}, CONFIG, this.configuration)
    return {
      config: config,
      filter: {},
      offset: 0,
      limit: config.pageLimit,
      // Data object for the selected row
      selectedRow: undefined,
    }
  },
  computed: {
    columns() {
      // Get column metadata from collections
      return this.collections.columns
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
      // Undef/null will cause a gap in the table - use empty string instead
      let field = ''
      if (field != null) {
        field = slotProps.data[slotProps.column.field]
      }
      return field
    },
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
      // FIXME: Launch detail dialog/overlay etc here
    },
  },
}
</script>

<style scoped></style>
