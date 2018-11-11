'use strict'

const BaseController = use('App/Controllers/Http/BaseController')
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')
const User = use('App/Models/User')
const PostIt = use('App/Models/PostIt')

class PostItController extends BaseController {
    
    constructor(){
        super()
    }

    async index({request, response}){
        
        const {userId} = request.params //este userid hay que cogerlo del token JWT (esto es provisional)
        const user = await User.find(userId)
        if (!user){
            throw new ResourceNotFoundException(`The user with the id ${userId} not exists`, 404)            
        }
        const postits = await PostIt.query().where("user_id",userId).fetch()
        this.sendResponse(response, postits)
    }

    async create({request, response}){

        const {content,userid} = request.body
        const user = await User.find(userid)
        if (!user){
            throw new ResourceNotFoundException(`The user with the id ${userid} not exists`, 404)            
        }
        let postit = new PostIt()
        postit.content = content
        user.postits().save(postit)
        this.sendResponse(response, user)

    }

    async delete({request, response}){

        const {postitId} = request.params
        const {userid} = request.body  //este userid hay que cogerlo del token JWT (esto es provisional)
        const user = await User.find(userid)
        if (!user){
            throw new ResourceNotFoundException(`The user with the id ${userid} not exists`, 404)            
        }
        const postit = await PostIt.find(postitId)
        if (!postit){
            throw new ResourceNotFoundException(`The postit with the id ${postitId} not exists`, 404)            
        }
        if (postit.user_id !== userid){
            throw new ResourceNotFoundException(`The postit with the id ${postitId} does not belongs to the user with the id ${userid}`, 404)            
        }
        await postit.delete()
        this.sendResponse(response)
    }

    async update({request, response}){

        const {postitId} = request.params
        const {userid, content} = request.body //este userid hay que cogerlo del token JWT (esto es provisional)
        const user = await User.find(userid)
        if (!user){
            throw new ResourceNotFoundException(`The user with the id ${userid} not exists`, 404)            
        }
        const postit = await PostIt.find(postitId)
        if (!postit){
            throw new ResourceNotFoundException(`The postit with the id ${postitId} not exists`, 404)            
        }
        if (postit.user_id !== userid){
            throw new ResourceNotFoundException(`The postit with the id ${postitId} does not belongs to the user with the id ${userid}`, 404)            
        }
        postit.merge({content:content})        
        await user.postits().save(postit)
        this.sendResponse(response)
        
    }
}

module.exports = PostItController
