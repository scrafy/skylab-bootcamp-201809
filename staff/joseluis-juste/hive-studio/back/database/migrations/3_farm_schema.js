'use strict'


const Schema = use('Schema')

class FarmSchema extends Schema {
  up () {
    this.create('farms', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.string('name', 25).notNullable()
      table.string('description', 255).notNullable()
      table.integer('maxhives').unsigned().notNullable()
      table.integer('squaremeters').unsigned().notNullable()
      table.timestamps()
    })
  }

  down () {
   
    this.drop('farms')
  }
}

module.exports = FarmSchema
