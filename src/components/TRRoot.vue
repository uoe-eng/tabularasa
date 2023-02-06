<template>
  <div>
    <TabView v-model:activeIndex="activeTab">
      <TabPanel
        v-for="(conf, key) in listConf"
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
import { defineProps, computed, ref, toRefs, watch } from 'vue'
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

let { configuration } = toRefs(props)

let listConf = computed(() => {
  let lc = {}
  for (let [key, conf] of Object.entries(configuration.value)) {
    if (conf.TRList) {
      lc[key] = conf
    }
  }
  return lc
})

watch(
  [activeTab, listConf],
  ([newTab, newConf]) => {
    // Only send event if config is populated
    if (Object.keys(newConf).length) {
      trBus.emit(`TRRoot:activeTab`, Object.keys(listConf.value)[newTab])
    }
  },
  { immediate: true }
)
</script>
