'use strict'

const BaseController = use('App/Controllers/Http/BaseController')
const User = use('App/Models/User')
const ResourceNotFoundException = use('App/Exceptions/ValidationException')

class UserController extends BaseController {

    constructor(){
        super()
    }

    async index({request, response}){

        const users = await User.query().setHidden(['password','created_at','updated_at']).fetch()
        this.sendResponse(response, users)
    }

    async create({request, response}){

        const data = JSON.parse(request.raw())
       
            User.create(data)
            this.sendResponse(response)
    }

    async delete({request, response}){
        
        const {id} = request.params
        const user = await User.find(id)
        if (!user){
            throw new ResourceNotFoundException(`The user with the id ${id} not exists`, 404)            
        }
        await user.delete()
        this.sendResponse(response)
    }

   /* update({request, response}){

        response.send(JSON.stringify(request))
    }

    find({request, response}){

        response.send(request.params)
    }*/

    login({request, response}){

        const {username, password} = request.body
        const user = User.query().where('username', username).fetch()

        response.send(user)
    }

    logout({request, response}){

        response.send(request.params)
    }
}

module.exports = UserController
