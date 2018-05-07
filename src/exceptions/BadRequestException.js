import BaseException from '~/exceptions/BaseException'

export default class BadRequestException extends BaseException {
  constructor (description) {
    super('bad-request-error', description)
  }
}
