'use strict'

const Schema = use('Schema')

class TodoesTableSchema extends Schema {

  up () {
    this.create('todoes', (table) => {
      table.increments()
      table.integer('family_id').notNullable()
      table.integer('user_id')
      table.integer('owner_id').notNullable()
      table.string('title').notNullable()
      table.string('desc').notNullable()
      table.bool('finished').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('todoes')
  }

}

module.exports = TodoesTableSchema
