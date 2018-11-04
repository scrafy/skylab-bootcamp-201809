const fs = require('fs')

class User {
    constructor(user) {

        const { id, name, surname, username, password , postits} = user

        this.id = id || Date.now()
        this.name = name
        this.surname = surname
        this.username = username
        this.password = password
        this.postits = postits || []
    }

    save() {

        return new Promise((resolve, reject) => {
            
            fs.readFile(User._file, (err, json) => {
                
                if (err) return reject(err)

                const users = JSON.parse(json)

                const index = users.findIndex(user => user.id === this.id)

                if (index < 0) users.push(this)
                else users[index] = this

                json = JSON.stringify(users)

                fs.writeFileSync(User._file, json, (err) => {
                    if (err) return reject(err)

                    resolve(json)
                })
            })
        })
    }

    toObject() {
        const { name, surname, username, password, postits } = this

        return { name, surname, username, password, postits }
    }

    savePostits(userId, text) {

        const postit = new Postits(text)

        return new Promise((resolve, reject)=>{
            User.findById(userId)
                .then(user=>{
                    user.postits.push(postit)
                    user.save()
                } )
                .then(()=> resolve())
                .catch(err=> reject(err))
        })
    }

    static findByUsername(username) {

        return new Promise((resolve, reject) => {
            fs.readFile(User._file, (err, json) => {
                if (err) return reject(err)

                const users = JSON.parse(json)

                const user = users.find(user => user.username === username)

                resolve(user ? new User(user) : undefined)
            })
        })
    }

    static findById(id) {
        
        return new Promise((resolve, reject)=>{
            fs.readFile(User._file, (err, json)=>{
                if(err) return reject(err)

                const users = JSON.parse(json)
        
                const user = users.find(user => user.id === id)

                resolve(user? new User(user): undefined)
            })
        })
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