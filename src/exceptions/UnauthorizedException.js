import BaseException from '@/exceptions/BaseException'

export default class UnauthorizedException extends BaseException {
  constructor (description) {
    super('unauthorized-error', description)
  }
}
