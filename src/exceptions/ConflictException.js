import BaseException from '~/exceptions/BaseException'

export default class ConflictException extends BaseException {
  constructor (description) {
    super('conflict-error', description)
  }
}
