const Task = require("../models/Task");

const getAllTasks = (query) => {
  return Task.find(query).sort({ createdAt: -1 });
};

const getTaskById = (id) => {
  return Task.findById(id);
};

const createTask = (data) => {
  return Task.create(data);
};

const updateTask = (id, data) => {
  return Task.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true
    }
  );
};

const deleteTask = (id) => {
  return Task.findByIdAndDelete(id);
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};