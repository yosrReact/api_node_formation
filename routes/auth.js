const express = require('express')
const {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword
} = require('../controllers/auth')

const router = express.Router()

const { protect, adminRegister, authorize } = require('../middleware/auth')

router.post('/register', adminRegister, register)
router.post('/login', login)
router.get('/logout', protect, logout)
router.get('/me', protect, getMe)
router.put('/updatedetails', protect, authorize('admin'), updateDetails)
router.put('/updatepassword', protect, authorize('admin'), updatePassword)
router.post('/forgotpassword', protect, authorize('admin'), forgotPassword)
router.put(
  '/resetpassword/:resettoken',
  protect,
  authorize('admin'),
  resetPassword
)

module.exports = router
