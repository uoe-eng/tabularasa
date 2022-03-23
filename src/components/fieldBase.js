import { toRefs } from 'vue'
import { getFieldIterable, getFieldValue } from '../helpers'

export default () => {
  let useProps = {
    events: {
      type: Object,
      default: () => ({}),
    },
    field: {
      type: String,
      default: '',
    },
    item: {
      type: Object,
      default: () => ({}),
    },
    label: {
      type: String,
      default: '',
    },
    methods: {
      type: Object,
      default: () => ({}),
    },
    properties: {
      type: Object,
      default: () => ({}),
    },
  }

  const fieldBaseIterable = (props) => {
    let { item, field } = toRefs(props)
    let result = getFieldIterable(item.value, field.value)
    return { data: result[0], name: result[1] }
  }

  const fieldBaseValue = (props) => {
    let { item, field } = toRefs(props)
    return getFieldValue(item.value, field.value)
  }

  return { useProps, fieldBaseIterable, fieldBaseValue }
}
