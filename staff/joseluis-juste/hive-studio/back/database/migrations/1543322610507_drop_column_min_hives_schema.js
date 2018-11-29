'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DropColumnMinHivesSchema extends Schema {
  up () {
    this.table('farms', (table) => {
      table.dropColumn("minhives")
    })
  }

  down () {
    this.table('farms', (table) => {
      table.integer('minhives').unsigned().notNullable()
    })
  }
}

module.exports = DropColumnMinHivesSchema
