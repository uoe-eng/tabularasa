import { computed } from 'vue'
import { getFieldValue } from '../helpers'

export default () => {
  let useProps = {
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
    properties: {
      type: Object,
      default: () => ({}),
    },
  }

  const commonBaseMethods = (props) => {
    let displayValue = computed(() => {
      return getFieldValue(props.item, props.field)
    })
    let inputValue = getFieldValue(props.item, props.field)
    return { displayValue, inputValue }
  }

  return { useProps, commonBaseMethods }
}
