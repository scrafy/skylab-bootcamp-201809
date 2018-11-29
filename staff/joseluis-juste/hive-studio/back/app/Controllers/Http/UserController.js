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

    async create({ request, response }) {

        const data = JSON.parse(request.raw())
        const picprofile = data.picprofile
        delete data.picprofile
        let user = new User()
        user.merge(data)
        await user.save()
        if (picprofile) {

            if (fs.existsSync(`App/uploads/${user.id}/profile_pic.jpg`)) {
                fs.unlinkSync(`App/uploads/${user.id}/profile_pic.jpg`)
            }
            if (!fs.existsSync(`App/uploads/${user.id}`)) {
                fs.mkdirSync(`App/uploads/${user.id}`)
            }
            const readstream = fs.createReadStream(`App/uploads/tmp/${picprofile}.jpg`)
            const writestream = fs.createWriteStream(`App/uploads/${user.id}/profile_pic.jpg`)
            readstream.pipe(writestream)
            fs.unlink(`App/uploads/tmp/${picprofile}.jpg`)

        }
        this.sendResponse(response, {userId:user.id})
    }

    async update({ auth, request, response }) {
        
        const { id } = await auth.getUser()
        const data = JSON.parse(request.raw())
        const user = await User.find(id)
        if (!user)
            throw new ResourceNotFoundException(`The user with the id ${id} not exists`, 404)

        if (data.newpassword) {

            data.password = data.newpassword
            delete data.newpassword
            delete data.confirmpassword
        }
        user.merge(data)
        await user.save()
        this.sendResponse(response, null)
        this.sendResponse(response)
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

    async uploadImgRegister({ request, response }) {

        const id = Date.now()
        const profilePic = request.file('profileimg', {

        })
        await profilePic.move(`App/uploads/tmp`, {
            name: `${id}.jpg`
        })

        if (!profilePic.moved()) {
            throw Error("The picture could not to be moved")
        }
        var bitmap = fs.readFileSync(`App/uploads/tmp/${id}.jpg`);
        let data = new Buffer(bitmap).toString('base64');
        return this.sendResponse(response, { id: id, data: `data:image/png;base64,${data}` })
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


    async getUserData({ auth, response }) {
        
        const { id } = await auth.getUser()
        const user = await User.find(id)
        let pic_data = ""
        if (!user) {
            throw new ResourceNotFoundException(`The user with the id ${id} not exists`, 404)
        }
        if (fs.existsSync(`App/uploads/${id}/profile_pic.jpg`)) {
            let bitmap = fs.readFileSync(`App/uploads/${id}/profile_pic.jpg`);
            pic_data = new Buffer(bitmap).toString('base64');
            pic_data = `data:image/png;base64,${pic_data}`
        }

        this.sendResponse(response, { user: user, profile_pic: pic_data })
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

    async getUserFarms({ auth, response }){

        const { id } = await auth.getUser()
        const user = await User.find(id)
        let result = []
        if (!user) {
            throw new ResourceNotFoundException(`The user with the id ${id} not exists`, 404)
        }
        let farms = await user.farms().fetch()

        await Promise.all(farms.rows.map( async farm => {
           
            let hives = await farm.hives().fetch()
            farm.hives = hives
            result.push(farm)
            return
        
        }))
        
        this.sendResponse(response, result)
       
    }

}

module.exports = UserController
