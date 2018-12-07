'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnsToHiveSchema extends Schema {
  up() {
    this.alter('hives', (table) => {

      table.integer('temperature').unsigned()
      table.integer('humidity').unsigned()
      table.integer('beevolume').unsigned()

    })
  }

  down() {

    this.alter('hives', (table) => {
      table.dropColumn("temperature")
      table.dropColumn("humidity")
      table.dropColumn("beevolume")
    })
  }
}

module.exports = AddColumnsToHiveSchema
