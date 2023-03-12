const {Router} = require("express");
const { TaskModel } = require("../models/Task.model");;
const { validateTask } = require("../middlewares/validateTask");
const { authentication } = require("../middlewares/authentication");

const taskController = Router();


taskController.get('/', authentication, async (req, res) => {
    const userId = req.userId;
    const tasks = await TaskModel.find({userId});
    res.status('200').send({tasks});
})


taskController.post('/create', authentication, validateTask, async (req, res) => {
    const userId = req.userId;
    const payload = {
        ...req.body,
        userId
    }
    const task = new TaskModel(payload);
    await task.save();
    res.status('201').send({msg : "Task created"});
})

taskController.patch('/edit/:taskId', authentication, async (req, res) => {
    const userId = req.userId;
    const taskId = req.params.taskId;
    const payload = req.body;
    const task = await TaskModel.findOneAndUpdate({_id:taskId, userId}, payload);
    if(task)
        res.status('201').send({msg : "Task Updated"});
    else 
        res.status('404').send({msg : "Task not found"});
})


taskController.delete('/delete/:taskId', authentication, async (req, res) => {
    const userId = req.userId;
    const taskId = req.params.taskId;
    const task = await TaskModel.findOneAndDelete({_id:taskId, userId});
    if(task)
        res.status('200').send({msg : "Task Deleted"});
    else 
        res.status('404').send({msg : "Task not found"});
})

module.exports = {
    taskController
}