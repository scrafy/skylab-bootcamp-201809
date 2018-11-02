class Model{

    validationErrors
    hasErrors
    path_file

    get HasErrors(){

        return this.hasErrors
    }

    get ValidationErrors(){

        return this.validationErrors
    }

    get PathFile(){

        return this.path_file
    }

    constructor(path_file){
        this.hasErrors = false
        this.path_file = path_file
    }

    validateModel = function(){

        this.validationErrors = []
        
        for(let p in this){

            if (typeof this[p] === "string" && this[p] !== undefined)
                this[p] = this[p].trim()
        }

        for(let p in this){

            let validationRules = this.validationRules[p]
            validationRules.forEach(rule => {

                switch(rule.typeValidation){

                    case "type":
                        if (typeof this[p] !== rule.requiredType){
                            this.validationErrors.push(rule.message)
                        }
                    break;
                    case "exists":
                        if (this[p] === undefined || !this[p].length){
                            this.validationErrors.push(rule.message)
                        }
                    break;
                    case "email":
                        if (!this[p].match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)[.]{1}([a-zA-Z]{2,5})$/g)){
                            this.validationErrors.push(rule.message)
                        }
                    break;
                    case "maxlength":
                        if (this[p].length > rule.maxlength){
                            this.validationErrors.push(rule.message)
                        }
                    break;
                    case "minlength":
                        if (this[p].length < rule.minLength){
                            this.validationErrors.push(rule.message)
                        }
                    break;
                }
                if (this.validationErrors.length > 0)
                    break

            })            

        }

        if (this.validationErrors.length > 0){
            this.hasErrors = true
        }

    }

    getDataFromPlainObject = function(){

        throw Error("The getDataFromPlainObject method is not implemented by the child")
    }

    save = function(){

    }

    delete = function(){


    }

    update = function(){


    }

    all = function(){

    }
}

module.exports = Model