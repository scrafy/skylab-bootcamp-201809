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
<<<<<<< HEAD
            debugger
            fs.readFile(User._file, (err, json) => {
                debugger
=======
            fs.readFileSync(User._file, (err, json) => {
>>>>>>> ea429739bf968797505c1d6dae552937bc4ff8f2
                if (err) return reject(err)

                const users = JSON.parse(json)

                const index = users.findIndex(user => user.id === this.id)

                if (index < 0) users.push(this)
                else users[index] = this

                json = JSON.stringify(users)

                fs.writeFileSync(User._file, json, (err) => {
                    if (err) return reject(err)

<<<<<<< HEAD
                    resolve(json)
=======
                    resolve()
>>>>>>> ea429739bf968797505c1d6dae552937bc4ff8f2
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
<<<<<<< HEAD
            debugger
            User.findById(userId)
                .then(user=>{
                    user.postits.push(postit)
                    user.save()
                } )
=======
            User.findById(userId)
                .then(user=> this.postits=user.postits)
                .then(()=> this.postits.push(postit))
                .then(()=> this.save())
>>>>>>> ea429739bf968797505c1d6dae552937bc4ff8f2
                .then(()=> resolve())
                .catch(err=> reject(err))
        })
    }

    static findByUsername(username) {

        return new Promise((resolve, reject) => {
            fs.readFile(User._file, (err, json) => {
                if (err) return reject(err)
<<<<<<< HEAD
                debugger

=======

                debugger
>>>>>>> ea429739bf968797505c1d6dae552937bc4ff8f2
                const users = JSON.parse(json)

                const user = users.find(user => user.username === username)

<<<<<<< HEAD
=======
                const newUser= Object.assign({}, user)

>>>>>>> ea429739bf968797505c1d6dae552937bc4ff8f2
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