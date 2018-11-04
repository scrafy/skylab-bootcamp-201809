let User = require("../data/user")
let PostIt = require("../data/postit")


const Logic = {

    login(username, password) {

        return new Promise((resolve, reject) => {
            if (typeof username !== "string") throw Error("The username is not a string")
            if (!username.length) throw Error("The username can not be empty")
            if (typeof password !== "string") throw Error("The password is not a string")
            if (!password.length) throw Error("The password can not be empty")
            new User().getAll().then(users => {
                let user = users.find(user => { return user.username === username && user.password === password })
                if (!user)
                    reject("Not exists any user with the provided credentials")
                else
                    resolve(user.id.toString())

            }).catch(err => typeof err === "string" ? reject(err) : reject(err.message))
        })
    },


    register(_user) {

        let user = new User()
        user.getModelFromPlainObject(_user)
        return user.save()
    },

    addPosIt(content, userId) {

        return new Promise((resolve, reject) => {

            if (typeof userId !== "number") throw Error("The userId is not a number")

            let user = new User()
            user.getModelById(userId).then(_user => {
                user.getModelFromPlainObject(_user)
               
                let postit = new PostIt()
                postit.Content = content
                postit.validateModel()
                if (postit.hasErrors) {
                    reject("The postit has validation errors, check the content of the postit is not empty")
                } else {
                    user.Postits.push(postit)
                    user.update().then(res => resolve(res)).catch(err => reject(err))
                }

            }).catch(err => typeof err === "string" ? reject(err) : reject(err.message))
        })

    },

    deletePostIt(userId, postitId) {

        return new Promise((resolve, reject) => {

            if (typeof userId !== "number") throw Error("The userId is not a number")
            if (typeof postitId !== "number") throw Error("The postitId is not a number")

            let user = new User()
            user.getModelById(userId).then(_user => {
                user.getModelFromPlainObject(_user)
               
                if (user.Postits.length === 0) 
                    reject("The user has not any postit")
                else{
                    let index = user.Postits.findIndex(item => item.id === postitId)
                    if (index < 0) {
                        reject("Not exists any postit with the id: " + postitId)
                    }
                    else {

                        user.Postits.splice(index,1)
                        user.update().then(res => resolve(res)).catch(err => reject(err))
                    }
                }
               
            }).catch(err => typeof err === "string" ? reject(err) : reject(err.message))
        })

    },

    editPostit(content, userId, postitId) {
        
        return new Promise((resolve, reject) => {

            if (typeof userId !== "number") throw Error("The userId is not a number")
            if (typeof postitId !== "number") throw Error("The postitId is not a number")
          

            let user = new User()
            user.getModelById(userId).then(_user => {
                user.getModelFromPlainObject(_user)
               
                if (user.Postits.length === 0) 
                    reject("The user has not any postit")
                else{
                    let index = user.Postits.findIndex(item => item.id === postitId)
                    if (index < 0) {
                        reject("Not exists any postit with the id: " + postitId)
                    }
                    else {
                        user.Postits[index].Content = content
                        user.Postits[index].validateModel()
                        if (user.Postits[index].hasErrors) {
                            reject("The postit has validation errors, check the content of the postit is not empty")
                        } else {
                            user.update().then(res => resolve(res)).catch(err => reject(err))
                        }
                        
                    }
                }
               
            }).catch(err => typeof err === "string" ? reject(err) : reject(err.message))
        })

    },

    getUserInf(userId) {
        
        return new Promise((resolve, reject) => {

            if (typeof userId !== "number") throw Error("The userId is not a number")
            
            let user = new User()
            user.getModelById(userId).then(_user => {
                delete _user.password
                resolve(_user)   
               
            }).catch(err => typeof err === "string" ? reject(err) : reject(err.message))
        })

    },

    getUserPostIts(userId) {
        
        return new Promise((resolve, reject) => {

            if (typeof userId !== "number") throw Error("The userId is not a number")
            
            let user = new User()
            user.getModelById(userId).then(_user => {
                resolve(_user.postits)               
            }).catch(err => typeof err === "string" ? reject(err) : reject(err.message))
        })

    },

}

module.exports = Logic