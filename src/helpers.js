// Helper functions to use a field string to walk nested data
// and return appropriate data, labels etc.
//
// Components expect to be handed an object, and a property to display from that object.
//
// Field string: nested fields are separated by a '.'
// A suffix of {} indicates an onbject to be iterated over
// A suffix of [] indicates an array to be iterated over
//
// Examples:
// to-one relationship: author.last_name
// to-many relationship: blog[].title - for each blog, display its title property

// Regular expression that matches '{}' or '[]'
// A group-match in a split regex returns the match(es) in the array
const TYPERE = /([{[][}\]])/

const recurseData = (data, keys) => {
  // Walk and flatten the data object using keys as a guide
  let arr = []
  // Check we still have keys to walk
  if (keys.length) {
    let type
    let [key, ...myKeys] = keys
    ;[key, type] = key.split(TYPERE)
    if (type === '{}') {
      // Iterate over an object
      for (let item of Object.values(data[key] || {})) {
        arr.push(...recurseData(item, myKeys))
      }
    } else if (type === '[]') {
      // Iterate over an array
      for (let item of data[key] || []) {
        arr.push(...recurseData(item, myKeys))
      }
    } else {
      // Just get the property
      arr.push(...recurseData(data[key], myKeys))
    }
  } else {
    // No more keys to walk, start returning data
    arr.push(data)
  }
  return arr
}

const getField = (data, key) => {
  let keys = key.split('.')
  let lastProp = keys.pop()
  let recurse = recurseData(data, keys, true)
  if (TYPERE.test(key)) {
    // field contains iterables - return the array of objects, and the field_name 'in' each object
    return [recurse, lastProp] // .map((x) => x[lastProp])
  } else {
    //No iterables - just return a single value
    return recurse[0][lastProp]
  }
}

export { getField, TYPERE }
