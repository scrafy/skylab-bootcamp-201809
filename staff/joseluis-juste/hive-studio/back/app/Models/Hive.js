'use strict'

const Model = use('Model')

class Hive extends Model {

  constructor(){
     super()
  }

  static get table () {
    return 'hives'
  }
 
  
  static boot () {
    
    super.boot() 
    
    
  }

  static get hidden () {
    return ['created_at', 'updated_at']
  }

  farm () {
    return this.belongsTo('App/Models/Farm')
  }

}

module.exports = Hive
