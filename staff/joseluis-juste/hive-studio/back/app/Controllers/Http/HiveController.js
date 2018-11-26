'use strict'

const BaseController = use('App/Controllers/Http/BaseController')
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')
const UnauthorizedException = use("App/Exceptions/UnauthorizedException")
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

    async getInfoForSensor({ auth, request, response }){
        
        
        const { name } = await auth.getUser()

        if (name !== "sensor")
            throw new UnauthorizedException("This action only can be executed by the sensor application")

        let hives = await Hive.query().with("user").fetch()
        hives = JSON.parse(JSON.stringify(hives))
        let resp = []
        hives.forEach( hive => {
            
            resp.push({
                
                hiveId:hive.id,
                userId:hive.user[0].id,
                temperature:null,
                humidity:null,
                beevolume:null
            })
        })
        this.sendResponse(response, resp)     
    }

    async getDataFromSensor({ auth, request}) {
        
        const { name } = await auth.getUser()

        if (name !== "sensor")
            throw new UnauthorizedException("This action only can be executed by the sensor application")
            
        const data = request.raw()
        const hiveUpdateInfoEventEmitter = use("EventManagement").selectSubject("hiveUpdateInfo")
        hiveUpdateInfoEventEmitter.next(data)
    }


}

module.exports = HiveController
