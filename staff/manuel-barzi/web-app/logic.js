const { User } = require('./data')

const logic = {
    _users: [new User('Peter', 'Sellers', 'u', 'p')],

    registerUser(name, surname, username, password) {
        if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (typeof surname !== 'string') throw TypeError(`${surname} is not a string`)
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!name.trim()) throw Error('name is empty or blank')
        if (!surname.trim()) throw Error('surname is empty or blank')
        if (!username.trim()) throw Error('username is empty or blank')
        if (!password.trim()) throw Error('password is empty or blank')

        let user = this._users.find(user => user.username === username)

        if (user) throw Error(`username ${username} already registered`)

        user = new User(name, surname, username, password)

        this._users.push(user)
    },

    authenticateUser(username, password) {
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!username.trim()) throw Error('username is empty or blank')
        if (!password.trim()) throw Error('password is empty or blank')

        const user = this._users.find(user => user.username === username && user.password === password)

        if (!user) throw Error('invalid username or password')

        return user.id
    },

    retrieveUser(id) {
        if (typeof id !== 'number') throw TypeError(`${id} is not a number`)

        const user = this._users.find(user => user.id === id)

        if (!user) throw Error(`user with id ${id} not found`)

        const _user = new User(
            user.name,
            user.surname,
            user.username
        )

        _user.id = user.id

        delete _user.password

        return _user
    }
}

module.exports = logic