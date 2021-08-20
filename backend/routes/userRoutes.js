var express = require('express')
var {
   authUser,
   createUserAddress,
   deleteUserAddress,
   deleteUsers,
   getUserAddress,
   getUserProfile,
   getUsers,
   getUsersById,
   registerUser,
   updateRoleUserAddress,
   updateUser,
   updateUserAddress,
   updateUserProfile,
} = require('../controllers/userControllers.js')
var { admin, protect } = require('../middleware/authMiddleware.js')

const router = express.Router()

router.post('/login', authUser)
router
   .route('/profile')
   .get(protect, getUserProfile)
   .put(protect, updateUserProfile)
router.route('/').get(getUsers).post(registerUser)
router.route('/createaddress').post(protect, createUserAddress)
router.route('/deleteaddress').post(protect, deleteUserAddress)
router.route('/roleaddress').post(protect, updateRoleUserAddress)
router
   .route('/address')
   .post(protect, updateUserAddress)
   .get(protect, getUserAddress)
router
   .route('/:id')
   .get(protect, getUsersById)
   .delete(protect, admin, deleteUsers)
   .put(protect, admin, updateUser)

module.exports = router
