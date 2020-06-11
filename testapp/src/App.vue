<template>
  <div id="app">
    <h1>Test app</h1>
    <RootPage
      :collections="collections"
      :rows="collectedData"
      :total-rows="totalRows"
      :events="events"
    />
  </div>
</template>

<script>
import collections from './collections'
import fakeData from './fakedata'

const totalRows = 100

export default {
  name: 'App',
  data() {
    return {
      collections: collections,
      totalRows: totalRows,
      collectedData: [],
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
    this.collectedData = fakeData(this.totalRows)
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
