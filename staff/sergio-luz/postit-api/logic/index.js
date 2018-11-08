const { User, Postit } = require('../data')
const { AlreadyExistsError, NotFoundError, ValueError } = require('../errors')

const logic = {
    registerUser(name, surname, username, password) {
        if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (typeof surname !== 'string') throw TypeError(`${surname} is not a string`)
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!name.trim()) throw new ValueError('name is empty or blank')
        if (!surname.trim()) throw new ValueError('surname is empty or blank')
        if (!username.trim()) throw new ValueError('username is empty or blank')
        if (!password.trim()) throw new ValueError('password is empty or blank')

        return User.findByUsername(username)
            .then(user => {
                if (user) throw new AlreadyExistsError(`username ${username} already registered`)

                user = new User({ name, surname, username, password })

                return user.save()
            })
    },

    authenticateUser(username, password) {
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!username.trim()) throw new ValueError('username is empty or blank')
        if (!password.trim()) throw new ValueError('password is empty or blank')

        return User.findByUsername(username)
            .then(user => {
                if (!user || user.password !== password) throw Error('invalid username or password')

                return user.id
            })
    },

    retrieveUser(id) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)

        if (!id.trim().length) throw new ValueError('id is empty or blank')

        return User.findById(id)
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${id} not found`)

                const _user = user.toObject()

                _user.id = id

                delete _user.password

                return _user
            })
    },

    modifyUser(id, name, surname, username, newPassword, repeatPassword, password) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)

        if (!id.trim().length) throw new ValueError('id is empty or blank')

        // if (typeof name !== 'string') throw TypeError(`${name} is not a string`)

        // if (typeof surname !== 'string') throw TypeError(`${surname} is not a string`)

        // if (typeof username !== 'string') throw TypeError(`${username} is not a string`)

        // if (typeof newPassword !== 'string') throw TypeError(`${newPassword} is not a string`)

        // if (typeof repeatPassword !== 'string') throw TypeError(`${repeatPassword} is not a string`)

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!password.trim().length) throw new ValueError('password is empty or blank')

        return User.findById(id)
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${id} not found`)

                const oldPassword=user.password

                if(name)
                    user.name=name
                if(surname)
                    user.surname=surname
                if(username)
                    user.username=username

                if(newPassword){
                    if(newPassword!==repeatPassword)
                        throw Error ('New password does not match the repeat password')
                    else{
                        user.password=newPassword
                    }
                }
                if(password===oldPassword){
                   return user.save()}
                else{
                    throw Error ('Password is invalid')
                }

            })
    },

    /**
     * Adds a postit
     * 
     * @param {number} id The user id
     * @param {string} text The postit text
     * 
     * @throws {TypeError} On non-numeric user id, or non-string postit text
     * @throws {Error} On empty or blank postit text
     * 
     * @returns {Promise} Resolves on correct data, rejects on wrong user id
     */
    addPostit(id, text) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)

        if (!id.trim().length) throw new ValueError('id is empty or blank')

        if (typeof text !== 'string') throw TypeError(`${text} is not a string`)

        if (!text.trim().length) throw new ValueError('text is empty or blank')

        return User.findById(id)
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${id} not found`)

                const postit = new Postit({ text })

                user.postits.push(postit)

                return user.save()
            })
    },

    listPostits(id) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)

        if (!id.trim().length) throw new ValueError('id is empty or blank')

        return User.findById(id)
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${id} not found`)

                return user.postits
            })
    },

    /**
     * Removes a postit
     * 
     * @param {number} id The user id
     * @param {number} postitId The postit id
     * 
     * @throws {TypeError} On non-numeric user id, or non-numeric postit id
     * 
     * @returns {Promise} Resolves on correct data, rejects on wrong user id, or postit id
     */
    removePostit(id, postitId) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)

        if (!id.trim().length) throw new ValueError('id is empty or blank')

        if (typeof postitId !== 'string') throw TypeError(`${postitId} is not a string`)

        if (!postitId.trim().length) throw new ValueError('postit id is empty or blank')

        return User.findById(id)
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${id} not found`)

                const { postits } = user

                const index = postits.findIndex(postit => postit.id === postitId)

                if (index < 0) throw new NotFoundError(`postit with id ${postitId} not found in user with id ${id}`)

                postits.splice(index, 1)

                return user.save()
            })
    },

    modifyPostit(id, postitId, text) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        
        if(!id.trim().length) throw new ValueError('is is empty or blank')

        if (typeof postitId !== 'string') throw TypeError(`${postitId} is not a string`)

        if(!postitId.trim().length) throw new ValueError('postit id is empty or blank')

        if(typeof text !== 'string') throw TypeError(`${text} is not a string`)

        if (!text.trim().length) throw new ValueError('text is empty or blank')

        return User.findById(id)
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${id} not found`)

                const { postits } = user

                const postit = postits.find(postit => postit.id === postitId)

                if (!postit) throw new NotFoundError(`postit with id ${postitId} not found in user with id ${id}`)

                postit.text = text

                return user.save()
            })
    }
}

module.exports = logic