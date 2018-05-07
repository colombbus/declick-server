export function __ (...args) {
  return minimizeSpaces(glueTemplate(...args))
}

function glueTemplate ([head, ...tail], ...params) {
  return Object.entries(tail).reduce((result, [i, part]) => {
    return result + params[i] + part
  }, head)
}

export function minimizeSpaces (text) {
  return text.replace(/\s+/g, ' ').trim()
}

export function format (text, params) {
  return Object.keys(params).reduce((result, key) =>
    result.replace(`$${key}`, params[key]), text)
}

export function toCamelCase (text) {
  const [head, ...tail] = text.split('_')
  return head + tail.map(capitalize)
}

export function toSnakeCase (text) {
  let result = ''
  const lowercased = text.toLowerCase()
  for (let i = 0; i < text.length; i++) {
    if (text[i] !== lowercased[i]) {
      result += '_'
    }
    result += lowercased[i]
  }
  return result
}

export function capitalize (text) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}
