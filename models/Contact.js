const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a valid client name']
  },
  description: {
    type: String,
    required: [true, 'Please add a valid client address']
  },
  duration: {
    type: Number,
    required: [true, 'Please add a valid client phone number']
  },
  type: {
    type: String,
    required: [true, 'Please add a valid client phone number']
  },
  startDate: {
    type: String,
    required: [true, 'Please add a valid client phone number']
  }
})

module.exports = mongoose.model('Contact', ContactSchema)
