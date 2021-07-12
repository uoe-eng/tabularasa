//import get from 'lodash/get'

// Regular expression that matches '{}' or '[]'
const TYPERE = /([{[][}\]])/

const recurseField = (data, keys) => {
  // Walk the data object using keys as a guide
  let arr = []
  // Keep a 'local' copy of keys
  let myKeys = [...keys]
  // Check we still have keys to walk
  if (myKeys.length) {
    // Split on '{}' or '[]'
    // A group-match in a split regex returns the match(es) in the array
    let [key, type] = myKeys.shift().split(TYPERE)
    if (type === '{}') {
      // Iterate over an object
      for (let item of Object.values(data[key] || {})) {
        arr.push(...recurseField(item, myKeys))
      }
    } else if (type === '[]') {
      // Iterate over an array
      for (let item of data[key] || []) {
        arr.push(...recurseField(item, myKeys))
      }
    } else {
      // Just get the property
      arr.push(...recurseField(data[key], myKeys))
    }
  } else {
    // No more keys to walk, start returning data
    arr.push(data)
  }
  return arr
}

const fieldDisplay = (data, key) => {
  //special handling of the field specified in the Schema
  // Field are separated by a '.'
  // A suffix of {} indicates an onbject to be iterated over
  // A suffix of [] indicates an array to be iterated over
  // For example blog[].title - TOMANY relationship 0 many blogs, display their title field
  let keys = key.split('.')
  let lastProp = keys.pop()
  let recurse = recurseField(data, keys, true)
  if (TYPERE.test(key)) {
    // field contains iterables - return an array of the values
    return recurse.map((x) => x[lastProp])
  } else {
    //No iterables - just return a single value
    return recurse[0][lastProp]
  }
}

export { fieldDisplay }
