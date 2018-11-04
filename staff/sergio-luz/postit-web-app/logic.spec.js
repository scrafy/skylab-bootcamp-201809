const fs = require('fs')
const { User } = require('./data')
const logic = require('./logic')

const { expect } = require('chai')

// running test from CLI
// normal -> $ mocha src/logic.spec.js --timeout 10000
// debug -> $ mocha debug src/logic.spec.js --timeout 10000

describe('logic', () => {
    describe('users', () => {
        before(() => {
            User._file = './data/users.spec.json'
        })

        describe('register', () => {
            let name, surname, username, password

            beforeEach(() => {
                fs.writeFileSync(User._file, JSON.stringify([]))

                name = `name-${Math.random()}`
                surname = `surname-${Math.random()}`
                username = `username-${Math.random()}`
                password = `password-${Math.random()}`
            })

            it('should succeed on correct data', () => {
                logic.registerUser(name, surname, username, password)
                    .then(() => {
                        const json = fs.readFileSync(User._file)

                        const users = JSON.parse(json)

                        const [user] = users

                        expect(user.name).to.equal(name)
                        expect(user.surname).to.equal(surname)
                        expect(user.username).to.equal(username)
                        expect(user.password).to.equal(password)
                    })
            })

            it('should fail on trying to register twice same user', () => {
                const username = `jd-${Math.random()}`
                let error

                logic.registerUser('John', 'Doe', username, '123')
                    .catch(err => error = err)
                    .then(() => logic.registerUser('John', 'Doe', username, '123')
                        .catch(err => {
                            expect(err).not.to.be.undefined
                            expect(err.message).to.equal(`user with username "${username}" already exists`)
                        }))

            })

            it('should fail on undefined name', () => {
                expect(() => logic.registerUser(undefined, surname, username, password)).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on null name', () => {
                expect(() =>
                    logic.registerUser(null, 'Doe', 'jd', '123')
                ).to.throw(TypeError, 'null is not a string')
            })

            it('should fail on object name', () => {
                expect(() =>
                    logic.registerUser({}, 'Doe', 'jd', '123')
                ).to.throw(TypeError, '[object Object] is not a string')
            })

            it('should fail on empty name', () => {
                expect(() =>
                    logic.registerUser('      ', 'Doe', 'jd', '123')
                ).to.throw(Error, 'name is empty or blank')
            })

            it('should fail on undefined surname', () => {
                expect(() =>
                    logic.registerUser('Jhon', undefined, 'jd', '123')
                ).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on null surname', () => {
                expect(() =>
                    logic.registerUser('Jhon', null, 'jd', '123')
                ).to.throw(TypeError, 'null is not a string')
            })

            it('should fail on object surname', () => {
                expect(() =>
                    logic.registerUser('Jhon', {}, 'jd', '123')
                ).to.throw(TypeError, '[object Object] is not a string')
            })

            it('should fail on empty surname', () => {
                expect(() =>
                    logic.registerUser('Jhon', '      ', 'jd', '123')
                ).to.throw(Error, 'surname is empty or blank')
            })

            it('should fail on undefined username', () => {
                expect(() =>
                    logic.registerUser('Jhon', 'Doe', undefined, '123')
                ).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on null username', () => {
                expect(() =>
                    logic.registerUser('Jhon', 'Doe', null, '123')
                ).to.throw(TypeError, 'null is not a string')
            })

            it('should fail on object username', () => {
                expect(() =>
                    logic.registerUser('Jhon', 'Doe', {}, '123')
                ).to.throw(TypeError, '[object Object] is not a string')
            })

            it('should fail on empty username', () => {
                expect(() =>
                    logic.registerUser('Jhon', 'Doe', '      ', '123')
                ).to.throw(Error, 'username is empty or blank')
            })

            it('should fail on undefined password', () => {
                expect(() =>
                    logic.registerUser('Jhon', 'Doe', 'jd', undefined)
                ).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on null password', () => {
                expect(() =>
                    logic.registerUser('Jhon', 'Doe', 'jd', null)
                ).to.throw(TypeError, 'null is not a string')
            })

            it('should fail on object password', () => {
                expect(() =>
                    logic.registerUser('Jhon', 'Doe', 'jd', {})
                ).to.throw(TypeError, '[object Object] is not a string')
            })

            it('should fail on empty password', () => {
                expect(() =>
                    logic.registerUser('Jhon', 'Doe', 'jd', '      ')
                ).to.throw(Error, 'password is empty or blank')
            })
            // TODO other test cases
        })

        describe('authenticate', () => {
            let user

            beforeEach(() => {
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })

                fs.writeFileSync(User._file, JSON.stringify([user]))
            })

            it('should authenticate on correct credentials', () => {
                const { username, password } = user

                logic.authenticateUser(username, password)
                    .then(id => {

                        expect(id).to.exist
                        expect(id).to.be.a('number')

                        const json = fs.readFileSync(User._file)

                        const users = JSON.parse(json)

                        const [_user] = users

                        expect(_user.id).to.equal(id)
                    })
                    .catch(err => err)

            })

            it('should fail on undefined username', () => {
                expect(() => {
                    logic.authenticateUser(undefined, user.password)
                }).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on boolean username', () => {
                const username = true

                expect(() =>
                    logic.authenticateUser(username, '123')
                ).to.throw(TypeError, `${username} is not a string`)
            })

            it('should fail on numeric username', () => {
                const username = 123

                expect(() =>
                    logic.authenticateUser(username, '123')
                ).to.throw(TypeError, `${username} is not a string`)
            })

            it('should fail on object username', () => {
                const username = {}

                expect(() =>
                    logic.authenticateUser(username, '123')
                ).to.throw(Error, `[object Object] is not a string`)
            })

            it('should fail on undefined password', () => {
                const password = undefined

                expect(() =>
                    logic.authenticateUser('Jhon', password)
                ).to.throw(Error, `${password} is not a string`)
            })

            it('should fail on boolean password', () => {
                const password = true

                expect(() =>
                    logic.authenticateUser('Jhon', password)
                ).to.throw(Error, `${password} is not a string`)
            })

            it('should fail on numeric password', () => {
                const password = 123

                expect(() =>
                    logic.authenticateUser('Jhon', password)
                ).to.throw(Error, `${password} is not a string`)
            })

            it('should fail on object password', () => {
                const password = {}

                expect(() =>
                    logic.authenticateUser('Jhon', password)
                ).to.throw(Error, `[object Object] is not a string`)
            })

            // TODO other test cases
        })

        describe('retrieve', () => {
            let user

            beforeEach(() => {
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })

                fs.writeFileSync(User._file, JSON.stringify([user]))
            })

            it('should succeed on valid id', () => {
                logic.retrieveUser(user.id)
                    .then(_user => {
                        const { id, name, surname, username, password } = _user

                        expect(id).to.exist
                        expect(id).to.equal(user.id)
                        expect(name).to.equal(user.name)
                        expect(surname).to.equal(user.surname)
                        expect(username).to.equal(user.username)
                        expect(password).to.be.undefined
                    }).catch(err => err)
            })

            it('should fail on undefined id', () => {
                expect(() => {
                    logic.retrieveUser(undefined)
                }).to.throw(TypeError, 'undefined is not a number')
            })

            it('should fail on boolean id', () => {
                const id = true

                expect(() =>
                    logic.retrieveUser(id)
                ).to.throw(TypeError, `${id} is not a number`)
            })

            it('should fail on string id', () => {
                const id = '123'

                expect(() =>
                    logic.retrieveUser(id)
                ).to.throw(TypeError, `${id} is not a number`)
            })

            it('should fail on object id', () => {
                const id = {}

                expect(() =>
                    logic.retrieveUser(id)
                ).to.throw(Error, `[object Object] is not a number`)
            })

        })

        describe('updatePostits', () => {
            let user

            beforeEach(() => {
                user = new User({
                    name: 'John',
                    surname: 'Doe',
                    username: 'jd',
                    password: '123',
                    postits: {
                        id: '555',
                        text: 'hola mundo'
                    }
                })

                fs.writeFileSync(User._file, JSON.stringify([user]))
            })

            // it('should succeed on correct data', () => {
            //     logic.updatePostits(user.id, 'hellow world', 666)

            //     const { id, name, surname, username, password } = _user

            //     expect(id).to.exist
            //     expect(id).to.equal(user.id)
            //     expect(name).to.equal(user.name)
            //     expect(surname).to.equal(user.surname)
            //     expect(username).to.equal(user.username)
            //     expect(password).to.be.undefined

            // })

            // it('should fail on undefined id', () => {
            //     expect(() => {
            //         logic.retrieveUser(undefined)
            //     }).to.throw(TypeError, 'undefined is not a number')
            // })

            // it('should fail on boolean id', () => {
            //     const id = true

            //     expect(() =>
            //         logic.retrieveUser(id)
            //     ).to.throw(TypeError, `${id} is not a number`)
            // })

            // it('should fail on string id', () => {
            //     const id = '123'

            //     expect(() =>
            //         logic.retrieveUser(id)
            //     ).to.throw(TypeError, `${id} is not a number`)
            // })

            // it('should fail on object id', () => {
            //     const id = {}

            //     expect(() =>
            //         logic.retrieveUser(id)
            //     ).to.throw(Error, `[object Object] is not a number`)
            // })

        })
    })
})
























