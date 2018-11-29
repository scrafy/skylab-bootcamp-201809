require('isomorphic-fetch')
const jsdom = require("mocha-jsdom")
const ServiceBackEnd = require('./Service')
const { expect } = require('chai')

global.sessionStorage = require('sessionstorage')


describe('Service', () => {

    let service = null
    beforeEach(() => {
        service = new ServiceBackEnd()
    })

    describe("server", () => {

        it('should fail on incorrect endpoint', () => {

            const user = { name: "John", surname: "Doe", email: "test@gmail.com", phone: "627206369", username: "jd-test", password: "1234" }
            service.setEnPoint("asdasdad")
            return service.registerUser(user).catch(err => {
                expect(true).to.be.true
                service.setEnPoint("http://localhost:3333/api")
            })

        })
    })

    describe('farms', () => {

        let user = null
        let farm = null

        beforeEach(() => {

            farm = { name: "farm", description: "description", maxhives: 5, squaremeters: 45 }

            username = Math.floor(Math.random() * 5000) + 1000
            email = `mail-${Math.floor(Math.random() * 5000) + 1000}@terra.es`
            user = { name: "John", surname: "Doe", email: email, phone: "627206369", username: `jd-${username}`, password: "1234" }
            return service.registerUser(user).then(res => {

                return service.loginUser(`jd-${username}`, user.password).then(res => sessionStorage.setItem("token", res.data.token))

            })
        })

        describe("find farm", () => {

            it('should fails using an incorrect token', () => {

                sessionStorage.setItem("token", "asd")
                return service.findFarm(56).catch(err => {

                    expect(err).not.to.be.undefined
                    expect(err.message).to.equal(`E_INVALID_JWT_TOKEN: jwt malformed`)
                })

            })

           it('should fails when the farm´s id does not exists', () => {

                return service.findFarm("asd").catch(err => {

                    expect(err).not.to.be.undefined
                    expect(err.message).to.equal(`The farm with the id asd not exists`)
                })

            })

            it('should fails when the farm does not belongs to the user', () => {

                return service.createFarm(farm).then(_farm => {

                    let user = { name: "John", surname: "Doe", phone: "627206369", password: "1234" }
                    user.username = Math.floor(Math.random() * 5000) + 1000
                    user.email = `mail-${Math.floor(Math.random() * 5000) + 1000}@terra.es`
                    return service.registerUser(user).then(resUser => {

                        return service.loginUser(user.username, user.password).then(res => {
                            sessionStorage.setItem("token", res.data.token)
                           
                            return service.findFarm(_farm.data.farmId).catch(err => {

                                expect(err).not.to.be.undefined
                                expect(err.message).to.equal(`The farm with the id ${_farm.data.farmId} does not belongs to the user with the id ${resUser.data.userId}`)

                            })

                        })

                    })
                })

            })
        })


        describe("update farm", () => {

            it('should fails using an incorrect token', () => {

                sessionStorage.setItem("token", "asd")
                return service.updateFarm({}).catch(err => {

                    expect(err).not.to.be.undefined
                    expect(err.message).to.equal(`E_INVALID_JWT_TOKEN: jwt malformed`)
                })

            })

            it('should fails when trying update a farm does not exists', () => {

                return service.createFarm(farm).then(res => {

                    farm.id = "as"
                    return service.updateFarm(farm).catch(err => {

                        expect(err).not.to.be.undefined
                        expect(err.message).to.equal(`The farm with the id as not exists`)

                    })
                })
            })

            it('should fails when trying update a farm does not belongs to the user', () => {

                return service.createFarm(farm).then(_farm => {

                    let user = { name: "John", surname: "Doe", phone: "627206369", password: "1234" }
                    user.username = Math.floor(Math.random() * 5000) + 1000
                    user.email = `mail-${Math.floor(Math.random() * 5000) + 1000}@terra.es`
                    return service.registerUser(user).then(resUser => {

                        return service.loginUser(user.username, user.password).then(res => {
                            sessionStorage.setItem("token", res.data.token)
                            farm.id = _farm.data.farmId

                            return service.updateFarm(farm).catch(err => {

                                expect(err).not.to.be.undefined
                                expect(err.message).to.equal(`The farm with the id ${farm.id} does not belongs to the user with the id ${resUser.data.userId}`)

                            })

                        })

                    })
                })
            })

            it('should should fails on empty name', () => {

                farm.name = ""
                return service.updateFarm(farm).catch(err => {

                    expect(err).not.to.be.undefined
                    expect(err.validationErrors[0].message).to.equal(`The name field is required`)
                })
            })

            it('should should fails on undefined name', () => {

                delete farm.name
                return service.updateFarm(farm).catch(err => {

                    expect(err).not.to.be.undefined
                    expect(err.validationErrors[0].message).to.equal(`The name field is required`)
                })
            })

            it('should should fails on empty description', () => {

                farm.description = ""
                return service.updateFarm(farm).catch(err => {

                    expect(err).not.to.be.undefined
                    expect(err.validationErrors[0].message).to.equal(`The description field is required`)
                })
            })

            it('should should fails on undefined description', () => {

                delete farm.description
                return service.updateFarm(farm).catch(err => {

                    expect(err).not.to.be.undefined
                    expect(err.validationErrors[0].message).to.equal(`The description field is required`)
                })
            })

            it('should should fails on empty maxhives', () => {

                farm.maxhives = ""
                return service.updateFarm(farm).catch(err => {

                    expect(err).not.to.be.undefined
                    expect(err.validationErrors[0].message).to.equal(`The maxhives field is required`)
                })
            })

            it('should should fails on undefined maxhives', () => {

                delete farm.maxhives
                return service.updateFarm(farm).catch(err => {

                    expect(err).not.to.be.undefined
                    expect(err.validationErrors[0].message).to.equal(`The maxhives field is required`)
                })
            })

            it('should fails if maxhives is not a number', () => {

                farm.maxhives = "asdasd"
                return service.updateFarm(farm).catch(err => {

                    expect(err).not.to.be.undefined
                    expect(err.validationErrors[0].message).to.equal(`The maxhives field is not a number`)
                })
            })

            it('should fails if maxhives does not belongs to 1-100 range', () => {

                farm.maxhives = 101
                return service.updateFarm(farm).catch(err => {

                    expect(err).not.to.be.undefined
                    expect(err.validationErrors[0].message).to.equal(`The maxhives field has to be between 1-100 range`)
                })
            })

            it('should should fails on empty squaremeters', () => {

                farm.squaremeters = ""
                return service.updateFarm(farm).catch(err => {

                    expect(err).not.to.be.undefined
                    expect(err.validationErrors[0].message).to.equal(`The squaremeters field is required`)
                })
            })

            it('should should fails on undefined squaremeters', () => {

                delete farm.squaremeters
                return service.updateFarm(farm).catch(err => {

                    expect(err).not.to.be.undefined
                    expect(err.validationErrors[0].message).to.equal(`The squaremeters field is required`)
                })
            })

            it('should fails if squaremeters is not a number', () => {

                farm.squaremeters = "asdasd"
                return service.updateFarm(farm).catch(err => {

                    expect(err).not.to.be.undefined
                    expect(err.validationErrors[0].message).to.equal(`The squaremeters field is not a number`)
                })
            })

        })//END DESCRIBE UPDATE FARM

        describe("delete farm", () => {

            it('should fails using an incorrect token', () => {

                sessionStorage.setItem("token", "asd")
                return service.deleteFarm(farm).catch(err => {

                    expect(err).not.to.be.undefined
                    expect(err.message).to.equal(`E_INVALID_JWT_TOKEN: jwt malformed`)
                })

            })

            it('should succeed on delete farm', () => {

                return service.createFarm(farm).then(res => {

                    return service.deleteFarm(res.data.farmId).then(res => {

                        expect(true).to.be.true

                    })
                })
            })

            it('should fails when trying delete a farm does not exists', () => {

                return service.createFarm(farm).then(res => {

                    return service.deleteFarm("as").catch(err => {

                        expect(err).not.to.be.undefined
                        expect(err.message).to.equal(`The farm with the id as not exists`)

                    })
                })
            })

            it('should fails when trying delete a farm does not belongs to the user', () => {

                return service.createFarm(farm).then(farm => {

                    let user = { name: "John", surname: "Doe", phone: "627206369", password: "1234" }
                    user.username = Math.floor(Math.random() * 5000) + 1000
                    user.email = `mail-${Math.floor(Math.random() * 5000) + 1000}@terra.es`
                    return service.registerUser(user).then(resUser => {

                        return service.loginUser(user.username, user.password).then(res => {
                            sessionStorage.setItem("token", res.data.token)
                            return service.deleteFarm(farm.data.farmId).catch(err => {

                                expect(err).not.to.be.undefined
                                expect(err.message).to.equal(`The farm with the id ${farm.data.farmId} does not belongs to the user with the id ${resUser.data.userId}`)

                            })

                        })

                    })
                })
            })

        })//END DESCRIBE DELETE FARM


        describe("create farm", () => {

            it('should succeed on create farm with correct data', () => {

                return service.createFarm(farm).then(res => {

                    expect(true).to.be.true
                })
            })

            it('should fails using an incorrect token', () => {

                sessionStorage.setItem("token", "asd")
                return service.createFarm(farm).catch(err => {

                    expect(err).not.to.be.undefined
                    expect(err.message).to.equal(`E_INVALID_JWT_TOKEN: jwt malformed`)
                })

            })

            it('should should fails on empty name', () => {

                farm.name = ""
                return service.createFarm(farm).catch(err => {

                    expect(err).not.to.be.undefined
                    expect(err.validationErrors[0].message).to.equal(`The name field is required`)
                })
            })

            it('should should fails on undefined name', () => {

                delete farm.name
                return service.createFarm(farm).catch(err => {

                    expect(err).not.to.be.undefined
                    expect(err.validationErrors[0].message).to.equal(`The name field is required`)
                })
            })

            it('should should fails on empty description', () => {

                farm.description = ""
                return service.createFarm(farm).catch(err => {

                    expect(err).not.to.be.undefined
                    expect(err.validationErrors[0].message).to.equal(`The description field is required`)
                })
            })

            it('should should fails on undefined description', () => {

                delete farm.description
                return service.createFarm(farm).catch(err => {

                    expect(err).not.to.be.undefined
                    expect(err.validationErrors[0].message).to.equal(`The description field is required`)
                })
            })

            it('should should fails on empty maxhives', () => {

                farm.maxhives = ""
                return service.createFarm(farm).catch(err => {

                    expect(err).not.to.be.undefined
                    expect(err.validationErrors[0].message).to.equal(`The maxhives field is required`)
                })
            })

            it('should should fails on undefined maxhives', () => {

                delete farm.maxhives
                return service.createFarm(farm).catch(err => {

                    expect(err).not.to.be.undefined
                    expect(err.validationErrors[0].message).to.equal(`The maxhives field is required`)
                })
            })

            it('should fails if maxhives is not a number', () => {

                farm.maxhives = "asdasd"
                return service.createFarm(farm).catch(err => {

                    expect(err).not.to.be.undefined
                    expect(err.validationErrors[0].message).to.equal(`The maxhives field is not a number`)
                })
            })

            it('should fails if maxhives does not belongs to 1-100 range', () => {

                farm.maxhives = 101
                return service.createFarm(farm).catch(err => {

                    expect(err).not.to.be.undefined
                    expect(err.validationErrors[0].message).to.equal(`The maxhives field has to be between 1-100 range`)
                })
            })

            it('should should fails on empty squaremeters', () => {

                farm.squaremeters = ""
                return service.createFarm(farm).catch(err => {

                    expect(err).not.to.be.undefined
                    expect(err.validationErrors[0].message).to.equal(`The squaremeters field is required`)
                })
            })

            it('should should fails on undefined squaremeters', () => {

                delete farm.squaremeters
                return service.createFarm(farm).catch(err => {

                    expect(err).not.to.be.undefined
                    expect(err.validationErrors[0].message).to.equal(`The squaremeters field is required`)
                })
            })

            it('should fails if squaremeters is not a number', () => {

                farm.squaremeters = "asdasd"
                return service.createFarm(farm).catch(err => {

                    expect(err).not.to.be.undefined
                    expect(err.validationErrors[0].message).to.equal(`The squaremeters field is not a number`)
                })
            })

        })//END CREATE FARM

    }) //END TEST FARM


    describe('users', () => {

        describe('getuserfarms', () => {

            it('should succeed on get user´s farm', () => {

                username = Math.floor(Math.random() * 5000) + 1000
                email = `mail-${Math.floor(Math.random() * 5000) + 1000}@terra.es`
                let user = { name: "John", surname: "Doe", email: email, phone: "627206369", username: `jd-${username}`, password: "1234" }
                return service.registerUser(user).then(res => {

                    return service.loginUser(user.username, user.password).then(res => {

                        let farm = {

                            name: "farm",
                            description: "description",
                            maxhives: 5,
                            squaremeters: 45
                        }
                        return service.createFarm(farm).then(res => {

                            return service.getUserFarms().then(res => {

                                expect(res.data.length).equal(1)
                            })


                        })
                    })

                })

            })

            it('should succeed get user´s farm with one hive', () => {

                username = Math.floor(Math.random() * 5000) + 1000
                email = `mail-${Math.floor(Math.random() * 5000) + 1000}@terra.es`
                let user = { name: "John", surname: "Doe", email: email, phone: "627206369", username: `jd-${username}`, password: "1234" }
                return service.registerUser(user).then(res => {

                    return service.loginUser(user.username, user.password).then(res => {

                        let farm = {

                            name: "farm",
                            description: "description",
                            maxhives: 5,
                            squaremeters: 45
                        }
                        return service.createFarm(farm).then(res => {

                            let hive = {

                                name: "farm",
                                description: "description",
                                mintemperature: 1,
                                maxtemperature: 100,
                                minhumidity: 1,
                                maxhumidity: 100,
                                beeminvolume: 10000,
                                beemaxvolume: 100000,
                                latitude: 28.4,
                                longitude: 16.4,
                                farm_id: res.data.farmId
                            }
                            return service.createHive(hive).then(res => {

                                return service.getUserFarms().then(res => {

                                    expect(res.data.length).equal(1)
                                    expect(res.data[0].hives.length).equal(1)
                                })

                            })

                        })
                    })

                })

            })

            it('should fails get user farms using an incorrect token', () => {

                username = Math.floor(Math.random() * 5000) + 1000
                email = `mail-${Math.floor(Math.random() * 5000) + 1000}@terra.es`
                let user = { name: "John", surname: "Doe", email: email, phone: "627206369", username: `jd-${username}`, password: "1234" }
                return service.registerUser(user).then(res => {

                    return service.loginUser(user.username, user.password).then(res => {

                        sessionStorage.setItem("token", "asdsadsad")
                        return service.getUserFarms().catch(err => {

                            expect(err).not.to.be.undefined
                            expect(err.message).to.equal(`E_INVALID_JWT_TOKEN: jwt malformed`)
                        })

                    })

                })

            })

        })//END GET USER FARMS

        describe('getuserdata', () => {

            it('should succeed on get data of user', () => {

                username = Math.floor(Math.random() * 5000) + 1000
                email = `mail-${Math.floor(Math.random() * 5000) + 1000}@terra.es`
                service = new ServiceBackEnd()
                let user = { name: "John", surname: "Doe", email: email, phone: "627206369", username: `jd-${username}`, password: "1234" }
                return service.registerUser(user).then(res => {

                    return service.loginUser(user.username, user.password).then(res => {

                        return service.getUserData().then(res => {
                            expect(true).to.be.true
                        })
                    })

                })

            })

            it('should fails getting data of user usging not valid token', () => {

                username = Math.floor(Math.random() * 5000) + 1000
                email = `mail-${Math.floor(Math.random() * 5000) + 1000}@terra.es`
                service = new ServiceBackEnd()
                let user = { name: "John", surname: "Doe", email: email, phone: "627206369", username: `jd-${username}`, password: "1234" }
                return service.registerUser(user).then(res => {

                    return service.loginUser(user.username, user.password).then(res => {
                        sessionStorage.setItem("token", "asdsadsaad")
                        return service.getUserData().catch(err => {
                            expect(err).not.to.be.undefined
                            expect(err.message).to.equal(`E_INVALID_JWT_TOKEN: jwt malformed`)
                        })
                    })

                })

            })

        })//END GET USER DATA


        describe('login', () => {

            it('should succeed login on correct credentials', () => {

                username = Math.floor(Math.random() * 5000) + 1000
                email = `mail-${Math.floor(Math.random() * 5000) + 1000}@terra.es`
                service = new ServiceBackEnd()
                let user = { name: "John", surname: "Doe", email: email, phone: "627206369", username: `jd-${username}`, password: "1234" }
                return service.registerUser(user).then(res => {

                    return service.loginUser(`jd-${username}`, user.password).then(res => {
                        expect(true).to.be.true
                    })

                })

            })

            it('should fail login on incorrect username credential', () => {

                username = Math.floor(Math.random() * 5000) + 1000
                email = `mail-${Math.floor(Math.random() * 5000) + 1000}@terra.es`
                service = new ServiceBackEnd()
                let user = { name: "John", surname: "Doe", email: email, phone: "627206369", username: `jd-${username}`, password: "1234" }
                return service.registerUser(user).then(res => {

                    return service.loginUser(`uisyuigysdughsdk`, user.password).catch(err => {

                        expect(err).not.to.be.undefined
                        expect(err.message).to.equal(`Not exists any user with the credentials provided`)
                    })

                })

            })

            it('should fail login on incorrect password credential', () => {

                username = Math.floor(Math.random() * 5000) + 1000
                email = `mail-${Math.floor(Math.random() * 5000) + 1000}@terra.es`
                service = new ServiceBackEnd()
                let user = { name: "John", surname: "Doe", email: email, phone: "627206369", username: `jd-${username}`, password: "1234" }
                return service.registerUser(user).then(res => {

                    return service.loginUser(`jd-${username}`, `5655ssss`).catch(err => {

                        expect(err).not.to.be.undefined
                        expect(err.message).to.equal(`Not exists any user with the credentials provided`)
                    })

                })

            })

        })//END LOGIN

        describe('register', () => {

            it('should succeed on correct data', () => {

                const user = { name: "John", surname: "Doe", email: "test@gmail.com", phone: "627206369", username: "jd-test", password: "1234" }
                return service.registerUser(user)
                    .then(() => expect(true).to.be.true)
            })

            it('should fail on trying to register twice same username', () => {

                const user = { name: "John", surname: "Doe", email: "test1@gmail.com", phone: "627206369", username: `jd-test1`, password: "1234" }
                return service.registerUser(user)
                    .then(() => {

                        user.email = "test2@gmail.com"
                        return service.registerUser(user).catch(err => {
                            expect(err).not.to.be.undefined
                            expect(err.validationErrors[0].message).to.equal(`Exists an user with the same username`)
                        })
                    })
            })

            it('should fail on trying to register twice same email', () => {

                const user = { name: "John", surname: "Doe", email: "test3@gmail.com", phone: "627206369", username: `jd-test2`, password: "1234" }
                return service.registerUser(user)
                    .then(() => {

                        user.username = "jd-test2"
                        return service.registerUser(user).catch(err => {

                            expect(err).not.to.be.undefined
                            expect(err.validationErrors[0].message).to.equal(`Email address in use`)
                        })
                    })
            })

            it('should fail on undefined name', () => {

                const user = { surname: "Doe", email: "test4@gmail.com", phone: "627206369", username: `jd-test3`, password: "1234" }
                return service.registerUser(user)
                    .catch(err => {

                        expect(err).not.to.be.undefined
                        expect(err.validationErrors[0].message).to.equal(`The name field is required`)
                    })
            })

            it('should fail on empty name', () => {

                const user = { name: "", surname: "Doe", email: "test4@gmail.com", phone: "627206369", username: `jd-test3`, password: "1234" }
                return service.registerUser(user)
                    .catch(err => {

                        expect(err).not.to.be.undefined
                        expect(err.validationErrors[0].message).to.equal(`The name field is required`)
                    })
            })

            it('should fail on undefined surname', () => {

                const user = { name: "John", email: "test4@gmail.com", phone: "627206369", username: `jd-test3`, password: "1234" }
                return service.registerUser(user)
                    .catch(err => {

                        expect(err).not.to.be.undefined
                        expect(err.validationErrors[0].message).to.equal(`The surname field is required`)
                    })
            })

            it('should fail on empty surname', () => {

                const user = { name: "John", surname: "", email: "test4@gmail.com", phone: "627206369", username: `jd-test3`, password: "1234" }
                return service.registerUser(user)
                    .catch(err => {

                        expect(err).not.to.be.undefined
                        expect(err.validationErrors[0].message).to.equal(`The surname field is required`)
                    })
            })

            it('should fail on undefined email', () => {

                const user = { name: "John", surname: "Doe", phone: "627206369", username: `jd-test3`, password: "1234" }
                return service.registerUser(user)
                    .catch(err => {

                        expect(err).not.to.be.undefined
                        expect(err.validationErrors[0].message).to.equal(`The email field is required`)
                    })
            })

            it('should fail on empty email', () => {

                const user = { name: "John", surname: "Doe", email: "", phone: "627206369", username: `jd-test3`, password: "1234" }
                return service.registerUser(user)
                    .catch(err => {

                        expect(err).not.to.be.undefined
                        expect(err.validationErrors[0].message).to.equal(`The email field is required`)
                    })
            })

            it('should fail on incorrect format email', () => {

                const user = { name: "John", surname: "Doe", email: "asdsadsadad", phone: "627206369", username: `jd-test3`, password: "1234" }
                return service.registerUser(user)
                    .catch(err => {

                        expect(err).not.to.be.undefined
                        expect(err.validationErrors[0].message).to.equal(`The email has not the correct format`)
                    })
            })

            it('should fail on undefined phone', () => {

                const user = { name: "John", surname: "Doe", email: "test4@gmail.com", username: `jd-test3`, password: "1234" }
                return service.registerUser(user)
                    .catch(err => {

                        expect(err).not.to.be.undefined
                        expect(err.validationErrors[0].message).to.equal(`The phone field is required`)
                    })
            })

            it('should fail on empty phone', () => {

                const user = { name: "John", surname: "Doe", email: "test4@gmail.com", phone: "", username: `jd-test3`, password: "1234" }
                return service.registerUser(user)
                    .catch(err => {

                        expect(err).not.to.be.undefined
                        expect(err.validationErrors[0].message).to.equal(`The phone field is required`)
                    })
            })

            it('should fail on undefined username', () => {

                const user = { name: "John", surname: "Doe", email: "test4@gmail.com", phone: "625987452", password: "1234" }
                return service.registerUser(user)
                    .catch(err => {

                        expect(err).not.to.be.undefined
                        expect(err.validationErrors[0].message).to.equal(`The username field is required`)
                    })
            })

            it('should fail on empty username', () => {

                const user = { name: "John", surname: "Doe", email: "test4@gmail.com", phone: "62720369", username: ``, password: "1234" }
                return service.registerUser(user)
                    .catch(err => {

                        expect(err).not.to.be.undefined
                        expect(err.validationErrors[0].message).to.equal(`The username field is required`)
                    })
            })


            it('should fail on undefined password', () => {

                const user = { name: "John", surname: "Doe", email: "test4@gmail.com", username: "asd", phone: "625987452" }
                return service.registerUser(user)
                    .catch(err => {

                        expect(err).not.to.be.undefined
                        expect(err.validationErrors[0].message).to.equal(`The password field is required`)
                    })
            })

            it('should fail on empty password', () => {

                const user = { name: "John", surname: "Doe", email: "test4@gmail.com", phone: "62720369", username: `asdasdasd`, password: "" }
                return service.registerUser(user)
                    .catch(err => {

                        expect(err).not.to.be.undefined
                        expect(err.validationErrors[0].message).to.equal(`The password field is required`)
                    })
            })

            it('should fail on when send password with less of 4 characters', () => {

                const user = { name: "John", surname: "Doe", email: "test4@gmail.com", phone: "62720369", username: `asdasdasd`, password: "123" }
                return service.registerUser(user)
                    .catch(err => {

                        expect(err).not.to.be.undefined
                        expect(err.validationErrors[0].message).to.equal(`The password field has to have four characters of minimun length`)
                    })
            })

        })

        /*****************************UPDATE********************************/

        describe('update', () => {

            let user = null
            let username = null

            beforeEach(() => {

                username = Math.floor(Math.random() * 5000) + 1000
                email = `mail-${Math.floor(Math.random() * 5000) + 1000}@terra.es`
                service = new ServiceBackEnd()
                user = { name: "John", surname: "Doe", email: email, phone: "627206369", username: `jd-${username}`, password: "1234" }
                return service.registerUser(user).then(res => {

                    return service.loginUser(`jd-${username}`, user.password).then(res => sessionStorage.setItem("token", res.data.token))

                })
            })

            it('should fails on incorrect token', () => {

                user.email = `mail-${Math.floor(Math.random() * 5000) + 1000}@terra.es`
                user.username = `js-${Math.floor(Math.random() * 5000) + 1000}`
                sessionStorage.setItem("token", "asdasd")
                return service.updateUser(user)
                    .catch(err => {
                        expect(err).not.to.be.undefined
                        expect(err.message).to.equal(`E_INVALID_JWT_TOKEN: jwt malformed`)
                    })
            })

            it('should succeed update on correct data', () => {

                user.email = `mail-${Math.floor(Math.random() * 5000) + 1000}@terra.es`
                user.username = `js-${Math.floor(Math.random() * 5000) + 1000}`

                return service.updateUser(user)
                    .then(res => {
                        expect(true).to.be.true
                    })
            })

            it('should fail update on empty name', () => {

                user.name = ""
                return service.updateUser(user)
                    .catch(err => {
                        expect(err).not.to.be.undefined
                        expect(err.validationErrors[0].message).to.equal(`The name field is required`)
                    })
            })

            it('should fail update on undefined name', () => {

                delete user.name
                return service.updateUser(user)
                    .catch(err => {
                        expect(err).not.to.be.undefined
                        expect(err.validationErrors[0].message).to.equal(`The name field is required`)
                    })
            })

            it('should fail update on empty surname', () => {

                user.surname = ""
                return service.updateUser(user)
                    .catch(err => {
                        expect(err).not.to.be.undefined
                        expect(err.validationErrors[0].message).to.equal(`The surname field is required`)
                    })
            })

            it('should fail update on undefined surname', () => {

                delete user.surname
                return service.updateUser(user)
                    .catch(err => {
                        expect(err).not.to.be.undefined
                        expect(err.validationErrors[0].message).to.equal(`The surname field is required`)
                    })
            })

            it('should fail update on empty email', () => {

                user.email = ``
                return service.updateUser(user)
                    .catch(err => {
                        expect(err).not.to.be.undefined
                        expect(err.validationErrors[0].message).to.equal(`The email field is required`)
                    })
            })

            it('should fail update on undefined email', () => {


                delete user.email
                return service.updateUser(user)
                    .catch(err => {
                        expect(err).not.to.be.undefined
                        expect(err.validationErrors[0].message).to.equal(`The email field is required`)
                    })
            })

            it('should fail update on incorrect format email', () => {


                user.email = `mail-${Math.floor(Math.random() * 5000) + 1000}terra.es`
                return service.updateUser(user)
                    .catch(err => {
                        expect(err).not.to.be.undefined
                        expect(err.validationErrors[0].message).to.equal(`Email address has not a correct format`)
                    })
            })

            it('should fail update on existing email', () => {

                const _user = {}
                _user.name = "tito"
                _user.surname = "wqewqe"
                _user.email = `mail-${Math.floor(Math.random() * 5000) + 1000}@terra.es`
                _user.phone = "88888888"
                _user.username = `js-${Math.floor(Math.random() * 5000) + 1000}`
                _user.password = "1234"
                return service.registerUser(_user).then(res => {

                    return service.loginUser(_user.username, _user.password).then(res => {

                        sessionStorage.setItem("token", res.data.token)
                        _user.email = user.email
                        return service.updateUser(_user).catch(err => {

                            expect(err).not.to.be.undefined
                            expect(err.validationErrors[0].message).to.equal(`Email address in use`)

                        })
                    })
                })

            })

            it('should fail update on empty phone', () => {

                user.phone = ``
                return service.updateUser(user)
                    .catch(err => {
                        expect(err).not.to.be.undefined
                        expect(err.validationErrors[0].message).to.equal(`The phone field is required`)
                    })
            })

            it('should fail update on undefined phone', () => {


                delete user.phone
                return service.updateUser(user)
                    .catch(err => {
                        expect(err).not.to.be.undefined
                        expect(err.validationErrors[0].message).to.equal(`The phone field is required`)
                    })
            })

            it('should fail update on empty username', () => {

                user.username = ``
                return service.updateUser(user)
                    .catch(err => {
                        expect(err).not.to.be.undefined
                        expect(err.validationErrors[0].message).to.equal(`The username field is required`)
                    })
            })

            it('should fail update on undefined username', () => {


                delete user.username
                return service.updateUser(user)
                    .catch(err => {
                        expect(err).not.to.be.undefined
                        expect(err.validationErrors[0].message).to.equal(`The username field is required`)
                    })
            })

            it('should fail update on existing username', () => {

                const _user = {}
                _user.name = "tito"
                _user.surname = "wqewqe"
                _user.email = `mail-${Math.floor(Math.random() * 5000) + 1000}@terra.es`
                _user.phone = "88888888"
                _user.username = `js-${Math.floor(Math.random() * 5000) + 1000}`
                _user.password = "1234"
                return service.registerUser(_user).then(res => {

                    return service.loginUser(_user.username, _user.password).then(res => {

                        sessionStorage.setItem("token", res.data.token)
                        _user.username = user.username
                        return service.updateUser(_user).catch(err => {

                            expect(err).not.to.be.undefined
                            expect(err.validationErrors[0].message).to.equal(`Exists an user with the same username`)

                        })
                    })
                })

            })

            it('should fail update on empty password', () => {

                user.password = ``
                return service.updateUser(user)
                    .catch(err => {
                        expect(err).not.to.be.undefined
                        expect(err.validationErrors[0].message).to.equal(`The password field is required`)
                    })
            })

            it('should fail update on undefined password', () => {


                delete user.password
                return service.updateUser(user)
                    .catch(err => {
                        expect(err).not.to.be.undefined
                        expect(err.validationErrors[0].message).to.equal(`The password field is required`)
                    })
            })

            it('should fail if the user sends a different password', () => {

                user.password = "12ssss34"
                return service.updateUser(user).then(res => {
                    expect(false).to.be.true
                })
                    .catch(err => {
                        expect(err).not.to.be.undefined
                        expect(err.validationErrors[0].message).to.equal(`The user´s password is incorrect`)
                    })
            })

            it('should fail if the user sends a newpassword different to confirmpasword', () => {

                user.newpassword = "12345"
                user.confirmpassword = "123454"
                return service.updateUser(user).then(res => {
                    expect(false).to.be.true
                })
                    .catch(err => {
                        expect(err).not.to.be.undefined
                        expect(err.validationErrors[0].message).to.equal(`The newpassword does not match with confirmpassword value`)
                    })
            })

        })


    }) //END DESCRIBE USERS

})