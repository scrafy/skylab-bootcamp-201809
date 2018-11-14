const { User, Postit } = require('../data')
const { AlreadyExistsError, AuthError, NotFoundError, ValueError } = require('../errors')

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

        return User.findOne({ username })
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

        return User.findOne({ username })
            .then(user => {
                if (!user || user.password !== password) throw new AuthError('invalid username or password')
                return user.id
            })
    },

    retrieveUser(id) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)

        if (!id.trim().length) throw new ValueError('id is empty or blank')

        /*
            In the following lines we pass an object as second argument to the User.findById function
            in order to eliminate some properties that we don't want to show
        */
        return User.findById(id, { '_id': 0, 'postits': 0, 'password': 0, '__v': 0 })
            .lean()
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${id} not found`)
                // We have eliminated _id, therefore we add a new id (the one passed to the retrieveUser function)
                user.id = id
                return user
            })
    },

    updateUser(id, newName, newSurname, newUsername, newPassword, password) {



        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (newName != null && typeof newName !== 'string') throw TypeError(`${newName} is not a string`)
        if (newSurname != null && typeof newSurname !== 'string') throw TypeError(`${newSurname} is not a string`)
        if (newUsername != null && typeof newUsername !== 'string') throw TypeError(`${newUsername} is not a string`)
        if (newPassword != null && typeof newPassword !== 'string') throw TypeError(`${newPassword} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!id.trim().length) throw new ValueError('id is empty or blank')
        if (newName != null && !newName.trim().length) throw new ValueError('newName is empty or blank')
        if (newSurname != null && !newSurname.trim().length) throw new ValueError('newSurname is empty or blank')
        if (newUsername != null && !newUsername.trim().length) throw new ValueError('newUsername is empty or blank')
        if (newPassword != null && !newPassword.trim().length) throw new ValueError('newPassword is empty or blank')
        if (!password.trim().length) throw new ValueError('password is empty or blank')


        // return User.findById(id, {'_id': 0, 'postits': 0, 'password': 0, '__v': 0})
        //     .lean()
        //     .then(user => {
        //         if (!user) throw new NotFoundError(`user with id ${id} not found`)
        //         // We have eliminated _id, therefore we add a new id (the one passed to the retrieveUser function)
        //         user.id = id
        //         return user
        //     })

        return User.findById(id)
            .then(user => {

                if (!user) throw new NotFoundError(`user with id ${id} not found`)

                if (user.password !== password) throw new AuthError('invalid password')

                if (newUsername) {

                    return User.find({ 'username': newUsername })
                        .then(_user => {

                            if (_user.length) throw new AlreadyExistsError(`username ${newUsername} already exists`)

                            newName != null && (user.name = newName)
                            newSurname != null && (user.surname = newSurname)
                            user.username = newUsername
                            newPassword != null && (user.password = newPassword)

                            return user.save()
                        })
                        .then(() => undefined)
                } else {
                    newName != null && (user.name = newName)
                    newSurname != null && (user.surname = newSurname)
                    newPassword != null && (user.password = newPassword)

                    return user.save()
                }
            })
            .then(() => undefined)
    },

    /**
     * Adds a postit
     * 
     * @param {string} id The user id
     * @param {string} text The postit text
     * 
     * @throws {TypeError} On non-string user id, or non-string postit text
     * @throws {Error} On empty or blank user id or postit text
     * 
     * @returns {Promise} Resolves on correct data, rejects on wrong user id
     */
    addPostit(userId, text) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw new ValueError('userId is empty or blank')
        if (typeof text !== 'string') throw TypeError(`${text} is not a string`)
        if (!text.trim().length) throw new ValueError('text is empty or blank')

        return User.findById(userId)
            .then(user => {

                if (!user) throw new NotFoundError(`user with id ${id} not found`)

                const postit = new Postit({ text: text, userId: user.id })

                return postit.save()
            })
            .then(() => undefined)
    },

    listPostits(userId) {
        debugger
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)

        if (!userId.trim().length) throw new ValueError('userId is empty or blank')

        return Postit.find({ userId }, { '__v': 0 }).lean()
            .then(postits => postits.map(postit => {
                postit.id = postit._id.toString()
                delete postit._id
                postit.userId = postit.userId.toString()
                return postit
            }))
    },

    /**
     * Removes a postit
     * 
     * @param {string} id The user id
     * @param {string} postitId The postit id
     * 
     * @throws {TypeError} On non-string user id, or non-string postit id
     * @throws {Error} On empty or blank user id or postit text
     * 
     * @returns {Promise} Resolves on correct data, rejects on wrong user id, or postit id
     */
    removePostit(userId, postitId) {

        if (typeof postitId !== 'string') throw TypeError(`${postitId} is not a string`)

        if (!postitId.trim().length) throw new ValueError('postit id is empty or blank')

        
        return Postit.findByIdAndRemove(postitId).lean()
            .then(postit => {
                postit.id = postit._id.toString()
                delete postit._id
                delete postit.__v
                postit.userId = postit.userId.toString()
                return postit
            })
    },

    modifyPostit(postitId, newText) {

        if (typeof postitId !== 'string') throw TypeError(`${postitId} is not a string`)
        if (!postitId.trim().length) throw new ValueError('postit id is empty or blank')

        if (typeof newText !== 'string') throw TypeError(`${newText} is not a string`)
        if (!newText.trim().length) throw new ValueError('newText is empty or blank')

        //A.findOneAndUpdate(conditions, update, options, callback)
        //findByIdAndUpdate
        //return Postit.findOne({ _id: postitId })
        return Postit.findByIdAndUpdate(postitId, { text: newText })
            .then(postit => {
                if(!postit) throw new NotFoundError (`postit with id ${postitId} not found`)
                return undefined
            })
    }
}

module.exports = logic