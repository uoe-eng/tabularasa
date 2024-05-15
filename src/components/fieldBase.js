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
    ignored: {
      type: Object,
      default: () => ({}),
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
    name: {
      type: String,
      default: '',
    },
    newItem: {
      type: Object,
      default: () => ({}),
    },
    properties: {
      type: Object,
      default: () => ({}),
    },
    validator: {
      type: [Function, Object],
    },
  }

  const fieldBaseIterable = (props) => {
    let result = getFieldIterable(props.item, props.field)
    return { data: result[0], name: result[1] }
  }

  const fieldBaseValue = (props) => {
    let { item, field } = toRefs(props)
    return getFieldValue(item.value, field.value)
  }

  return { useProps, fieldBaseIterable, fieldBaseValue }
}
