import { createStore } from 'vuex'
import merge from 'lodash/merge'
import { fakeData } from '../fakedata'

const actions = {}

const getters = {
  itemCount: (state) => (key) => {
    if (key in state) {
      console.log('COUNT', Object.keys(state[key]).length)
      return Object.keys(state[key]).length
    }
  },
  tableData: (state) => {
    // Convert object-based state into arrays for DataTable
    let tableData = {}
    for (let [key, val] of Object.entries(state)) {
      tableData[key] = Object.values(val)
    }
    return tableData
  },
}

const mutations = {
  save(state, payload) {
    // Merge payload onto state
    // NB: Don't use merge against the whole store in production!
    merge(state, payload)
  },
}

export default createStore({
  state: fakeData(100),
  actions: actions,
  getters: getters,
  mutations: mutations,
})
