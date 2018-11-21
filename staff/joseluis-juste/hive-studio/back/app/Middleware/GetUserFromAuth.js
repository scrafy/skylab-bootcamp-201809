'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class GetUserFromAuth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({auth, request }, next) {
   
    const user = await auth.getUser()
    request.user = user.$attributes
    await next()
  }
}

module.exports = GetUserFromAuth
