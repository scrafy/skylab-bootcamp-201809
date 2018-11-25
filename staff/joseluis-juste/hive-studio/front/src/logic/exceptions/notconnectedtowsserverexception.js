export default class NotConnectedToWsServerException extends Error {
    constructor (message) {
      super()
      Error.captureStackTrace( this, this.constructor )
      this.name = 'NotConnectedToWsServer'
      this.message = message
    }
}
