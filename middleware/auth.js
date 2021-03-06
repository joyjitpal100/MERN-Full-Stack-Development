const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res,next){
    //get tokem fron header

    const token = req.header('x-auth-token');

    //check if not token
    if(!token){
        return res.status(401).json({msg:'No TOken Authorization Denied'})


    }

    //Verify <Token>
    try{
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();

    }
    catch(err){
    res.status(401).json({msg:'Token is not valid'});
    }

}