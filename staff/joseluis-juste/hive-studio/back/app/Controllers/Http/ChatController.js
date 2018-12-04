'use strict'
const BaseController = use('App/Controllers/Http/BaseController')
const ChatMessage = use('App/Models/ChatMessage')

class ChatController extends BaseController {

    constructor() {
        super()
    }

    async storeMessage({ request, response }) {
        debugger
        const { chatId } = request.params
        const { message } = JSON.parse(request.raw())
        if (message) {
            let chatMessage = new ChatMessage()
            chatMessage.message = message
            chatMessage.chat_id = chatId
            await chatMessage.save()
            this.sendResponse(response, chatMessage.id)
        }else
            this.sendResponse(response)
    }

    async getMessages({ request, response }) {

        const { chatId } = request.params
        let messages = await ChatMessage.query().where("chat_id", chatId).last()
        this.sendResponse(response, messages)
    }
}

module.exports = ChatController
