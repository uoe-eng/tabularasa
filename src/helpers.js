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

const prepData = (data, key) => {
  // Prep keys from field schema and recurse over data
  let keys = key.split('.')
  let lastProp = keys.pop()
  let recurse = recurseData(data, keys, true)
  return [recurse, lastProp]
}

const getFieldIterable = (data, key) => {
  // Return an iterator and the key to pick out of each element
  let result = prepData(data, key)
  if (!TYPERE.test(key)) {
    // Flatten single-item results
    result[0] = result[0][0]
  }
  return result
}

const getFieldValue = (data, key) => {
  // Return just the field value
  if (TYPERE.test(key)) {
    // Field implies iterables - probably using a component that doesn't support them
    console.error(`Field schema: ${key} contains [] or {} - expected a non-nested key.`)
    return ''
  }
  let [recurse, lastProp] = prepData(data, key)
  return recurse[0][lastProp]
}

export { getFieldIterable, getFieldValue, TYPERE }
