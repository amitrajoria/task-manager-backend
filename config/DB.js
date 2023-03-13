const mongoose = require("mongoose");
require('dotenv').config()

const connection = mongoose.connect("mongodb+srv://amitrajoria:amitrajoria@amitcluster.x1l0ccx.mongodb.net/task_manager?retryWrites=true&w=majority");

module.exports = {
    connection
}