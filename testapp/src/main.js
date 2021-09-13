import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import store from './store'
import App from './App.vue'

// Relative path to 'root' of tr repo
import * as tr from '../../src/index.js'

const app = createApp(App)
app.use(store)
app.use(PrimeVue)
app.provide('trBus', tr.trBus)
app.use(tr)

app.mount('#app')
