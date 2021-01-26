<template>
  <div>
    <TabView>
      <TabPanel
        v-for="(conf, key) in configuration"
        :key="key"
        :header="key"
      >
        <ListTable
          :configuration="conf"
          :name="key"
          v-on="events"
        />
      </TabPanel>
    </TabView>
  </div>
</template>

<script>
import TabPanel from 'primevue/tabpanel'
import TabView from 'primevue/tabview'

export default {
  name: 'RootPage',
  components: {
    TabPanel: TabPanel,
    TabView: TabView,
  },
  props: {
    configuration: {
      type: Object,
      default: () => ({}),
    },
    events: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
