const { User } = require('./data')
const logic = require('./logic')

const { expect } = require('chai')

// running test from CLI
// normal -> $ mocha src/logic.spec.js --timeout 10000
// debug -> $ mocha debug src/logic.spec.js --timeout 10000

describe('logic', () => {
    describe('register', () => {
        let name, surname, username, password

        beforeEach(() => {
            logic._users = []

            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            username = `username-${Math.random()}`
            password = `password-${Math.random()}`
        })

        it('should succeed on correct data', () => {
            logic.registerUser(name, surname, username, password)

            const users = logic._users

            expect(users.length).to.equal(1)

            const [user] = users

            expect(user.name).to.equal(name)
            expect(user.surname).to.equal(surname)
            expect(user.username).to.equal(username)
            expect(user.password).to.equal(password)
        })

        it('should fail on undefined name', () => {
            expect(() => logic.registerUser(undefined, surname, username, password)).to.throw(TypeError, 'undefined is not a string')
        })

        // TODO other test cases
    })

    describe('authenticate', () => {
        let user

        beforeEach(() => {
            user = new User('John', 'Doe', 'jd', '123')

            logic._users = [user]
        })

        it('should authenticate on correct credentials', () => {
            const { username, password } = user

            const id = logic.authenticateUser(username, password)

            expect(id).to.exist
            expect(id).to.be.a('number')

            const [_user] = logic._users

            expect(_user.id).to.equal(id)
        })

        it('should fail on undefined username', () => {
            expect(() => logic.authenticateUser(undefined, user.password)).to.throw(TypeError, 'undefined is not a string')
        })

        // TODO other test cases
    })

    describe('retrieve', () => {
        let user

        beforeEach(() => {
            user = new User('John', 'Doe', 'jd', '123')

            logic._users = [user]
        })

        it('should succeed on valid id', () => {
            const _user = logic.retrieveUser(user.id)

            expect(_user).to.be.instanceof(User)

            const { id, name, surname, username, password } = _user

            expect(id).to.exist
            expect(id).to.equal(user.id)
            expect(name).to.equal(user.name)
            expect(surname).to.equal(user.surname)
            expect(username).to.equal(user.username)
            expect(password).to.be.undefined
        })
    })
})