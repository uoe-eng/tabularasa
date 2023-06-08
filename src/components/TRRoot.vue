<template>
  <div>
    <TabView v-model:activeIndex="activeTab">
      <TabPanel v-for="(conf, key) in configuration.TRRoot" :key="key" :header="key">
        <TRList
          :configuration="conf.list"
          :name="conf.list.name || key"
          :collection="collections[conf.list.name || key]"
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

defineProps({
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
  () => {
    trBus.emit(`TRRoot:activeTab`, activeTab.value)
  },
  { immediate: true }
)
</script>
