'use strict'

const Lucid = use('Lucid')

class User extends Lucid {
    static get rules () {
        return {
            username: 'required|unique:users',
            name: 'required',
            email: 'required|email|unique:users',
            password: 'required',
            password2: 'required|same:password',
        }        
    }      

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

  todo () {
      return this.hasMany('App/Model/Todoe')
  }

  family () {
      return this.belongsTo('App/Model/Family')
  }

  vault () {
      return this.hasOne('App/Model/Family')
  }
}

module.exports = User
