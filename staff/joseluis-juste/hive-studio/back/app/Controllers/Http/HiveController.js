'use strict'
const BaseController = use('App/Controllers/Http/BaseController')
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')
const UnauthorizedException = use("App/Exceptions/UnauthorizedException")
const FarmIsFullException = use("App/Exceptions/FarmIsFullException")
const User = use('App/Models/User')
const Farm = use('App/Models/Farm')
const Hive = use('App/Models/Hive')
const ws = use('WebSocketClient')

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
        await farm.load("hives")
        if (!farm) {
            throw new ResourceNotFoundException(`The farm with the id ${data.farm_id} not exists`, 404)
        }
        if (id !== farm.user_id)
            throw new ResourceNotFoundException(`The farm with the id ${data.farm_id} does not belongs to user with id ${id}`, 404)
        
        const total_hives =  await farm.hives().getCount()   
        if ( total_hives + 1 > farm.maxhives){

            throw new FarmIsFullException("This farm is full of hives")
        }
        let hive = new Hive()
        delete data.id
        hive.merge(data)
        await hive.save()
        this.sendResponse(response,{ hiveId:hive.id })

    }

    async update({ auth, request, response }) {

        const { id } = await auth.getUser()
        const { hiveId } = request.params
        const data = JSON.parse(request.raw())
        const user = await User.find(id)

        if (!user) {
            throw new ResourceNotFoundException(`The user with the id ${id} not exists`, 404)
        }
        if(!data.farm_id){
            throw new ResourceNotFoundException(`The farmId has not been sent in the request body`, 404)
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

    async enableMonitor({ auth, request, response }){
        
        const { id } = await auth.getUser()
        const { hiveId } = request.params

        let user = User.find(id)
        if (!user) {
            throw new ResourceNotFoundException(`The user with the id ${id} not exists`, 404)
        }
        const hive = await Hive.find(hiveId)
        if (!hive) {
            throw new ResourceNotFoundException(`The hive with the id ${hiveId} not exists`, 404)
        }
        await hive.load("user")
        const jsonhive = JSON.parse(JSON.stringify(hive))
        if (id !== jsonhive.user[0].id)
            throw new ResourceNotFoundException(`The hive with the id ${jsonhive[0].id} does not belongs to user with id ${id}`, 404)
        
        hive.isMonitored = !hive.isMonitored
        hive.save()
        this.sendResponse(response)
    }

    async getInfoForSensor({ auth, request, response }){
        
        
        const { username } = await auth.getUser()

        if (username !== "sensor")
            throw new UnauthorizedException("This action only can be executed by the sensor application")

        let hives = await Hive.query().with("user").where("isMonitored",1).fetch()
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
        
        const { username } = await auth.getUser()

        if (username !== "sensor")
            throw new UnauthorizedException("This action only can be executed by the sensor application")
            
        const data = request.raw()
        if (ws.isConnectionOpen){
            const _data = {t:7,d:{topic:"honeycomb",event:"getHivesInfo",data:data}}
            ws._client.send(JSON.stringify(_data))
        }
          
    }


}

module.exports = HiveController
