const { Router } = require("express");
const { authentication } = require("../middlewares/authentication");
const { TagModel } = require("../models/Tag.model");

const TagController = Router();

TagController.get("/", authentication, async (req, res) => {
     const tags = await TagModel.find();
     res.status('200').send({tags});
})

TagController.post('/create', authentication, async (req, res) => {
    const payload = req.body;
    const tag = new TagModel(payload);
    await tag.save();
    res.status('201').send({msg : "Tag Created"});
})

module.exports = {
    TagController
}