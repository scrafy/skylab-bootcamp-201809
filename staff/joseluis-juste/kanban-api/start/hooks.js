const { hooks } = require('@adonisjs/ignitor')
const GenericResponse = require('../App/Models/OutputModels/response')
const { ioc } = require('@adonisjs/fold')
const md5 = require('js-md5')



hooks.after.providersBooted((ctx) => {

    const Validator = use('Validator')

    ioc.bind('GenericResponse', function (app) {

        return new GenericResponse()
    })

    
    const passwordCorrect = async (data, field, message, args, get) => {

        
        const Database = use('Database')
        const Env = use('Env')
        let value = get(data, field)
        if (!value) {
            return
        }
        const [table, column] = args
        value = md5(value + Env.get('APP_SECRET'))
            
        
        const row = await Database.table(table).where(column, value).where("id", args[2]).first()

        if (!row) {
            throw message
        }

    }

    const equalTo = async (data, field, message, args, get) => {

       
        let value = get(data, field)
        if (!value) {
            return
        }
               
        if (value !== args[0])  
            throw message

    }

    Validator.extend('passwordCorrect', passwordCorrect)
    Validator.extend('equalTo', equalTo)


})