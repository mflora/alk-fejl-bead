'use strict'

const Schema = use('Schema')

class VaultsTableSchema extends Schema {

  up () {
    this.create('vaults', (table) => {
      table.increments()
      table.integer('user_id').notNullable().unique()
      table.integer('value').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('vaults')
  }

}

module.exports = VaultsTableSchema
