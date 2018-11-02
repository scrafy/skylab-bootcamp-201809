let Model  = require("./model")

class PostIt extends Model
{
    id
    content

    validationRules = {

        id:[
            {
                typeValidation:"type",
                requiredType:"number",
                message:"The id attribute is not of type number"
            }           
        ],
        content:[
            {
                typeValidation:"type",
                requiredType:"string",
                message:"The name attribute is not of type string"
            },
            {
                typeValidation:"exists",
                message:"The name attribute can not be empty or undefined"
            }
        ]
    }

    constructor(){
        this.id = Date.now()
    }

    get Id(){

        return this.id
    }

    set Id(value){
        
        this.id = value
       
    }

    get Content(){

        return this.content
    }

    set Content(value){
        
        this.content = value
       
    }

    getDataFromPlainObject = function(obj){

        let postit = new PostIt()
        if (typeof obj !== "object") throw TypeError("Error in getDataFromPlainObject: The parameter is not of type object")

        for(var p in obj){
            
            postit[p] = obj[p]

        }
        return postit
    }
}

module.exports = PostIt