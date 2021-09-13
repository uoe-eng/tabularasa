<template>
  <div>
    <TabView v-model:activeIndex="activeTab">
      <TabPanel
        v-for="(conf, key) in configuration"
        :key="key"
        :header="key"
      >
        <TRList
          :configuration="conf"
          :name="key"
          :collection="collections[key]"
        />
      </TabPanel>
    </TabView>
  </div>
</template>

<script setup>
import { defineProps, ref, watch } from 'vue'
import { trBus } from '@/index'
import TabPanel from 'primevue/tabpanel'
import TabView from 'primevue/tabview'

let props = defineProps({
  configuration: {
    type: Object,
    required: true,
  },
  collections: {
    type: Object,
    default: () => ({}),
  },
})

let activeTab = ref(0)

watch(
  activeTab,
  (newTab) => {
    trBus.emit(`TRRoot:activeTab`, Object.keys(props.configuration)[newTab])
  },
  { immediate: true }
)
</script>
