<template>
  <div>
    <TabView>
      <TabPanel
        v-for="(conf, key) in configuration"
        :key="key"
        :header="key"
      >
        <ListTable
          :configuration="conf.ListTable"
          :name="key"
          v-on="events"
        />
      </TabPanel>
    </TabView>
  </div>
</template>

<script>
export default {
  name: 'RootPage',
  components: {
    TabPanel: () => import(/* webpackPrefetch: true */ 'primevue/tabpanel'),
    TabView: () => import(/* webpackPrefetch: true */ 'primevue/tabview'),
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
