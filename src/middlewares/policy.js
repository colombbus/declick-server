import ForbiddenException from '@/exceptions/ForbiddenException'
import UnauthorizedException from '@/exceptions/UnauthorizedException'
import {makePropError} from '@/utils/errors'
import {mapProps} from '@/utils/objects'
import {__} from '@/utils/text'

export function makePolicy (config) {
  return async (context, next) => {
    authorize(context.user, context.target, context.request.body, config)
    await next()
  }
}

function authorize (user, target, body, config) {
  config = normalizeConfig(config)
  const areFailingRules = rules => !rules.every(rule => rule(user, target))
  if (areFailingRules(config.global)) {
    denyRequest(user)
  }
  const fieldsConfig = config['by-field']
  const failedKeys = Object.keys(fieldsConfig || []).filter(key =>
    areFailingRules(fieldsConfig[key]))
  if (failedKeys.length > 0) {
    denyProps(failedKeys, user)
  }
}

function normalizeConfig (config) {
  const isShortened = (typeof config === 'function' || Array.isArray(config))
  const expanded = isShortened ? {'global': config} : config
  expanded.global = normalizeRules(expanded.global || (() => false))
  expanded['by-field'] = mapProps(expanded['by-field'] || {}, normalizeRules)
  return expanded
}

function normalizeRules (rules) {
  return Array.isArray(rules) ? rules : [rules]
}

function denyRequest (user) {
  throw user
    ? new ForbiddenException(__`The provided authorization is not sufficient to
      perform this request.`)
    : new UnauthorizedException(__`An authorization is required to
      perform this request but none has been provided.`)
}

function denyProps (keys, user) {
  throw user
    ? new ForbiddenException(keys.map(key => makePropError(key, __`The provided
      authorization is not sufficient to process the $key property.`)))
    : new UnauthorizedException(keys.map(key => makePropError(key, __`An
      authorization is required to process the $key property but none has been
      provided.`)))
}
