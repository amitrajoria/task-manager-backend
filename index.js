const express = require("express");
const cors = require("cors");
const { connection } = require("./config/DB");
const { AuthController } = require("./routes/auth.route");
const { SubTaskController } = require("./routes/subTask.route");
const { TagController } = require("./routes/tag.route");
const { taskController } = require("./routes/task.route");
const { ProfileController } = require("./routes/profile.route");


const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.status('200').send({msg : "Task Manager APIs Working"});
})

app.use("/auth", AuthController);

app.use('/tasks', taskController);

app.use('/tags', TagController);

app.use('/subtasks', SubTaskController);

app.use('/profile', ProfileController);

app.listen('8080', async () => {
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log("Problem in DB connection ", error.message);
    }
    console.log("Server listening on PORT 8080");
})