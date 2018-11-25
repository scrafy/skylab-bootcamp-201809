export default class ChannelNotReadyException extends Error {
  
    constructor (message) {
      super()
      Error.captureStackTrace( this, this.constructor )
      this.name = 'ChannelNotReady'
      this.message = message
    }
}
