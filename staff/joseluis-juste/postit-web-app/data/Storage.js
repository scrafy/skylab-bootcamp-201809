let fs = require('fs')
let User = require('../data/user')

class Storage {

    constructor() {

    }

    save = function (model) {

        return new Promise((resolve, reject) => {

            fs.readFile(`../files/${model.PathFile()}`, (err, data) => {

                if (err) reject(err)
                else {
                    try {
                        data = JSON.parse(data)
                        data = data.map(item => model.getDataFromPlainObject(item))
                        let found = data.find(_item => _item.Id === model.Id)
                        if (!found) {
                            model.validateModel()
                            if (!model.HasErrors) {
                                data.push(model)
                                fs.writeFile(`../files/${model.PathFile()}`, JSON.stringify(data), err => {

                                    if (err) reject(err)
                                    else {
                                        resolve(true)
                                    }

                                })

                            }
                            else{
                                reject("The model has validation errors")
                            }
                        } else {
                            this.update(model)
                        }

                    } catch (error) {
                        reject(error)
                    }
                }// end else

            })

        })

    }

    update = function (model) {

        return new Promise((resolve, reject) => {

            fs.readFile(`../files/${model.PathFile()}`, (err, data) => {

                if (err) reject(err)
                else {
                    try {
                        data = JSON.parse(data)
                        data = data.map(item => model.getDataFromPlainObject(item))
                        let index = data.indexOf(item => item.Id === model.Id)
                        if (index < 0) {
                            reject("Can not update an inexisting model")
                        } else {
                            model.validateModel()
                            if (!model.HasErrors) {
                                data[index] = model
                                //users[index].Id = user.Id
                                fs.writeFile(`../files/${model.PathFile()}`, JSON.stringify(data), err => {

                                    if (err) reject(err)
                                    else {
                                        resolve(true)
                                    }

                                })

                            }else{
                                reject("The model has validation errors")
                            }
                        }

                    } catch (error) {
                        reject(error)
                    }
                }// end else

            })

        })

    }
}