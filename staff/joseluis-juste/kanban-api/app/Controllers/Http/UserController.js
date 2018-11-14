'use strict'

const BaseController = use('App/Controllers/Http/BaseController')
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')
const User = use('App/Models/User')
const md5 = require('js-md5')
const Env = use('Env')
const fs = require("fs")

class UserController extends BaseController {

    constructor() {
        super()
    }

    async index({ request, response }) {

        const users = await User.all()
        this.sendResponse(response, users)
    }

    async create({ request, response }) {

        const data = JSON.parse(request.raw())

        User.create(data)
        this.sendResponse(response, null, 201)
    }

    async delete({ request, response }) {

        const { id } = request.params
        const user = await User.find(id)
        if (!user) {
            throw new ResourceNotFoundException(`The user with the id ${id} not exists`, 404)
        }
        await user.delete()
        this.sendResponse(response)
    }

    async update({ request, response }) {

        const id = request.params.id
        const data = JSON.parse(request.raw())
        const user = await User.find(id)
        if (!user)
            throw new ResourceNotFoundException(`The user with the id ${id} not exists`, 404)

        data.password = data.newpassword
        delete data.newpassword
        delete data.confirmpassword
        user.merge(data)
        await user.save()
        this.sendResponse(response, null)
        this.sendResponse(response)
    }

    async uploadImg({ request, response }) {

        const { userId } = request.body
        const profilePic = request.file('profileimg', {

        })
        if (fs.existsSync(`App/uploads/${userId}/profile_pic.jpg`)) {
            fs.unlinkSync(`App/uploads/${userId}/profile_pic.jpg`)
        }
        await profilePic.move(`App/uploads/${userId}`, {
            name: `profile_pic.jpg`
        })

        if (!profilePic.moved()) {
            throw Error("The picture could not to be moved")
        }
        var bitmap = fs.readFileSync(`App/uploads/${userId}/profile_pic.jpg`);
        let data = new Buffer(bitmap).toString('base64');
        return this.sendResponse(response, `data:image/png;base64,${data}`)

    }

    async getprofileImg({ request, response }) {

        const { id } = request.params
        
        if (!(fs.existsSync(`App/uploads/${id}/profile_pic.jpg`))) {
            throw Error("The user has not uploaded his picture")
        }
     
        var bitmap = fs.readFileSync(`App/uploads/${id}/profile_pic.jpg`);
        let data = new Buffer(bitmap).toString('base64');
        return this.sendResponse(response, `data:image/png;base64,${data}`)

    }


    async find({ request, response }) {

        const { id } = request.params
        const user = await User.find(id)
        if (!user) {
            throw new ResourceNotFoundException(`The user with the id ${id} not exists`, 404)
        }
        this.sendResponse(response, user)
    }

    async getPostits({ request, response }) {

        const { userId } = request.params
        const user = await User.find(userId)
        if (!user) {
            throw new ResourceNotFoundException(`The user with the id ${userId} not exists`, 404)
        }
        this.sendResponse(response, await user.postits().fetch())

    }

    async login({ request, response }) {

        let { username, password } = JSON.parse(request.raw())
        password = md5(password + Env.get('APP_SECRET'))
        let user = await User.query().where('password', password).andWhere('username', username).fetch()
        user = user.first()
        if (!user)
            throw new ResourceNotFoundException(`Not exists any user with the credentials provided`, 404)
        else {
            //const auth = use('auth')
            //await auth.generate(user, true)
            this.sendResponse(response, user)
        }
    }

    async logout({ request, response }) {

        this.sendResponse(response, null, 204)

    }
}

module.exports = UserController
