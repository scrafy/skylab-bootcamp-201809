'use strict'
const NotAllowedException = use('App/Exceptions/NotAllowedException')
const BaseController = use('App/Controllers/Http/BaseController')
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')
const User = use('App/Models/User')
const PostIt = use('App/Models/PostIt')

class PostItController extends BaseController {

    constructor() {
        super()
    }

    async create({ auth, request, response }) {

        const { id } = await auth.getUser()
        const { content, state } = request.body
        const user = await User.find(id)
        if (!user) {
            throw new ResourceNotFoundException(`The user with the id ${id} not exists`, 404)
        }
        let postit = new PostIt()
        postit.content = content
        postit.state = state
        await user.postits().save(postit)
        this.sendResponse(response, await PostIt.last())

    }

    async delete({ auth, request, response }) {

        const { id } = await auth.getUser()
        const { postitId } = request.params
        const user = await User.find(id)
        if (!user) {
            throw new ResourceNotFoundException(`The user with the id ${id} not exists`, 404)
        }
        const postit = await PostIt.find(postitId)
        if (!postit) {
            throw new ResourceNotFoundException(`The postit with the id ${postitId} not exists`, 404)
        }
        if (postit.user_id !== Number(id)) {
            throw new ResourceNotFoundException(`The postit with the id ${postitId} does not belongs to the user with the id ${id}`, 404)
        }
        await postit.delete()
        this.sendResponse(response)
    }

    async update({ auth, request, response }) {

        const { id } = await auth.getUser()
        const { postitId } = request.params
        const { content, state } = request.body
        const user = await User.find(id)
        if (!user) {
            throw new ResourceNotFoundException(`The user with the id ${id} not exists`, 404)
        }
        const postit = await PostIt.find(postitId)
        if (!postit) {
            throw new ResourceNotFoundException(`The postit with the id ${postitId} not exists`, 404)
        }
        if (postit.user_id !== Number(id)) {
            throw new ResourceNotFoundException(`The postit with the id ${postitId} does not belongs to the user with the id ${id}`, 404)
        }
        postit.merge({ content: content, state: state })
        await user.postits().save(postit)
        this.sendResponse(response)

    }

    async find({ auth, request, response }) {

        const { id } = await auth.getUser()
        const { postitId } = request.params
        const user = await User.find(id)
        if (!user) {
            throw new ResourceNotFoundException(`The user with the id ${id} not exists`, 404)
        }
        const postit = await PostIt.find(postitId)
        if (!postit) {
            throw new ResourceNotFoundException(`The postit with the id ${postitId} not exists`, 404)
        }
        if (postit.user_id !== Number(id)) {
            throw new ResourceNotFoundException(`The postit with the id ${postitId} does not belongs to the user with the id ${id}`, 404)
        }

        this.sendResponse(response, await PostIt.find(postitId))

    }

    async addCollaborator({ auth, request, response }) {

        const { id } = await auth.getUser()
        const { postitId, collabId } = request.params


        const user = await User.find(id)
        if (!user) {
            throw new ResourceNotFoundException(`The user with the id ${id} not exists`, 404)
        }
        const collab = await User.find(collabId)
        if (!collab) {
            throw new ResourceNotFoundException(`The collab with the id ${collabId} not exists`, 404)
        }

        if (Number(collabId) === Number(id))
            throw new NotAllowedException("The collaborator are you...dont lie", 401)


        const postit = await PostIt.find(postitId)
        if (!postit)
            throw new ResourceNotFoundException(`The postit with the id ${postitId} does not belongs to the user with the id ${id}`, 404)

        if (postit.collaborator_id)
            throw new NotAllowedException("The postit has a collaborator assigned", 401)

        postit.collaborator_id = collabId
        await postit.save()

        this.sendResponse(response)

    }
}

module.exports = PostItController
