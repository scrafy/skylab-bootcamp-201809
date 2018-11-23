'use strict'


const Model = use('Model')

class Farm extends Model {

    constructor(){
        super()
     }
   
     static get table () {
       return 'farms'
     }
    
     
     static boot () {
       
       super.boot() 
       this.addHook('beforeSave', async (userInstance) => {
         
     
       })
       
     }
   
     static get hidden () {
       return ['created_at', 'updated_at']
     }
   
     user () {
       return this.belongsTo('App/Models/User')
     }   

     hives (){
      return this.hasMany('App/Models/Hive')
     }
}

module.exports = Farm
