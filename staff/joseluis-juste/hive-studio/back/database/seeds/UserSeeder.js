'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */

const Factory = use('Factory')
const User = use('App/Models/User')

class UserSeeder {
  
  async run () {

    let user = new User()
    user.name = "sensor"
    user.surname = "sensor"
    user.email = "sensor@terra.es"
    user.phone = "sensor"
    user.username = "sensor"
    user.password = "1234"
    await user.save()
    
  }
}

module.exports = UserSeeder
