'use strict'

const BaseController = use('App/Controllers/Http/BaseController')
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')
const User = use('App/Models/User')
const Farm = use('App/Models/Farm')
const Hive = use('App/Models/Hive')

class HiveController extends BaseController {

    constructor() {
        super()
    }

    async create({ auth, request, response }) {

        const { id } = await auth.getUser()
        const data = JSON.parse(request.raw())
        const user = await User.find(id)
        
        if (!user) {
            throw new ResourceNotFoundException(`The user with the id ${id} not exists`, 404)
        }
        let farm = await Farm.find(data.farm_id)
        if (!farm) {
            throw new ResourceNotFoundException(`The farm with the id ${data.farm_id} not exists`, 404)
        }
        if (id !== farm.user_id)
            throw new ResourceNotFoundException(`The farm with the id ${data.farm_id} does not belongs to user with id ${id}`, 404)

        let hive = new Hive()
        delete data.id
        hive.merge(data)
        await hive.save()        
        this.sendResponse(response)

    }

    async update({ auth, request, response }) {
       
        const { id } = await auth.getUser()
        const { hiveId } = request.params
        const data = JSON.parse(request.raw())
        const user = await User.find(id)
        
        if (!user) {
            throw new ResourceNotFoundException(`The user with the id ${id} not exists`, 404)
        }
        let farm = await Farm.find(data.farm_id)
        if (!farm) {
            throw new ResourceNotFoundException(`The farm with the id ${data.farm_id} not exists`, 404)
        }
        if (id !== farm.user_id)
            throw new ResourceNotFoundException(`The farm with the id ${data.farm_id} does not belongs to user with id ${id}`, 404)
        
        let hive = await Hive.find(hiveId)

        if (!hive)
            throw new ResourceNotFoundException(`The hive with the id ${hiveId} not exists`, 404)

        if (hive.farm_id !== data.farm_id)
            throw new ResourceNotFoundException(`The hive with the id ${hiveId} does not belongs to farm with id ${data.farm_id}`, 404)

       
        hive.merge(data)
        await hive.save()        
        this.sendResponse(response)

    }

    async find({ auth, request, response }) {

        
        const { id } = await auth.getUser()
        const { hiveId } = request.params
      
        let user = User.find(id)
        if (!user) {
            throw new ResourceNotFoundException(`The user with the id ${id} not exists`, 404)
        }

        const hive = await Hive.find(hiveId)
        if (!hive)
        throw new ResourceNotFoundException(`The hive with the id ${hiveId} not exists`, 404)

        const farm = await Farm.find(hive.farm_id)

        if (id !== farm.user_id)
            throw new ResourceNotFoundException(`The farm with the id ${farm.id} does not belongs to user with id ${id}`, 404)
               
        this.sendResponse(response, hive)

    }

    async delete({ auth, request, response }) {

        
        const { id } = await auth.getUser()
        const { hiveId } = request.params
      
        let user = User.find(id)
        if (!user) {
            throw new ResourceNotFoundException(`The user with the id ${id} not exists`, 404)
        }

        const hive = await Hive.find(hiveId)
        if (!hive)
            throw new ResourceNotFoundException(`The hive with the id ${hiveId} not exists`, 404)

        const farm = await Farm.find(hive.farm_id)

        
        if (id !== farm.user_id)
            throw new ResourceNotFoundException(`The farm with the id ${farm.id} does not belongs to user with id ${id}`, 404)
        
        hive.delete()
        this.sendResponse(response)

    }

    
}

module.exports = HiveController
