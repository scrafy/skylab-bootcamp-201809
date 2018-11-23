require('dotenv').config()

//mocha data/user.spec.js --timeout 10000

const { MongoClient } = require('mongodb')
const { expect } = require('chai')
const { User } = require('.')

const { env: { MONGO_URL } } = process

describe('User (model)', () => {
    let client, users

    before(() => {
        client = new MongoClient(MONGO_URL, { useNewUrlParser: true })

        return client.connect()
            .then(() => {
                const db = client.db('postit-test')

                users = db.collection('users')

                User._collection = users
            })
    })

    describe('save', () => {
        let name, surname, username, password

        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            username = `username-${Math.random()}`
            password = `password-${Math.random()}`

            return users.deleteMany()
        })

        it('should succeed on correct data', () =>
            new User({ name, surname, username, password }).save()
                .then(() => users.find().toArray())
                .then(_users => {
                    expect(_users.length).to.equal(1)

                    const [user] = _users

                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.username).to.equal(username)
                    expect(user.password).to.equal(password)
                })
        )

        describe('when user already exists', () => {
            let name, surname, username, password, id

            beforeEach(() => {
                name = `name-${Math.random()}`
                surname = `surname-${Math.random()}`
                username = `username-${Math.random()}`
                password = `password-${Math.random()}`

                const user = new User({ name, surname, username, password })

                id = user.id

                return user.save()
            })

            it('should succeed on correct username', () => {
                const newName = `name-${Math.random()}`
                const _user = new User({ id, name: newName, surname, username, password })
                _user.id = id
                return _user.save()
                    .then(() => {
                        return users.find().toArray()
                            .then(_users => {
                                expect(_users.length).to.equal(1)

                               const _user = users[0]

                                expect(_user).to.exist

                                expect(user.name).to.equal(newName)
                                expect(user.surname).to.equal(surname)
                                expect(user.username).to.equal(username)
                                expect(user.password).to.equal(password)
                            })
                    })

            })
        })
    })

    describe('findByUsername', () => {
        let name, surname, username, password

        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            username = `username-${Math.random()}`
            password = `password-${Math.random()}`

            fs.writeFileSync(User._file, JSON.stringify([new User({ name, surname, username, password })]))
        })

        it('should succeed on correct username', () =>
            User.findByUsername(username)
                .then(user => {
                    expect(user).to.exist
                    expect(user).to.be.instanceOf(User)

                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.username).to.equal(username)
                    expect(user.password).to.equal(password)
                })

        )
    })
})