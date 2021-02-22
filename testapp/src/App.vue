<template>
  <div id="app">
    <h1>Test app</h1>
    <SLDRoot
      :configuration="config"
      :collections="collections"
    />
  </div>
</template>

<script>
import config from './config'
import fakeData from './fakedata'

// the number of rows of fakeData to generate
const ROWCOUNT = 100

export default {
  name: 'App',
  data() {
    return {
      config: config,
      items: {},
      // An object mapping event names to functions, which will be added to SLDList as a v-on object
    }
  },
  created() {
    // Populate collectedData
    this.collections = fakeData(ROWCOUNT)
    // Update the data and totalRecords values for each SLDList instance
    for (let conf of Object.values(this.config)) {
      conf.SLDList.props.totalRecords = ROWCOUNT
    }

    // Register callbacks for sld events
    this.$sldbus.on('*', this.event)
    this.$sldbus.on('reload', this.sldReload)
    this.$sldbus.on('save', this.sldSave)
  },
  methods: {
    event(label, event) {
      // Split a wildcard captured event into it's parts
      let collection = ''
      if (label.includes(':')) {
        ;[collection, label] = label.split(':')
      }
      // Look for a method with the same name as the event label, and call it.
      if (label in this) {
        this[label](collection, event)
      }
    },
    page(collection, event) {
      console.log('sldPage', collection, event)
    },
    reload(collection) {
      console.log('sldReload', collection)
      // Repopulate with fresh fakeData
      this.collectedData = fakeData(this.totalRows)
    },
    rowSelect(collection, event) {
      console.log('sldRow', collection, event)
    },
    save(collection, [oldObj, newObj]) {
      console.log('SAVE', collection, oldObj, newObj)
    },
  },
}
</script>

<style></style>
