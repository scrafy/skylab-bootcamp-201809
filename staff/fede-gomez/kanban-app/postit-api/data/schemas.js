const { Schema } = require('mongoose')


/**
 * Here we define the Schemas . We won't use them directly. Instead, we will use the models created based on these schemas (check models.js)
 */

const Postit = new Schema({
    text: String,
    userId: String
})

const User = new Schema({
    name: String,
    surname: String,
    username: String,
    password: String
})

module.exports = {
    Postit,
    User
}