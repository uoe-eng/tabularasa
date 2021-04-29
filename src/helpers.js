import get from 'lodash/get'

const getField = (field) => {
  // Undef/null will cause a gap in the table - use empty string instead
  if (field === null) {
    field = ''
  } else if (typeof field === 'function') {
    // Call the function
    return field()
  } else if (typeof field === 'object') {
    // FIXME: Handle M2M rels properly!
    field = JSON.stringify(Object.keys(field))
  }
  return field
}

const fieldDisplay = (slotProps) => {
  return getField(get(slotProps.data, slotProps.column.key))
}

export { fieldDisplay, getField }
