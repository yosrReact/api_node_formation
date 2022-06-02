const express = require('express')
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/users')

const router = express.Router({ mergeParams: true })

const { protect, authorize } = require('../middleware/auth')

router.use(protect)

router
  .route('/')
  .get(authorize('admin'), getUsers)
  .post(authorize('admin'), createUser)

router
  .route('/:id')
  .get(getUser)
  .put(authorize('admin'), updateUser)
  .delete(authorize('admin'), deleteUser)

module.exports = router
