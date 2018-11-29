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

    false && describe("server", () => {

        it('should fail on incorrect endpoint', () => {

            const user = { name: "John", surname: "Doe", email: "test@gmail.com", phone: "627206369", username: "jd-test", password: "1234" }
            service.setEnPoint("asdasdad")
            service.registerUser(user).catch(err => {
                expect(true).to.be.true
                service.setEnPoint("http://localhost:3333/api")
            })

        })
    })

   false && describe('users', () => {

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
                service.registerUser(user)
                    .then(() => expect(true).to.be.true)
            })

            it('should fail on trying to register twice same username', () => {

                const user = { name: "John", surname: "Doe", email: "test1@gmail.com", phone: "627206369", username: `jd-test1`, password: "1234" }
                return service.registerUser(user)
                    .then(() => {

                        user.email = "test2@gmail.com"
                        service.registerUser(user).catch(err => {
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
                        service.registerUser(user).catch(err => {

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