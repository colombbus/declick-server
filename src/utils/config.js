import yaml from 'js-yaml'

export function parseConfig (raw, context) {
  return yaml.load(raw, {schema: getSchema(context)})
}

function getSchema (context) {
  return yaml.Schema.create(yaml.DEFAULT_FULL_SCHEMA, [
    makeTagHandler('!context', term => context[term]),
    makeTagHandler('!regexp', parseRegex),
    makeTagHandler('!type', parseType)
  ])
}

function makeTagHandler (tag, parse) {
  return new yaml.Type(tag, {kind: 'scalar', construct: parse})
}

function parseRegex (term) {
  const [expr, modifiers] = term.startsWith('/')
    ? [term.split('/').slice(1, -1).join('/'), term.split('/').pop()]
    : [term, '']
  return new RegExp(expr, modifiers)
}

function parseType (term) {
  switch (term) {
    case 'Boolean': return Boolean
    case 'Number': return Number
    case 'String': return String
  }
}
