const {Schema, model} = require("mongoose");

const subTaskSchema = Schema({
    taskId : String,
    userId : String,
    title : String,
    status : {type : Boolean, enum : [true, false]}
}, {
    versionKey : false,
    timestamps : true
})

const SubTaskModel = model("subTask", subTaskSchema);

module.exports = {
    SubTaskModel
}