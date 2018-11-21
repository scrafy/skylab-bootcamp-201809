'use strict'

const BaseController = use('App/Controllers/Http/BaseController')
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')
const User = use('App/Models/User')
const PostIt = use('App/Models/PostIt')
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
        await User.create(data)
        this.sendResponse(response, null, 201)
    }

    async delete({ auth, response }) {

        const { id } = await auth.getUser()
        const user = await User.find(id)
        if (!user) {
            throw new ResourceNotFoundException(`The user with the id ${id} not exists`, 404)
        }
        await user.postits().delete()
        await user.delete()
        this.sendResponse(response)
    }

    async update({ auth, request, response }) {

        const { id } = await auth.getUser()
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

    async getListCollaborators({ auth, request, response }) {

        const { id } = await auth.getUser()
       
        const all = await User.query().where("id",'<>', id).fetch()
        
        this.sendResponse(response, all.rows.map(user => {return {id:user.id, username:user.username}}))
    }

    async uploadImg({ auth, request, response }) {

        const { id } = await auth.getUser()
        const profilePic = request.file('profileimg', {

        })
        if (fs.existsSync(`App/uploads/${id}/profile_pic.jpg`)) {
            fs.unlinkSync(`App/uploads/${id}/profile_pic.jpg`)
        }
        await profilePic.move(`App/uploads/${id}`, {
            name: `profile_pic.jpg`
        })

        if (!profilePic.moved()) {
            throw Error("The picture could not to be moved")
        }
        var bitmap = fs.readFileSync(`App/uploads/${id}/profile_pic.jpg`);
        let data = new Buffer(bitmap).toString('base64');
        return this.sendResponse(response, `data:image/png;base64,${data}`)

    }

    async getprofileImg({ auth, request, response }) {

        const { id } = await auth.getUser()

        if (!(fs.existsSync(`App/uploads/${id}/profile_pic.jpg`))) {
            throw Error("The user has not uploaded his picture")
        }

        var bitmap = fs.readFileSync(`App/uploads/${id}/profile_pic.jpg`);
        let data = new Buffer(bitmap).toString('base64');
        return this.sendResponse(response, `data:image/png;base64,${data}`)

    }


    async find({ auth, response }) {

        const { id } = await auth.getUser()
        const user = await User.find(id)
        if (!user) {
            throw new ResourceNotFoundException(`The user with the id ${id} not exists`, 404)
        }
        this.sendResponse(response, user)
    }

    async getPostits({ auth, response }) {

        const { id } = await auth.getUser()
        const user = await User.find(id)
        if (!user) {
            throw new ResourceNotFoundException(`The user with the id ${id} not exists`, 404)
        }
        
        const postits = await PostIt.query().where("user_id", id).fetch()
        debugger
        this.sendResponse(response, postits)
    }

    async login({ auth, request, response }) {

        let { username, password } = JSON.parse(request.raw())
        password = md5(password + Env.get('APP_SECRET'))
        let user = await User.query().where('password', password).andWhere('username', username).fetch()
        user = user.first()
        if (!user)
            throw new ResourceNotFoundException(`Not exists any user with the credentials provided`, 404)
        else {

            const token = await auth.generate(user, true)
            this.sendResponse(response, token)
        }
    }

}

module.exports = UserController
