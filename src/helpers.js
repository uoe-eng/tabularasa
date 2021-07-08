import get from 'lodash/get'

const recurseField = (data, keys) => {
  let arr = []
  // Local copy of keys
  let myKeys = [...keys]
  // Check for 'child' keys and recurse
  if (myKeys.length) {
    let k = myKeys.shift()
    for (let item of get(data, k, [])) {
      // Flatten returned array
      arr.push(...recurseField(item, myKeys))
    }
  } else {
    // No child keys, data contains the 'end' object
    arr.push(data)
  }
  return arr
}

const fieldDisplay = (data, key) => {
  //special handling of the field specified in the Schema
  // array-notation (e.g. blog[].title) - TOMANY relationship
  // We must return an array of objects
  if (key.includes('[].')) {
    let newKey = []
    newKey = key.split('[].')
    // Drop the final property
    newKey.pop()
    return recurseField(data, newKey)
  }
  // dot-notation (e.g. author.email) - TOONE relationship
  // Use _.get to handle x.y.z field nested prop notation
  return get(data, key)
}

export { fieldDisplay }
