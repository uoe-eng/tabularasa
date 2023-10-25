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
      <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.label" v-bind="col.properties">
        <template v-if="col.field in filters" #filter="{ filterModel, filterCallback }">
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
          <div v-else v-on="col.events || {}">
            {{ getFieldValue(slotProps.data, slotProps.column.key) }}
          </div>
        </template>
      </Column>
      <template #paginatorstart>
        <div class="trlist-paginator">
          <button type="submit" @click="onReload">
            <i class="icon pi pi-replay" />
          </button>
          <button v-if="newButton" :id="'newButton_' + name" type="submit" @click="onRowSelect">New</button>
        </div>
      </template>
      <template #paginatorend>
        <div class="trlist-paginator">
          <span v-if="dtProps.globalFilterFields" class="p-input-icon-right">
            <i class="pi pi-times clear-button" @click="onClearGlobalFilter(dtProps.globalFilterFields[0])" />
            <InputText
              v-model="filters[dtProps.globalFilterFields[0]].constraints[0].value"
              placeholder="Quick search..."
              size="small"
              @keydown.enter="onLazy('filter', { filters: filters })"
            />
          </span>
          <button type="submit" @click="onClearFilters">
            <i class="icon pi pi-filter-slash" />
          </button>
        </div>
      </template>
    </DataTable>
    <TRDialog
      v-if="configuration.TRDetail"
      :header="dialogHeader"
      :configuration="dialogConfig"
      :visible="dialogVisible"
      v-bind="dialogConfig.TRDetail"
      :item="selectedRow"
      :name="dialogName"
      :dirty="dirty"
    />
  </div>
</template>

<script setup>
import { computed, defineProps, ref, toRefs, watch } from 'vue'
import { trBus } from '@/index'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import merge from 'lodash/merge'
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
let dialogConfig = ref(props.configuration)
let dialogName = ref(props.name)
let dialogHeader = ref('')
let dialogVisible = ref(false)
let dirty = ref(false)
// Use ref, not reactive, as we replace the whole object, rather than modify its properties
let dtProps = ref({})
let selectedRow = ref({})
let rowIndex = ref()
let filters = ref({})

const columns = computed(() => {
  // Get column metadata from collections
  return props.configuration.TRList.fields
})

const onClearGlobalFilter = (field) => {
  let val = filters.value[field].constraints[0]
  if (val.value) {
    val.value = ''
    onLazy('filter', { filters: filters.value })
  }
}

const onClearFilters = () => {
  // Remove all values from all filters
  for (let filt of Object.values(filters.value)) {
    for (let constraint of filt['constraints']) {
      if ('value' in constraint) {
        delete constraint.value
      }
    }
  }
  onLazy('filter', { filters: filters.value })
}

const onLazy = (type, event) => {
  dtProps.value.limit = event.rows
  trBus.emit(`TRList:${type}:${props.name}`, event)
}

const onReload = () => {
  trBus.emit(`TRList:reload:${props.name}`, { filters: filters.value })
}

const onRefresh = () => {
  // Create a new object with a new reference, or it won't be reactive if underlying data is unchanged
  selectedRow.value = Object.assign({}, collection.value[rowIndex.value])
}

const onRowSelect = (event) => {
  if (event.data) {
    // Editing existing row
    dialogConfig.value = props.configuration
    dialogName.value = props.name
    dialogHeader.value = `Edit: ${dialogName.value}`
    selectedRow.value = event.data
    // Preserve the rowIndex so we can access the item data in onRefresh
    rowIndex.value = event.index
  } else {
    // New button
    selectedRow.value = newButton.value.value || {}
    // If values in new record, flag as dirty for TRDetail to use them when saving
    if (Object.keys(selectedRow.value).length > 0) {
      dirty.value = true
    }
    dialogConfig.value = newButton.value.config || props.configuration
    dialogName.value = newButton.value.name || props.name
    dialogHeader.value = `New: ${dialogName.value}`
  }
  trBus.emit(`TRList:rowSelect:${dialogName.value}`, selectedRow.value)
  // Updating the prop value will open dialog (actual boolean value is irrelevant)
  dialogVisible.value = !dialogVisible.value
}

// Listen for detail card refresh events
trBus.on('*', (type) => {
  if (type.startsWith('TRDetail:refresh')) {
    onRefresh()
  }
})

// Use computed properties to avoid errors trying to watch optional/undefined objects props
const confTRDetail = computed(() => props.configuration.TRDetail)
const confFilters = computed(() => props.configuration.TRList.filters)
const newButton = computed(() => {
  // newButton defined but Falsey disables button
  if ('newButton' in props.configuration.TRList) {
    if (props.configuration.TRList.newButton) {
      return props.configuration.TRList.newButton
    } else {
      return false
    }
  }
  return true
})

watch(
  confTRDetail,
  (newDetail) => {
    if (newDetail) {
      // Enable row selection if TRDetail defined
      DT_PROPS.selectionMode = 'single'
    }
  },
  {
    immediate: true,
  }
)

watch(
  confFilters,
  (newFilters) => {
    if (newFilters) {
      // Enable filtering in UI
      DT_PROPS.filterDisplay = 'menu'
      filters.value = newFilters
    }
  },
  {
    immediate: true,
  }
)

watch(
  props.configuration.TRList.properties,
  (newProps) => {
    if (newProps) {
      // Merge defaults with passed-in properties
      dtProps.value = merge(dtProps.value, DT_PROPS, newProps)
    }
  },
  {
    immediate: true,
  }
)

trBus.emit(`TRList:load:${props.name}`)
</script>

<style>
.trlist-paginator {
  padding: 5px;
}

.clear-button {
  cursor: pointer;
}
</style>
