import { createApp } from 'vue'
import App from './App.vue'

// Relative path to 'root' of sld repo
import * as sld from '../../src/index.js'

const app = createApp(App)
app.use(sld)
app.mount('#app')
