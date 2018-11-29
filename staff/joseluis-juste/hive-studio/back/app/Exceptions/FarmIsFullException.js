const BaseException = require("./BaseException")

'use strict'

class FarmIsFullException extends BaseException {

  constructor(message, status, validationErrors) {
    super(message, status)
    this.genericresponse.ValidationErrors = validationErrors

  }
}

module.exports = FarmIsFullException