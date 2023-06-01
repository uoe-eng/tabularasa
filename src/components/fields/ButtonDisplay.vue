<template>
  <div>
    <pvButton :id="'button' + fieldValue" :label="fieldValue" v-bind="properties" @click="onClick" />
  </div>
</template>

<script>
import { computed } from 'vue'
import pvButton from 'primevue/button'
import fieldBase from '../fieldBase.js'
import { trBus } from '@/index'

let { useProps, fieldBaseValue } = fieldBase()
export default {
  components: { pvButton },
  props: useProps,
  emits: ['click'],
  setup(useProps) {
    let fieldValue = computed(() => fieldBaseValue(useProps))
    const onClick = () => {
      trBus.emit(`Field:ButtonDisplay`, [useProps, fieldValue.value])
    }
    return { fieldValue, onClick }
  },
}
</script>
