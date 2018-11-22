'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
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
}

module.exports = Farm
