import BaseException from '~/exceptions/BaseException'

export default class ValidationException extends BaseException {
  constructor (description) {
    super('validation-error', description)
  }
}
