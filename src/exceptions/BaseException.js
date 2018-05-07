export default class BaseException extends Error {
  constructor (type, description) {
    super()
    this.type = type
    this.description = description
  }
  toJson () {
    if (typeof this.description === 'string') {
      return {type: this.type, description: this.description}
    } else {
      return {type: this.type, details: this.description}
    }
  }
}
