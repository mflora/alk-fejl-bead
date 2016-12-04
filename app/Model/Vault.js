'use strict'

const Lucid = use('Lucid')

class Vault extends Lucid {
  user () {
    return this.belongsTo('App/Model/User')
  }
}

module.exports = Vault
