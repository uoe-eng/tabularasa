<template>
  <div>
    <TabView v-model:activeIndex="activeTab">
      <TabPanel
        v-for="(conf, key) in configuration"
        :key="key"
        :header="key"
      >
        <SLDList
          :configuration="conf"
          :name="key"
          :collection="collections[key]"
        />
      </TabPanel>
    </TabView>
  </div>
</template>

<script>
import TabPanel from 'primevue/tabpanel'
import TabView from 'primevue/tabview'

export default {
  name: 'SLDRoot',
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
}
</script>
