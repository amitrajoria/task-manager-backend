const {Router} = require("express");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config()
const { passport } = require("../config/google-oauth");
const { UserModel } = require("../models/User.model");
const { validateAuth } = require("../middlewares/validateAuth");

const AuthController = Router();


AuthController.get('/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

AuthController.get('/google/callback',
    passport.authenticate( 'google', {
        scope: [ 'email', 'profile'],
        session : false,
        failureRedirect: '/login'
}), function(req, res) {
    console.log("REQ ", req.user);
    var token = jwt.sign({ userId: req?.user?._id }, process.env.JWT_SECRET);
    console.log("Toekn ", token);
    res.status('200').send({msg : "LoggedIn Successfull", token : token});
});

AuthController.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email});
    if(!user)
        res.status('401').send({msg : "Invalid Creadentials"});
    else {
        bcrypt.compare(password, user?.password).then(function(result) {
            var token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
            if(!result)
                res.status('401').send({msg : "Invalid Creadentials"});
            else 
                res.status('200').send({msg : "LoggedIn Successfull", token : token});
        });
    }
}) 

AuthController.post('/signup', validateAuth, (req, res) => {
    const {name, email, password} = req.body;
    bcrypt.hash(password, 8).then(async function(hash) {
        const user = new UserModel({name, email, password:hash});
        await user.save();
        res.status('201').send({msg: "Signup Successfull"});
    });
}) 

module.exports = {
    AuthController
}