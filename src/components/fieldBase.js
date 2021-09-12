import { computed, ref, toRefs, watch } from 'vue'
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

  const fieldBaseMethods = (props) => {
    // v-model bound version (for input widgets)
    let inputValue

    // Read-only version (for diplay widgets)
    let displayValue = computed(() => {
      return getFieldValue(props.item, props.field)
    })

    let { item, field } = toRefs(props)
    // Update inputValue if either of item or field props changes
    watch(
      [item, field],
      ([newItem, newField]) => {
        inputValue = ref(getFieldValue(newItem, newField))
      },
      { immediate: true }
    )

    return { displayValue, inputValue }
  }

  return { useProps, fieldBaseMethods }
}
