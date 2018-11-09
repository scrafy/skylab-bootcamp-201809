'use strict'


class BaseController {

    constructor(){
        this.genericresponse = use("GenericResponse")         
    }

    sendResponse(response, data){

        if (data)
            this.genericresponse.data = data
        
        this.genericresponse.status = "OK"
        response.send(this.genericresponse)
    }
}

module.exports = BaseController
