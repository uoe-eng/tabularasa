<template>
  <div id="app">
    <h1>Test app</h1>
    <div
      v-for="(coln, key) in collections"
      :key="key"
    >
      <h2>{{ coln.name }}</h2>
      <ListTable
        :collections="collections"
        :rows="collectedData[key]"
        :total-rows="totalRows"
        :type="key"
        @sld:page="sldPage($event)"
        @sld:reload="sldReload()"
        @sld:row-select="sldRow($event)"
      />
    </div>
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
