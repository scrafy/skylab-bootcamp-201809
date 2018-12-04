'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class WebSocketClientProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
    //
    this.app.singleton('WebSocketClient', () => {
      const Env = use('Env')
      const Connection = require('./index')
      const con =  new Connection(Env.get("WS_URL"))
      con._open()
      return con
    })
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot () {
    //
  }
}

module.exports = WebSocketClientProvider
