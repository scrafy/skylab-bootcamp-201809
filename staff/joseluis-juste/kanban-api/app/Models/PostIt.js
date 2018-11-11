'use strict'

const Model = use('Model')

class PostIt extends Model {

    static get table () {
        return 'postits'
    }

    static get visible () {
        return ['id', 'content']
      }

    user(){
        return this.belongsTo('App/Models/User')
    }
}

module.exports = PostIt
