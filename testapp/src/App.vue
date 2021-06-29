<template>
  <div id="app">
    <h1>Test app</h1>
    <button @click="addRow">
      CHANGE
    </button>
    <SLDRoot
      :configuration="config"
      :collections="collections"
    />
  </div>
</template>

<script>
import config from './config'
import { fakeData } from './fakedata'

export default {
  name: 'App',
  data() {
    return {
      config: config,
      items: {},
    }
  },
  computed: {
    collections() {
      return this.$store.getters.tableData
    },
  },
  created() {
    // FIXME: This isn't reactive!
    for (let key of Object.keys(this.config)) {
      this.config[key].SLDList.properties.totalRecords = this.$store.getters.itemCount(key)
    }

    // Register callbacks for sld events
    this.$sldbus.on('*', this.event)
    this.$sldbus.on('reload', this.sldReload)
    this.$sldbus.on('update', this.sldUpdate)
    this.$sldbus.on('save', this.sldSave)
  },
  methods: {
    addRow() {
      // Test that updating the store is reactive
      // Table data should update, as should totalRecords/pagination count
      console.log('addRow')
      this.$store.commit('save', {
        people: {
          100: {
            id: 100,
            last_name: 'XXXXX',   // eslint-disable-line
            email: 'none@example.com',
          },
        },
      })
      console.log('NEWSTATE', this.$store.state)
    },
    event(label, event) {
      // Split a wildcard captured event into it's parts
      let component = ''
      let collection = ''
      ;[component, label, collection] = label.split(':') // eslint-disable-line no-unused-vars
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
      let id = oldObj['id']
      let newData = {
        [collection]: {
          [id]: newObj,
        },
      }
      this.$store.commit('save', newData)
    },
    update(collection, [oldObj, newObj]) {
      console.log('UPDATE', collection, oldObj, newObj)
    },
  },
}
</script>

<style></style>
