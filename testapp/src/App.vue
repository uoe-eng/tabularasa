<template>
  <div id="app">
    <h1>Test app</h1>
    <RootPage
      :configuration="config"
      :collections="collections"
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
      items: {},
      // An object mapping event names to functions, which will be added to ListTable as a v-on object
      events: {
        'sld:page': this.sldPage,
        'sld:reload': this.sldReload,
        'sld:row-select': this.sldRow,
      },
    }
  },
  created() {
    // Populate collectedData
    this.collections = fakeData(ROWCOUNT)
    // Update the data and totalRecords values for each ListTable instance
    for (let conf of Object.values(this.config)) {
      conf.ListTable.props.totalRecords = ROWCOUNT
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
