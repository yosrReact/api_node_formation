const asyncHandler = require("../middleware/async")
const Task = require("../models/Task")

// @desc      Get all tasks
// @route     GET /api/v1/tasks
// @access    Private
exports.getTasks = asyncHandler(async (req, res, next) => {
  const tasks = await Task.find()
  res.status(200).json({
    success: true,
    model: tasks,
  })
})

// @desc      Get single task
// @route     GET /api/v1/tasks/:id
// @access    Private
exports.getTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id)
  if (task) {
    res.status(200).json({
      success: true,
      model: task,
    })
  } else {
    res.status(404).json({
      success: false,
      message: "Task doesn't exist!",
    })
  }
})

// @desc      Create task
// @route     POST /api/v1/tasks
// @access    Private
exports.createTask = asyncHandler(async (req, res, next) => {
  const taskFields = {}
  if (req.body.startDate) taskFields.startDate = req.body.startDate
  if (req.body.type) taskFields.type = req.body.type
  if (req.body.duration) taskFields.duration = req.body.duration
  if (req.body.description) taskFields.description = req.body.description
  if (req.body.title) taskFields.title = req.body.title

  const newTask = await Task.create(taskFields)
  res.status(200).json({
    success: true,
    model: newTask,
  })
})

// @desc      Update task
// @route     PUT /api/v1/tasks/:id
// @access    Private
exports.updateTask = asyncHandler(async (req, res, next) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    model: updatedTask,
  })
})

// @desc      Delete task
// @route     DELETE /api/v1/tasks/:id
// @access    Private
exports.deleteTask = asyncHandler(async (req, res, next) => {
  const deletedTask = await Task.findByIdAndDelete(req.params.id)

  res.status(200).json({
    success: true,
    model: deletedTask,
  })
})
