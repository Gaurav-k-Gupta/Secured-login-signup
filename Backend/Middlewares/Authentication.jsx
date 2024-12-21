const jwt = require('jsonwebtoken');


const ensureAuthenticated = (req,res,next) =>{
    const token = req.headers['authorization'];
    if(!token){
        return res.status(403)
            .json({message : 'Unauthorized! token not found'});
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(err){
        return res.status(403)
            .json({message: 'Token is invalid or expired!'});
    }
}

module.exports = ensureAuthenticated;