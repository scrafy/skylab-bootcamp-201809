export default class NoConnectedWsException extends Error {
    constructor (message) {
      super()
      Error.captureStackTrace( this, this.constructor )
      this.name = 'NoConnectedWsException'
      this.message = message
    }
}
