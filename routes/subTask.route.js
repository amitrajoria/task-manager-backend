const { authentication } = require("../middlewares/authentication");
const { SubTaskModel } = require("../models/SubTask.model");
const {Router} = require("express");

const SubTaskController = Router();

SubTaskController.get('/:taskId', authentication, async (req, res) => {
    const userId = req.userId;
    const taskId = req.params.taskId
    const subTasks = await SubTaskModel.find({taskId, userId});
    res.status('200').send({subTasks});
})

SubTaskController.post('/:taskId/create', authentication, async (req, res) => {
    const userId = req.userId;
    const taskId = req.params.taskId
    const payload = {
        ...req.body,
        userId,
        taskId
    }
    const subTask = new SubTaskModel(payload);
    await subTask.save();
    res.status('201').send({msg : "SubTask Created"});
})

SubTaskController.patch('/:taskId/edit/:subTaskId', authentication, async (req, res) => {
    const userId = req.userId;
    const taskId = req.params.taskId;
    const subTaskId = req.params.subTaskId;
    const payload = req.body;
    const subtask = await SubTaskModel.findOneAndUpdate({_id:subTaskId, userId, taskId}, payload);
    if(subtask)
        res.status('200').send({msg : "Subtask Updated"});
    else 
        res.status('404').send({msg : "Subtask not found"});
})

SubTaskController.delete('/:taskId/delete/:subTaskId', authentication, async (req, res) => {
    const userId = req.userId;
    const taskId = req.params.taskId
    const subTaskId = req.params.subTaskId;
    const isDeleted = await SubTaskModel.findByIdAndDelete({_id : subTaskId, taskId, userId});
    if(isDeleted)
        res.status('200').send({msg : "Subtask Deleted"});
    else 
        res.status('404').send({msg : "Subtask not found"});
})

module.exports = {
    SubTaskController
}