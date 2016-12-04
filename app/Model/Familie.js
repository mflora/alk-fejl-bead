'use strict'

const Lucid = use('Lucid')

class Familie extends Lucid {
  user () {
    return this.hasMany('App/Model/User')
  }
}

module.exports = Familie