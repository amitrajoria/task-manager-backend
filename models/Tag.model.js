const {Schema, model} = require("mongoose");

const tagSchema = Schema({
    tag : {type : String, required : true}
}, {
    versionKey : false,
    timestamps : true
})

const TagModel = model("tag", tagSchema);

module.exports = {
    TagModel
}