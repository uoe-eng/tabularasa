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
      collectedData: fakeData(totalRows),
    }
  },
}
</script>

<style></style>
