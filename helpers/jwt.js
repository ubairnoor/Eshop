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
        algorithms:['HS256'],
        //if the user sis admin or not 
        isRevoked:isRevoked
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

async function isRevoked(req,payload,done){
    //what is request.req is what is something to user.
    // the payload contains the data which are inside the token.
    // if the in the payload if there is no admin then reject the token
    //
    if(!payload.isAdmin){
        done(null,true)
    }
    // else if he is admin we can say done without any parameters.
    done();
}

module.exports = authJwt; 