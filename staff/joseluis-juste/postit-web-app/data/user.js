let Model  = require("./model")

class User extends Model
{
    id
    name
    surname
    email
    phone
    username
    password
    postits
    

    validationRules = {

        id:[
            {
                typeValidation:"type",
                requiredType:"number",
                message:"The id attribute is not of type number"
            }           
        ],
        name:[
            {
                typeValidation:"type",
                requiredType:"string",
                message:"The name attribute is not of type string"
            },
            {
                typeValidation:"exists",
                message:"The name attribute can not be empty or undefined"
            }
        ],
        surname:[
            {
                typeValidation:"type",
                requiredType:"string",
                message:"The surname attribute is not of type string"
            },
            {
                typeValidation:"exists",
                message:"The surname attribute can not be empty or undefined"
            }
        ],
        email:[
            {
                typeValidation:"type",
                requiredType:"string",
                message:"The email attribute is not of type string"
            },
            {
                typeValidation:"exists",
                message:"The email attribute can not be empty or undefined"
            },
            {
                typeValidation:"email",
                message:"The email has not the correct format"
            }
        ],
        phone:[
            {
                typeValidation:"type",
                requiredType:"string",
                message:"The phone attribute is not of type string"
            },
            {
                typeValidation:"exists",
                message:"The phone attribute can not be empty or undefined"
            }          
        ],
        username:[
            {
                typeValidation:"type",
                requiredType:"string",
                message:"The username attribute is not of type string"
            },
            {
                typeValidation:"exists",
                message:"The username attribute can not be empty or undefined"
            }          
        ],
        password:[
            {
                typeValidation:"type",
                requiredType:"string",
                message:"The pasword attribute is not of type string"
            },
            {
                typeValidation:"exists",
                message:"The pasword attribute can not be empty or undefined"
            },
            {
                typeValidation:"minlength",
                minLength: 4,
                message:`The password has to be at least ${minlength} characters long`
            },
            {
                typeValidation:"maxlength",
                maxlength:10,
                message:`The password cant not exceed ${maxlength} characters`
            }            
        ]
    }

    constructor(path_file){
        super(path_file)
        this.postits = []
        this.id = Date.now()
    }

  

    get Id(){

        return this.id
    }

    set Id(value){
        
        this.id = value
       
    }

    get Name(){

        return this.name
    }

    set Name(value){
        
        this.name = value
       
    }

    get Surname(){

        return this.surname
    }

    set Surname(value){
        
        this.surname = value
       
    }

    get Email(){

        return this.email
    }

    set Email(value){
        
        this.email = value
       
    }

    get Phone(){

        return this.phone
    }

    set Phone(value){
        
        this.phone = value
       
    }

    get Username(){

        return this.username
    }

    set Username(value){
        
        this.username = value
       
    }

    get Password(){

        return this.password
    }

    set Password(value){
        
        this.password = value
       
    }

    get Postits(){

        return this.postits
    }

    set Postits(value){
        
        this.postits = value
       
    }


    getDataFromPlainObject = function(obj){

        let user = new User()
        if (typeof obj !== "object") throw TypeError("Error in getDataFromPlainObject: The parameter is not of type object")

        for(var p in obj){
            
            user[p] = obj[p]

        }
        return user
    }
}


module.exports = User