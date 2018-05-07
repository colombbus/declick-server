import BadRequestException from '@/exceptions/BadRequestException'
import ValidationException from '@/exceptions/ValidationException'
import {makePropError} from '@/utils/errors'
import {mapProps} from '@/utils/objects'
import {__} from '@/utils/text'

export function makeValidator (config) {
  return async (context, next) => {
    validate(context.request.body, config)
    await next()
  }
}

function validate (body, config) {
  config = normalizeConfig(config)
  assertKeyMatching(body, config)
  assertValidFormats(body, config)
}

function normalizeConfig (config) {
  return mapProps(config, value =>
    typeof value === 'object' ? value : {type: value})
}

function assertKeyMatching (body, config) {
  const unknownKeys = Object.keys(body).filter(key => !(key in config))
  const missingKeys = Object.keys(config).filter(key =>
    config[key].required && !(key in body))
  if (unknownKeys.length > 0 || missingKeys.length > 0) {
    throw new BadRequestException([
      ...unknownKeys.map(key => makePropError(key, __`The provided property
        $key is unknown. It is either misspelled or not supported by this
        application.`)),
      ...missingKeys.map(key => makePropError(key, __`The required property
        $key is missing.`))
    ])
  }
}

function assertValidFormats (body, config) {
  const failedProps = Object.entries(body).reduce((props, [key, value]) => {
    const report = description => props.push({key, description})
    validateProp(value, config[key], report)
    return props
  }, [])
  if (failedProps.length > 0) {
    throw new ValidationException(
      failedProps.map(({key, description}) => makePropError(key, description)))
  }
}

function validateProp (data, format, report) {
  switch (format.type) {
    case Boolean: return validateBoolean(data, format, report)
    case Number: return validateNumber(data, format, report)
    case String: return validateString(data, format, report)
    default: throw new Error(`No validator found for type ${format.type}.`)
  }
}

function validateBoolean (value, format, report) {
  if (typeof value !== 'boolean') {
    return report('The $key property must be of type boolean.')
  }
}

function validateNumber (value, format, report) {
  if (typeof value !== 'number') {
    return report('The $key property must be of type number.')
  }
  if ('min' in format && value < format.min) {
    report(`The $key property must be greater than or equal to ${format.min}.`)
  }
  if ('max' in format && value > format.max) {
    report(`The $key property must be lower than or equal to ${format.max}.`)
  }
}

function validateString (value, format, report) {
  if (typeof value !== 'string') {
    return report('The $key property must be of type string.')
  }
  if ('match' in format && !format.match.test(value)) {
    report('The $key property format is not valid.')
  }
  if ('values' in format && !format.values.includes(value)) {
    report(__`The $key property must contain one of the following
      values : ${format.values.join(', ')}.`)
  }
  if ('minLength' in format && value.length < format.minLength) {
    report(__`The $key property must be at least ${format.minLength}
      characters long.`)
  }
  if ('maxLength' in format && value.length > format.maxLength) {
    report(__`The $key property must be at most ${format.maxLength}
      characters long.`)
  }
}
