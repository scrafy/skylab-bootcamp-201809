class ValidationError extends Error {
    constructor ( message, validationErrors ) {
      super()
      Error.captureStackTrace( this, this.constructor )
      this.name = 'CustomError'
      this.message = message
      if ( validationErrors ) this.validationErrors = validationErrors
    }
}

export default ValidationError