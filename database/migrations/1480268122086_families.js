'use strict'

const Schema = use('Schema')

class FamiliesTableSchema extends Schema {

  up () {
    this.create('families', (table) => {
      table.increments()
      table.integer('user_id').notNullable()
      table.string('name', 50).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('families')
  }

}

module.exports = FamiliesTableSchema
