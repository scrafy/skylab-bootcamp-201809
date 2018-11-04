const fs = require('fs')

class User {
    constructor(name, surname, username, password) {
        this.id = Date.now()
        this.name = name
        this.surname = surname
        this.username = username
        this.password = password
        this.postits = []
    }

    save() {
        let json = fs.readFileSync(User._file)

        const users = JSON.parse(json)

        // const user = users.find(user => user.id === this.id)

        // if (!user) users.push(this)
        // else {
        //     user.name = this.name
        //     user.surname = this.surname
        //     user.username = this.username
        //     user.password = this.password
        // }

        const index = users.findIndex(user => user.id === this.id)

        if (index < 0) users.push(this)
        else users[index] = this

        json = JSON.stringify(users)

        fs.writeFileSync(User._file, json)
    }

    savePostits(userId, text) {
        debugger
        const user= User.findById(userId)
        const postit = new Postits(text)
        this.postits=user.postits
        this.postits.push(postit)
        this.save()
        }

    static findByUsername(username) {
        const json = fs.readFileSync(User._file)

        const users = JSON.parse(json)

        const user = users.find(user => user.username === username)

        // TODO is user an instance of User?

        return user
    }

    static findById(id) {
        const json = fs.readFileSync(User._file)

        const users = JSON.parse(json)

        const user = users.find(user => user.id === id)

        // TODO is user an instance of User?

        return user
    }

}

class Postits {
    constructor(text) {
        this.id = new Date()
        this.text = text
    }
}

User._file = './data/users.json'

module.exports = User