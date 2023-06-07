<template>
  <div id="app">
    <h1>Tabularasa - Test app</h1>
    <button @click="showConfig">Show Configuration (new Tab)</button>
    <button @click="showCollections">Log Data (console)</button>
    <button @click="addRow">Add a New Person</button>
    <TRRoot :configuration="conf" :collections="collections" />
  </div>
</template>

<script setup>
import { computed, inject, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import config from './config'
import { fakeData } from './fakedata'

const trBus = inject('trBus')

const store = useStore()
let conf = reactive(config(store))

const collections = computed(() => {
  return store.getters.getCollections
})

const eventMethods = {
  addRow: () => {
    // Test that updating the store is reactive
    // Table data should update, as should totalRecords/pagination count
    console.log('addRow')
    store.commit('save', {
      people: {
        100: {
          id: 100,
          last_name: 'XXXXX',   // eslint-disable-line
          email: 'none@example.com',
        },
      },
    })
    console.log('NEWSTATE', store.state)
  },
  reload: (collection) => {
    // Repopulate with fresh fakeData
    console.log('trReload', collection)
    store.commit('save', fakeData())
  },
  save: (collection, [oldObj, newObj]) => {
    // Update 'db' after detail change
    console.log('SAVE', collection, oldObj, newObj)
    let id = newObj['id'] || oldObj['id']
    let newData = {
      [collection]: {
        [id]: newObj,
      },
    }
    store.commit('save', newData)
  },
}

const event = (label, event) => {
  // Split a wildcard captured event into it's parts
  console.log('EVENT', label, event)
  let component = ''
  let collection = ''
  ;[component, label, collection] = label.split(':') // eslint-disable-line no-unused-vars
  // Look for an 'event' method with the same name as the event label, and call it.
  if (eventMethods[label]) {
    eventMethods[label](collection, event)
  }
}

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

// Register callbacks for tr events
trBus.on('*', event)
</script>

<style></style>
