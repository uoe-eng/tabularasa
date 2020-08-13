<template>
  <div id="app">
    <h1>Test app</h1>
    <RootPage
      :configuration="config"
      :events="events"
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
      // An object mapping event names to functions, which will be added to ListTable as a v-on object
      events: {
        'sld:page': this.sldPage,
        'sld:reload': this.sldReload,
        'sld:row-select': this.sldRow,
      },
    }
  },
  created() {
    console.log('Created')
    // Populate collectedData
    this.collectedData = fakeData(ROWCOUNT)
    // Update the data and totalRecords values for each ListTable instance
    for (let [type, conf] of Object.entries(this.config)) {
      conf.ListTable.properties.value = this.collectedData[type]
      conf.ListTable.properties.totalRecords = ROWCOUNT
    }
  },
  methods: {
    sldPage(event) {
      console.log('sldPage', event)
    },
    sldReload() {
      console.log('sldReload')
      // Repopulate with fresh fakeData
      this.collectedData = fakeData(this.totalRows)
    },
    sldRow(event) {
      console.log('sldRow', event)
    },
  },
}
</script>

<style></style>
