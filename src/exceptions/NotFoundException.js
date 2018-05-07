import BaseException from '@/exceptions/BaseException'

export default class NotFoundException extends BaseException {
  constructor (description) {
    super('not-found-error', description)
  }
}
