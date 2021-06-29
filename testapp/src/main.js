import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import store from './store'
import App from './App.vue'

// Relative path to 'root' of sld repo
import * as sld from '../../src/index.js'

const app = createApp(App)
app.use(store)
app.use(PrimeVue)
app.config.globalProperties.$sldbus = sld.bus
app.use(sld)

app.mount('#app')
