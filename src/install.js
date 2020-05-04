// This module is called by Vue when used as a plugin.

import * as components from './components'

// Register all components with Vue
const install = (Vue, options = {}) => {
  for (let key in components) {
    let _key = options.prefix ? options.prefix + key : key
    Vue.component(_key, components[key])
  }
}

// auto install if Vue has been added to the global scope
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export { install }
