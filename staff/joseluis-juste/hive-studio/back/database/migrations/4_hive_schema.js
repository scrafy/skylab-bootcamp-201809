'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HiveSchema extends Schema {
  
  up() {

    this.create('hives', (table) => {

      table.increments()
      table.string('name', 25).notNullable()
      table.string('description', 255).notNullable()
      table.integer('mintemperature').unsigned().notNullable()
      table.integer('maxtemperature').unsigned().notNullable()
      table.integer('minhumidity').unsigned().notNullable()
      table.integer('maxhumidity').unsigned().notNullable()
      table.integer('beeminvolume').unsigned().notNullable()
      table.integer('beemaxvolume').unsigned().notNullable()
      table.boolean('isMonitored')
      table.string('latitude', 30).notNullable()
      table.string('longitude', 30).notNullable()
      table.integer('farm_id').unsigned().references('id').inTable('farms').notNullable()
      table.timestamps()

    })
  }

  down() {
    this.drop('hives')
  }
}

module.exports = HiveSchema
