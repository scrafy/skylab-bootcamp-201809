'use strict'

/*
|--------------------------------------------------------------------------
| ChatSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Chat = use('App/Models/Chat')
class ChatSeeder {
  async run () {

    let chat = new Chat()
    chat.roomname = "main"
    await chat.save()
  }
}

module.exports = ChatSeeder
