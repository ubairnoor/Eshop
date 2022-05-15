 function errorHandler(err,req,res,next){
    if(err.name =='UnauthorizedError' ){
        res.status(401).json('The User is not Authorised  ')
    }
    if(err.name =='ValidationError'){
        res.status(401).json({message:err})
    }
    return res.status(500).json(err)

}

module.exports = errorHandler; 