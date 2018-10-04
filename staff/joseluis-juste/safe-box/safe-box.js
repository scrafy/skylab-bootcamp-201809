function FactorySafeBox(){

    var password = "123";
    var secret;
    
    return{
        saveSecret:function(_secret, _pass){
            
            if (_pass === password){
                secret = _secret;
                return;
            }
            throw Error("invalid password");
        },
        retrieveSecret:function(pass){
            
            if (pass === password)
                return secret;
            
            throw Error("invalid password");
        }
    }
}
