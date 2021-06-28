import get from 'lodash/get'

const fieldDisplay = (data, key) => {
  //special handling of the field specified in the Schema
  // colon-notation (e.g. blog:title) - TOMANY relationship
  // We must return an array of objects
  if (key.includes(':')) {
    let field = key.split(':')[0]
    return data[field]
  }

  // dot-notation (e.g. author.email) - TOONE relationship
  // Use _.get to handle x.y.z field nested prop notation
  return get(data, key)
}

export { fieldDisplay }
