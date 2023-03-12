const validateAuth = (req, res, next) => {
    const {name, email, password} = req.body;
    if(name?.trim() && email?.trim() && password?.trim())
        next();
    else 
        res.status('401').send({msg : "All registration fields are required"});
}

module.exports = {
    validateAuth
}