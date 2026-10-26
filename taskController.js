const mongoose = require("mongoose");
const taskService = require("../services/taskService");

const getTasks = async (req, res) => {
  try {
    const query = {};

    if (req.query.search) {
      query.title = { $regex: req.query.search, $options: "i" };
    }

    if (req.query.completed !== undefined) {
      if (req.query.completed !== "true" && req.query.completed !== "false") {
        return res.status(400).json({
          message: "Completed must be true or false"
        });
      }

      query.completed = req.query.completed === "true";
    }

    const tasks = await taskService.getAllTasks(query);

    res.status(200).json(tasks);
  } catch (error) {
    console.log("Get tasks error:", error);
    res.status(500).json({
      message: "Failed to get tasks"
    });
  }
};

const getTask = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid task id"
      });
    }

    const task = await taskService.getTaskById(id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json(task);
  } catch (error) {
    console.log("Get task error:", error);
    res.status(500).json({
      message: "Failed to get task"
    });
  }
};

const createTask = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "Title is required"
      });
    }

    const task = await taskService.createTask(req.body);

    res.status(201).json(task);
  } catch (error) {
    console.log("Create task error:", error);
    res.status(500).json({
      message: "Failed to create task"
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid task id"
      });
    }

    if (
      req.body.completed !== undefined &&
      typeof req.body.completed !== "boolean"
    ) {
      return res.status(400).json({
        message: "Completed must be true or false"
      });
    }

    const task = await taskService.updateTask(id, req.body);

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json(task);
  } catch (error) {
    console.log("Update task error:", error);
    res.status(500).json({
      message: "Failed to update task"
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid task id"
      });
    }

    const task = await taskService.deleteTask(id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json({
      message: "Task deleted successfully"
    });
  } catch (error) {
    console.log("Delete task error:", error);
    res.status(500).json({
      message: "Failed to delete task"
    });
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
};