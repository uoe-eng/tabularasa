# Usage

In a Vue app `src/main.js`:

```
import Vue from 'vue'
import * as sld from 'sld'

// Calls the install() function of this plugin, registering components
Vue.use(sld)

new Vue({ ... })
```

Once the plugin is registered, all components will be available globally automatically:

_src/App.vue_

```
<template>
  <div>
    <DummyComponent />
  </div>
</template>
```
