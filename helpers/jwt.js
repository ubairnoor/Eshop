const expressJwt =  require('express-jwt')

function authJwt(){

    //this function return expressjwt and this function has options
    //the secret is based on some string where we can create our token
    //if the token is based on that secret then cleint has access to API.
    //but the secret is on different secret then API will not work.
    const secret = process.env.secret;
    const api =process.env.API_URL;
    return expressJwt({
        secret,
        algorithms:['HS256']
}).unless({
    //This method is used to exclude the Api where we dont need token such as 
    //login Api.for that we have to add the path of that API.
    path:[
        { url:/\/api\/v1\/products(.*)/,methods:['GET','OPTIONS']},
        {url:/\/api\/v1\/categories(.*)/,methods:['GET','OPTIONS']},
        `${api}/users/login`,
        `${api}/users/register`,
        
    ]

}) 

    
}

module.exports = authJwt; 