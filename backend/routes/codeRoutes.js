var express = require('express')
const {
   createCode,
   getCode,
   getCodeById,
   updateCodeById,
   deleteCodeById,
} = require('../controllers/codeController.js')

var { admin, protect } = require('../middleware/authMiddleware.js')

const router = express.Router()

router.route('/').get(getCode).post(protect, admin, createCode)

router
   .route('/:id')
   .get(protect, admin, getCodeById)
   .put(protect, admin, updateCodeById)
   .delete(protect, admin, deleteCodeById)

module.exports = router
