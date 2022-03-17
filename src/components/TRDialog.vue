<template>
  <div :id="'TRDialog-' + name">
    <Dialog
      v-model:visible="dialogVisible"
      :maximizable="true"
      :header="header"
      v-bind="properties"
    >
      <TRDetail
        :configuration="configuration.TRDetail"
        :item="item"
        :name="name"
        @close="dialogVisible = false"
      />
    </Dialog>
  </div>
</template>

<script setup>
import { defineProps, ref, toRefs, watch } from 'vue'
// import { trBus } from '@/index'
import Dialog from 'primevue/dialog'

let props = defineProps({
  configuration: {
    type: Object,
    required: true,
  },
  collection: {
    type: Array,
    default: () => [],
  },
  // Header for Dialog window
  header: {
    type: String,
    default: '',
  },
  // Item Data
  item: {
    type: Object,
    default: () => ({}),
  },
  // Collection name
  name: {
    type: String,
    default: '',
  },
  properties: {
    type: Object,
    default: () => ({}),
  },
  visible: {
    type: Boolean,
    default: false,
  },
})

let dialogVisible = ref(false)
let { visible } = toRefs(props)

watch(visible, () => {
  // Display the dialog on any update to visible prop
  // Close button or escape will set it to false again
  dialogVisible.value = true
})
</script>

<style>
.p-dialog {
  /* Set dialog 'initial' width */
  height: 60%;
  width: 60%;
  border: 5px solid #aaaaaa;
}

.p-dialog-content {
  height: 100%;
  width: 100%;
  overflow-y: auto;
}
</style>
