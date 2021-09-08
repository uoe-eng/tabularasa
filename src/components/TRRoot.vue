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

<script>
import { trBus } from '@/index'
import TabPanel from 'primevue/tabpanel'
import TabView from 'primevue/tabview'

export default {
  name: 'TRRoot',
  components: {
    TabView,
    TabPanel,
  },
  props: {
    configuration: {
      type: Object,
      required: true,
    },
    collections: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      activeTab: 0,
    }
  },
  watch: {
    activeTab: {
      // emit the collection_name 'key' from configuration
      immediate: true,
      handler(newTab) {
        trBus.emit(`TRRoot:activeTab`, Object.keys(this.configuration)[newTab])
      },
    },
  },
}
</script>
