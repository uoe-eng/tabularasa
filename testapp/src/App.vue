<template>
  <div id="app">
    <h1>Tabularasa - Test app</h1>
    <button @click="addRow">
      Add a person
    </button>
    <TRRoot
      :configuration="conf"
      :collections="collections"
    />
  </div>
</template>

<script>
import { computed, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import config from './config'
import { fakeData } from './fakedata'

export default {
  name: 'App',
  setup() {
    const store = useStore()
    let conf = reactive(config(store))
    let items = {}

    const collections = computed(() => {
      return store.getters.getCollections
    })

    // Update totalRecords count if collections changes
    watch(
      collections,
      () => {
        for (let key of Object.keys(conf)) {
          if (!('properties' in conf[key].TRList)) {
            conf[key].TRList.properties = {}
          }
          conf[key].TRList.properties.totalRecords = store.getters.itemCount(key)
        }
      },
      { immediate: true }
    )

    return { conf, items, collections }
  },
  created() {
    // Register callbacks for tr events
    this.$trBus.on('*', this.event)
    this.$trBus.on('reload', this.trReload)
    this.$trBus.on('update', this.trUpdate)
    this.$trBus.on('save', this.trSave)
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
      console.log('trPage', collection, event)
    },
    reload(collection) {
      console.log('trReload', collection)
      // Repopulate with fresh fakeData
      this.$store.commit('save', fakeData())
    },
    rowSelect(collection, event) {
      console.log('trRow', collection, event)
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
