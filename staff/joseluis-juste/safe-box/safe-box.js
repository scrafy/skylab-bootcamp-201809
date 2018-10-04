function FactorySafeBox(){

    var password = "abc";
    var secret;
    
    return{
        saveSecret:function(_secret, _pass){
            
            if (_pass === "") throw Error("invalid password");

            if (_pass === undefined) throw Error("invalid password");

            if (_pass.trim() === undefined) throw Error("invalid password");

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
