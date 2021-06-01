import get from 'lodash/get'

// const getField = (field) => {
//   // Undef/null will cause a gap in the table - use empty string instead
//   if (field === null) {
//     field = ''
//   } else if (typeof field === 'object') {
//     // FIXME: Handle M2M rels properly!
//     // field = JSON.stringify(Object.keys(field))
//     return field
//   }
//   return field
// }

const fieldDisplay = (data, key) => {
  //special handling of the field specified in the Schema
  // colon-notation (e.g. blog:title) - TOMANY relationship
  // We must return an array of objects
  if (key.includes(':')) {
    let field = key.split(':')[0]
    return Object.values(data[field])
  }

  // dot-notation (e.g. author.email) - TOONE relationship
  // Use _.get to handle x.y.z field nested prop notation
  return get(data, key)
}

export { fieldDisplay }
