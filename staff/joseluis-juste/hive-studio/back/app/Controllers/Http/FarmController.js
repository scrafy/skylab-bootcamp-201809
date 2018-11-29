'use strict'
const BaseController = use('App/Controllers/Http/BaseController')
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')
const User = use('App/Models/User')
const Farm = use('App/Models/Farm')

class FarmController extends BaseController {

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
        let farm = new Farm()
        delete data.id
        farm.merge(data)
        farm.user_id = id
        await farm.save()
        this.sendResponse(response, { farmId:farm.id })

    }

    async index({ auth, request, response }) {

        const { id } = await auth.getUser()
        const user = await User.find(id)
        if (!user) {
            throw new ResourceNotFoundException(`The user with the id ${id} not exists`, 404)
        }
        const farms = await user.farms().fetch()
        this.sendResponse(response, farms)

    }

    async delete({ auth, request, response }) {

        const { id } = await auth.getUser()
        const { farmId } = request.params
        const user = await User.find(id)
        if (!user) {
            throw new ResourceNotFoundException(`The user with the id ${id} not exists`, 404)
        }
        const farm = await Farm.find(farmId)
        if (!farm) {
            throw new ResourceNotFoundException(`The farm with the id ${farmId} not exists`, 404)
        }
        if (farm.user_id !== Number(id)) {
            throw new ResourceNotFoundException(`The farm with the id ${farmId} does not belongs to the user with the id ${id}`, 404)
        }
        await farm.hives().delete()
        await farm.delete()
        this.sendResponse(response)
    }

    async update({ auth, request, response }) {

        const { id } = await auth.getUser()
        const { farmId } = request.params
        const data = JSON.parse(request.raw())
        const user = await User.find(id)
        if (!user) {
            throw new ResourceNotFoundException(`The user with the id ${id} not exists`, 404)
        }
        const farm = await Farm.find(farmId)
        if (!farm) {
            throw new ResourceNotFoundException(`The farm with the id ${farmId} not exists`, 404)
        }
        if (farm.user_id !== Number(id)) {
            throw new ResourceNotFoundException(`The farm with the id ${farmId} does not belongs to the user with the id ${id}`, 404)
        }
        if (data.hives)
            delete data.hives
            
        farm.merge(data)
        await farm.save(farm)
        this.sendResponse(response)

    }

    async find({ auth, request, response }) {

        const { id } = await auth.getUser()
        const { farmId } = request.params
        const user = await User.find(id)
        if (!user) {
            throw new ResourceNotFoundException(`The user with the id ${id} not exists`, 404)
        }
        const farm = await Farm.find(farmId)
        if (!farm) {
            throw new ResourceNotFoundException(`The farm with the id ${farmId} not exists`, 404)
        }
        
        if (farm.user_id !== Number(id)) {
            throw new ResourceNotFoundException(`The farm with the id ${farmId} does not belongs to the user with the id ${id}`, 404)
        }

        this.sendResponse(response, farm)

    }

}

module.exports = FarmController
