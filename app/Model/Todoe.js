'use strict'

const Lucid = use('Lucid')

class Todoe extends Lucid {
  user () {
    return this.belongsTo('App/Model/User')
  }
}

module.exports = Todoe
