import BaseException from '@/exceptions/BaseException'

export default class ForbiddenException extends BaseException {
  constructor (description) {
    super('forbidden-error', description)
  }
}
