const {Schema, model} = require("mongoose");

const taskSchema = Schema({
    userId : String,
    title : {type : String, required  :true},
    description : String,
    taskStatus : String,
    tags : [{
        type: String
    }]
}, {
    versionKey : false,
    timestamps : true
})

const TaskModel = model("task", taskSchema);

module.exports = {
    TaskModel
}