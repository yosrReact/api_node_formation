const express = require("express")
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks")

const router = express.Router({ mergeParams: true })

const { protect } = require("../middleware/auth")

// router.use(protect)

router.route("/").get(getTasks).post(createTask)

router.route("/:id").get(getTask).put(updateTask).delete(deleteTask)

module.exports = router
