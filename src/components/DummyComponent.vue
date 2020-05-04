<template>
  <div>
    <h1>Button</h1>
    <button @click="increment">
      {{ text }}
    </button>
    <InputText />
  </div>
</template>

<script>
export default {
  name: 'DummyComponent',
  components: {
    InputText: () => import(/* webpackPrefetch: true */ 'primevue/inputtext'),
  },
  data() {
    return {
      count: 0,
    }
  },
  computed: {
    times() {
      return this.count > 1 ? 'times' : 'time'
    },
    text() {
      return `I have been clicked ${this.count} ${this.times}`
    },
  },
  mounted() {
    console.log('Mounted')
  },
  methods: {
    increment() {
      this.count += 1
    },
  },
}
</script>
