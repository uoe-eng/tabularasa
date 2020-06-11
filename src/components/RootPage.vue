<template>
  <div>
    <TabView>
      <TabPanel
        v-for="(coln, key) in collections"
        :key="key"
        :header="key"
      >
        <ListTable
          :collections="collections[key]"
          :configuration="getConfig(key)"
          :name="key"
          :rows="rows[key]"
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
    collections: {
      type: Object,
      default: () => ({}),
    },
    events: {
      type: Object,
      default: () => ({}),
    },
    rows: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    getConfig(key) {
      if (this.configuration && Object.prototype.hasOwnProperty.call(this.configuration, key)) {
        return this.configuration[this.type]
      }
      return {}
    },
  },
}
</script>
