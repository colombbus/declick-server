import {mapProps} from '@/utils/objects'

export function makeViewer (config, isList) {
  return async function (context, next) {
    await next()
    context.body = view(context.body, context.user, config, isList)
  }
}

function view (resource, user, config, isList = false) {
  if (!config) {
    return ''
  }
  config = normalizeConfig(config)
  if (isList) {
    return resource.map(sub => viewProps(sub, user, config))
  } else if (typeof resource === 'object') {
    return viewProps(resource, user, config)
  } else if (resource === null) {
    return null
  } else {
    return ''
  }
}

function viewProps (object, user, config) {
  return Object.entries(object).reduce((result, [key, value]) => {
    const rules = config[key]
    if (rules && rules.every(rule => rule(user, object))) {
      result[key] = value
    }
    return result
  }, {})
}

function normalizeConfig (config) {
  return mapProps(config, value => Array.isArray(value) ? value : [value])
}
