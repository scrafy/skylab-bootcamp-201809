'use strict'

const { ServiceProvider } = require('@adonisjs/fold')


class EventManagementProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register () {

    this.app.bind('EventManagement', () => {
      //const Config = this.app.use('Adonis/Src/Config')
      
      return require('.')
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

module.exports = EventManagementProvider
