const { Schema } = require('mongoose')

const Postit = new Schema({
    text: String,
    status: {type: String, default: 'TODO'}
})

const User = new Schema({
    name: String,
    surname: String,
    username: String,
    password: String,
    postits: [Postit]
})

module.exports = {
    Postit,
    User
}

