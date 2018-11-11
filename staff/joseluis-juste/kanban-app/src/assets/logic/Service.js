require('isomorphic-fetch')

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
                if(res.error) throw Error (res.error.message)
                return res
            })
        
    }

}