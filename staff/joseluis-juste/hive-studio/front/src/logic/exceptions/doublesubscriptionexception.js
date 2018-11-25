export default class DoubleSubsctiptionException extends Error {
    constructor (message) {
      super()
      Error.captureStackTrace( this, this.constructor )
      this.name = 'DoubleSubscriptionException'
      this.message = message
    }
}
