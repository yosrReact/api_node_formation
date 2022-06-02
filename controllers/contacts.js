const asyncHandler = require('../middleware/async')
const Contact = require('../models/Contact')

// @desc      Get all contacts
// @route     GET /api/v1/contacts
// @access    Private
exports.getContacts = asyncHandler(async (req, res, next) => {
  console.log("**************************************")
  const contacts = await Contact.find()
  console.log("--------------------------------------------")

  res.status(200).json({
    success: true,
    model: contacts
  })
})

// @desc      Get single contact
// @route     GET /api/v1/contacts/:id
// @access    Private
exports.getContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id)

  res.status(200).json({
    success: true,
    model: contact
  })
})

// @desc      Create contact
// @route     POST /api/v1/contacts
// @access    Private
exports.createContact = asyncHandler(async (req, res, next) => {
  const contactFields = {}
  if (req.body.startDate)
    contactFields.startDate = req.body.startDate
  if (req.body.type) contactFields.type = req.body.type
  if (req.body.duration) contactFields.duration = req.body.duration
  if (req.body.description) contactFields.description = req.body.description
  if (req.body.title) contactFields.title = req.body.title

  const newContact = await Contact.create(contactFields)
  res.status(200).json({
    success: true,
    model: newContact
  })
})

// @desc      Update contact
// @route     PUT /api/v1/contacts/:id
// @access    Private
exports.updateContact = asyncHandler(async (req, res, next) => {
  const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  res.status(200).json({
    success: true,
    model: updatedContact
  })
})

// @desc      Delete contact
// @route     DELETE /api/v1/contacts/:id
// @access    Private
exports.deleteOrder = asyncHandler(async (req, res, next) => {
  const deletedContact = await Contact.findByIdAndDelete(req.params.id)

  res.status(200).json({
    success: true,
    model: deletedContact
  })
})
