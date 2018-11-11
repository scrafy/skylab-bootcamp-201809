require('isomorphic-fetch')
import ValidationError from './exceptions/validationexception'

class ServiceBackEnd{

    constructor(){

         this.endpoint = "localhost:3333/api/"
    }

    registerUser(user){
        
        return fetch(`${this.endpoint}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
                //'Authorization': 'Bearer ' + this.token
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then((res) => {
                
                if(res.status === "OK") return res
                
                if (res.validationErrors)
                    throw new ValidationError(res.error, res.validationErrors)

                throw new Error(res.error)         

                
            })
        
    }

    loginUser(username, password){

        return fetch(`${this.endpoint}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
                //'Authorization': 'Bearer ' + this.token
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then((res) => {
                
                if(res.status === "OK"){
                    
                } 
                
                if (res.validationErrors)
                    throw new ValidationError(res.error, res.validationErrors)

                throw new Error(res.error)         

                
            })
        
    }

}