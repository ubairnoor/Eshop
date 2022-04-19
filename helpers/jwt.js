const expressJwt =  require('express-jwt')

function authJwt(){
    //this function return expressjwt and this function has options
    //the secret is based on some string where we can create our token
    //if the token is based on that secret then cleint has access to API.
    //but the secret is on different secret then API will not work.
    const secret = process.env.secret;
    return expressJwt({
        secret,
        algorithms:['HS256']
}) 

    
}

module.exports = authJwt; 