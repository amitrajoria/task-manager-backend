const {Router} = require("express");
const { UserModel } = require("../models/User.model");
const { authentication } = require("../middlewares/authentication");

const ProfileController = Router();


ProfileController.get('/', authentication,  async (req, res) => {
    const userId = req.userId;
    const user = await UserModel.findOne({_id : userId});
    if(!user)
        res.status('404').send({msg : "Not found"});
    else
        res.status('200').send({user});
}) 


module.exports = {
    ProfileController
}