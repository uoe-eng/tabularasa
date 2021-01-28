import Vue from 'vue'
import App from './App.vue'

// Relative path to 'root' of sld repo
import * as sld from '../../src/index.js'

Vue.config.productionTip = false

Vue.use(sld)
Vue.prototype.$sldbus = sld.bus

new Vue({
  render: (h) => h(App),
}).$mount('#app')
