import { createStore } from 'vuex'
import merge from 'lodash/merge'
import { fakeData } from '../fakedata'

const actions = {}

const getters = {
  itemCount: (state) => (key) => {
    if (key in state) {
      return Object.keys(state[key]).length
    }
  },
  getCollections: (state) => {
    // Convert object-based state into arrays for DataTable
    let collections = {}
    for (let [key, val] of Object.entries(state)) {
      collections[key] = Object.values(val)
    }
    return collections
  },
}

const mutations = {
  save(state, payload) {
    // Merge payload onto state
    // NB: Don't use merge against the whole store in a 'real' app!
    merge(state, payload)
  },
}

export default createStore({
  state: fakeData(),
  actions: actions,
  getters: getters,
  mutations: mutations,
})
