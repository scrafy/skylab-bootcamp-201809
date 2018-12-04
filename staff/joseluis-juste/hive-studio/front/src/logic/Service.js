import ValidationError from './exceptions/validationexception'
import NotValidSession from './exceptions/notvalidsessionexception'

//const ValidationError = require('./exceptions/validationexception')
//const NotValidSession = require('./exceptions/notvalidsessionexception')

require('isomorphic-fetch')

class ServiceBackEnd {

    constructor() {

        this.endpoint = process.env.REACT_APP_API_ENDPOINT
        // this.endpoint = "http://localhost:3333/api" //descomentar for mocha
    }

    setEnPoint(url) {

        this.endpoint = url
    }

    registerUser(user) {

        return fetch(`${this.endpoint}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                "Accept": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then((res) => {

                if (res.status === "OK") return res

                if (res.validationErrors)

                    throw new ValidationError(res.error, res.validationErrors)

                throw new Error(res.error)


            })
    }

    getUserData() {

        return new Promise((resolve, reject) => {

            const token = this.getTokenSession()
            return fetch(`${this.endpoint}/user/getuserdata`, {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(res => res.json())
                .then((res) => {

                    if (res.status === "OK") return resolve(res)

                    throw new Error(res.error)


                }).catch(err => reject(err))

        })
    }

    updateUser(user) {

        return new Promise((resolve, reject) => {

            const token = this.getTokenSession()
            return fetch(`${this.endpoint}/user`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    "Accept": "application/json",
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(user)
            })
                .then(res => res.json())
                .then((res) => {

                    if (res.status === "OK") return resolve(res)

                    if (res.validationErrors)

                        throw new ValidationError(res.error, res.validationErrors)

                    throw new Error(res.error)


                }).catch(err => { reject(err) })

        })

    }

    uploadImageProfile(file) {

        return new Promise((resolve, reject) => {

            const token = this.getTokenSession()
            const formData = new FormData();
            formData.append('profileimg', file);
            return fetch(`${this.endpoint}/user/uploadimg`, {
                method: 'POST',
                headers: {

                    "Accept": "application/json",
                    'Authorization': 'Bearer ' + token
                },
                body: formData
            })
                .then(res => res.json())
                .then((res) => {

                    if (res.status === "OK") return resolve(res)

                    if (res.validationErrors)

                        throw new ValidationError(res.error, res.validationErrors)

                    throw new Error(res.error)


                }).catch(err => reject(err))

        })

    }

    uploadImageProfileRegister(file) {

        return new Promise((resolve, reject) => {

            const formData = new FormData();
            formData.append('profileimg', file);
            return fetch(`${this.endpoint}/user/uploadimgregister`, {
                method: 'POST',
                headers: {

                    "Accept": "application/json"
                },
                body: formData
            })
                .then(res => res.json())
                .then((res) => {

                    if (res.status === "OK") return resolve(res)

                    if (res.validationErrors)

                        throw new ValidationError(res.error, res.validationErrors)

                    throw new Error(res.error)


                }).catch(err => reject(err))

        })

    }

    loginUser(username, password) {

        return fetch(`${this.endpoint}/user/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                "Accept": "application/json"
            },
            body: JSON.stringify({ username, password })
        })
            .then(res => res.json())
            .then((res) => {

                if (res.status === "OK") {
                    sessionStorage.setItem("token", res.data.token)
                    return res
                }

                if (res.validationErrors)
                    throw new ValidationError(res.error, res.validationErrors)

                throw new Error(res.error)

            })

    }

    getTokenSession() {

        if (!sessionStorage.getItem("token"))
            throw new NotValidSession("The user token is not valid")

        return sessionStorage.getItem("token")
    }

    getUserSession() {

        if (!sessionStorage.getItem("token"))
            throw new NotValidSession("The user token is not valid")

        return JSON.parse(atob(sessionStorage.getItem("token").split(".")[1])).data

    }

    logoutUser() {

        if (sessionStorage.getItem("token")) sessionStorage.clear()
    }

    isLogged() {

        if (sessionStorage.getItem("token")) return true
        return false
    }


    /* HIVE LOGIC */

    createHive(hive) {

        return new Promise((resolve, reject) => {

            const token = this.getTokenSession()
            return fetch(`${this.endpoint}/hive`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    "Accept": "application/json",
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(hive)
            })
                .then(res => res.json())
                .then((res) => {

                    if (res.status === "OK") return resolve(res)

                    if (res.validationErrors)

                        throw new ValidationError(res.error, res.validationErrors)

                    throw new Error(res.error)


                }).catch(err => reject(err))

        })
    }

    updateHive(hive) {

        return new Promise((resolve, reject) => {

            const token = this.getTokenSession()
            return fetch(`${this.endpoint}/hive/${hive.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    "Accept": "application/json",
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(hive)
            })
                .then(res => res.json())
                .then((res) => {

                    if (res.status === "OK") return resolve(res)

                    if (res.validationErrors)

                        throw new ValidationError(res.error, res.validationErrors)

                    throw new Error(res.error)


                }).catch(err => reject(err))

        })
    }

    deleteHive(id) {

        return new Promise((resolve, reject) => {

            const token = this.getTokenSession()
            return fetch(`${this.endpoint}/hive/${id}`, {
                method: 'DELETE',
                headers: {
                    "Accept": "application/json",
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(res => res.json())
                .then((res) => {

                    if (res.status === "OK") return resolve(res)

                    throw new Error(res.error)


                }).catch(err => reject(err))

        })
    }

    stopStartMonitor(id) {

        return new Promise((resolve, reject) => {

            const token = this.getTokenSession()
            return fetch(`${this.endpoint}/hive/${id}`, {
                method: 'PATCH',
                headers: {
                    "Accept": "application/json",
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(res => res.json())
                .then((res) => {

                    if (res.status === "OK") return resolve(res)

                    throw new Error(res.error)


                }).catch(err => reject(err))

        })
    }

    /*****************************************************************************************************************************************/


    /* FARM LOGIC */

    createFarm(farm) {

        return new Promise((resolve, reject) => {

            const token = this.getTokenSession()
            return fetch(`${this.endpoint}/farm`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    "Accept": "application/json",
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(farm)
            })
                .then(res => res.json())
                .then((res) => {

                    if (res.status === "OK") return resolve(res)

                    if (res.validationErrors)

                        throw new ValidationError(res.error, res.validationErrors)

                    throw new Error(res.error)


                }).catch(err => reject(err))

        })
    }

    updateFarm(farm) {

        return new Promise((resolve, reject) => {

            const token = this.getTokenSession()
            return fetch(`${this.endpoint}/farm/${farm.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    "Accept": "application/json",
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(farm)
            })
                .then(res => res.json())
                .then((res) => {

                    if (res.status === "OK") return resolve(res)

                    if (res.validationErrors)

                        throw new ValidationError(res.error, res.validationErrors)

                    throw new Error(res.error)


                }).catch(err => reject(err))

        })
    }

    getUserFarms() {

        return new Promise((resolve, reject) => {

            const token = this.getTokenSession()
            return fetch(`${this.endpoint}/user/getuserfarms`, {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(res => res.json())
                .then((res) => {

                    if (res.status === "OK") return resolve(res)

                    throw new Error(res.error)


                }).catch(err => reject(err))

        })
    }

    deleteFarm(id) {

        return new Promise((resolve, reject) => {

            const token = this.getTokenSession()
            return fetch(`${this.endpoint}/farm/${id}`, {
                method: 'DELETE',
                headers: {
                    "Accept": "application/json",
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(res => res.json())
                .then((res) => {

                    if (res.status === "OK") return resolve(res)

                    throw new Error(res.error)


                }).catch(err => reject(err))

        })
    }

    findFarm(id) {

        return new Promise((resolve, reject) => {

            const token = this.getTokenSession()
            return fetch(`${this.endpoint}/farm/find/${id}`, {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(res => res.json())
                .then((res) => {

                    if (res.status === "OK") return resolve(res)

                    throw new Error(res.error)


                }).catch(err => reject(err))

        })
    }

    /********************************************************************************************************/

    sendChatMessage(chatId, message) {
        return new Promise((resolve, reject) => {

            const token = this.getTokenSession()
            return fetch(`${this.endpoint}/chat/${chatId}`, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    'Authorization': 'Bearer ' + token
                },
                body:JSON.stringify({message:message})
            })
                .then(res => res.json())
                .then((res) => {
                    
                    if (res.status === "OK") return resolve(res)

                    throw new Error(res.error)


                }).catch(err => reject(err))

        })
    }

    getLastMessage(chatId) {
        return new Promise((resolve, reject) => {

            const token = this.getTokenSession()
            return fetch(`${this.endpoint}/chat/${chatId}`, {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(res => res.json())
                .then((res) => {
                    
                    if (res.status === "OK") return resolve(res)

                    throw new Error(res.error)


                }).catch(err => reject(err))

        })
    }

}

export default ServiceBackEnd

//module.exports = ServiceBackEnd