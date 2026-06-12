const express = require("express");

const Task = require("../models/Task");

const auth =
require("../middleware/authMiddleware");

const router = express.Router();

// CREATE Task
router.post("/", auth, async (req, res) => {

  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    userId: req.user.id
  });

  await task.save();

  res.json(task);

});


// GET Task
router.get("/", auth, async (req, res) => {

  const tasks =
  await Task.find({
    userId: req.user.id
  });

  res.json(tasks);

});


// UPDATE Task
// UPDATE Task
router.put("/:id", auth, async (req, res) => {

  const task = await Task.findOne({
    _id: req.params.id,
    userId: req.user.id
  });

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  task.title =
    req.body.title || task.title;

  task.description =
    req.body.description || task.description;

  await task.save();

  res.json(task);

});


// DELETE Task
// DELETE Task
router.delete("/:id", auth, async (req, res) => {

  const task = await Task.findOne({
    _id: req.params.id,
    userId: req.user.id
  });

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  await Task.findByIdAndDelete(
    req.params.id
  );

  res.json({
    message: "Task Deleted"
  });

});


module.exports = router;