const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];

        const decodeToken = jwt.verify(token,process.env.SECRET_KEY);
        req.userId = decodeToken.userId;

        next();
    }catch(error){
        res.status(401).send({
            message: "Token expired or invalid. Please login again.",
            success: false
        });
    }
}