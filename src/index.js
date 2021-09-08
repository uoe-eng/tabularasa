// FIXME: Make theme a customisable option
import 'primevue/resources/themes/nova-vue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import mitt from 'mitt'
import { install } from '@/install'

// Set up an event bus
const trBus = mitt()

export { trBus, install }
