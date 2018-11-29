class NotValidSession extends Error {
    constructor (message) {
      super()
      Error.captureStackTrace( this, this.constructor )
      this.name = 'NotValidSession'
      this.message = message
    }
}


//export default NotValidSession

module.exports = NotValidSession