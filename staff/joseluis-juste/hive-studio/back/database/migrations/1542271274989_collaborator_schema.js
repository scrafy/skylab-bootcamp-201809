'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CollaboratorSchema extends Schema {
  up() {
    this.table('postits', (table) => {
      table.integer('collaborator_id').unsigned().references('id').inTable('users')
    })
  }

  down() {
    this.table('collaborators', (table) => {
      // reverse alternations
    })
  }
}

module.exports = CollaboratorSchema
