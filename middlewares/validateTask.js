const validateTask = (req, res, next) => {
    const {title} = req.body;
    if(title?.trim()) 
       next();
    else 
        res.status('400').send({msg : "Title is required to create task"}); 
}

module.exports = {
    validateTask
}