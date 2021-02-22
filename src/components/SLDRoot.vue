<template>
  <div>
    <TabView>
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
export default {
  name: 'SLDRoot',
  components: {
    TabPanel: () => import(/* webpackPrefetch: true */ 'primevue/tabpanel'),
    TabView: () => import(/* webpackPrefetch: true */ 'primevue/tabview'),
  },
  props: {
    configuration: {
      type: Object,
      default: () => ({}),
    },
    collections: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
