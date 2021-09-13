import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import store from './store'
import App from './App.vue'

// Display fields
import BooleanDisplay from '@/components/fields/BooleanDisplay'
import ChipsDisplay from '@/components/fields/ChipsDisplay'
// Input fields
import AutocompleteInput from '@/components/fields/AutocompleteInput'
import BooleanInput from '@/components/fields/BooleanInput'
import DateInput from '@/components/fields/DateInput'
import NumberInput from '@/components/fields/NumberInput'
import TextInput from '@/components/fields/TextInput'
import TextareaInput from '@/components/fields/TextareaInput'

// Relative path to 'root' of tr repo
import * as tr from '../../src/index.js'

const app = createApp(App)
app.use(store)
app.use(PrimeVue)
app.component('BooleanDisplay', BooleanDisplay)
app.component('ChipsDisplay', ChipsDisplay)
app.component('AutocompleteInput', AutocompleteInput)
app.component('BooleanInput', BooleanInput)
app.component('DateInput', DateInput)
app.component('NumberInput', NumberInput)
app.component('TextInput', TextInput)
app.component('TextareaInput', TextareaInput)
app.provide('trBus', tr.trBus)
app.use(tr)

app.mount('#app')
