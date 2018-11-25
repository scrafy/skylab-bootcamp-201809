export default class ChannelSubscriptionNotFoundException extends Error {
    constructor (message) {
      super()
      Error.captureStackTrace( this, this.constructor )
      this.name = 'ChannelSubscriptionNotFound'
      this.message = message
    }
}
