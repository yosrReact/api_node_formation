const express = require('express')
const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteOrder
} = require('../controllers/contacts')

const router = express.Router({ mergeParams: true })

const { protect } = require('../middleware/auth')


// router.use(protect)

router
  .route('/')
  .get(getContacts)
  .post(createContact)

router
  .route('/:id')
  .get(getContact)
  .put(updateContact)
  .delete(deleteOrder)

module.exports = router
