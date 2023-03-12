require('dotenv').config()
var jwt = require('jsonwebtoken')

const authentication = (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async function(err, decoded) {
        if(err) 
            res.status('401').send({msg : "Not authorized"});
        else {
            req.userId = decoded.userId;
            next();
        }
    });
}

module.exports = {
    authentication
}