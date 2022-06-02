const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a valid title"],
  },
  description: {
    type: String,
    // required: [true, 'Please add a valid description']
  },
  duration: {
    type: Number,
    // required: [true, 'Please add a valid duration']
  },
  type: {
    type: String,
    // required: [true, 'Please add a valid type']
  },
  startDate: {
    type: String,
    // required: [true, 'Please add a valid client phone number']
  },
})

module.exports = mongoose.model("Task", TaskSchema)
