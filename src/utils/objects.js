import {toCamelCase, toSnakeCase} from '~/utils/text'

export function keysToCamelCase (object) {
  return mapKeys(object, toCamelCase)
}

export function keysToSnakeCase (object) {
  return mapKeys(object, toSnakeCase)
}

export function mapKeys (object, transform) {
  return Object.entries(object).reduce((result, [key, value]) => {
    result[transform(key)] = value
    return result
  }, {})
}

export function mapProps (object, transform) {
  return Object.entries(object).reduce((result, [key, value]) => {
    result[key] = transform(value)
    return result
  }, {})
}

export function removeDuplicates (array) {
  return array.reduce((result, element) => {
    if (!result.includes(element)) {
      result.push(element)
    }
    return result
  }, [])
}
