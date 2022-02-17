import { ref, toRefs, watch } from 'vue'
import { getFieldIterable, getFieldValue } from '../helpers'

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

  const fieldBaseIterable = (props) => {
    let fieldIter = ref({})
    let { item, field } = toRefs(props)

    // Update data and name if item or field props change
    watch(
      [item, field],
      ([newItem, newField]) => {
        let result = getFieldIterable(newItem, newField)
        fieldIter.value = { data: result[0], name: result[1] }
      },
      { immediate: true }
    )
    return fieldIter
  }

  const fieldBaseValue = (props) => {
    let fieldValue
    let { item, field } = toRefs(props)

    // Update fieldValue if either of item or field props changes
    watch(
      [item, field],
      ([newItem, newField]) => {
        fieldValue = ref(getFieldValue(newItem, newField))
      },
      { immediate: true }
    )
    return { fieldValue }
  }

  return { useProps, fieldBaseIterable, fieldBaseValue }
}
