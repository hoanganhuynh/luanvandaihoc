var express = require('express')
var {
   createsubCategory,
   getsubCategory,
   getsubCategoryById,
   deletesubCategoryById,
   updatesubCategoryById,
   getsubCategoryAd,
} = require('../controllers/subCategoryController.js')
var { admin, protect } = require('../middleware/authMiddleware.js')

const router = express.Router()

router.route('/').post(protect, admin, createsubCategory).get(getsubCategory)

router.route('/adm').get(protect, admin, getsubCategoryAd)

router
   .route('/:id')
   .get(getsubCategoryById)
   .delete(deletesubCategoryById)
   .put(protect, admin, updatesubCategoryById)

module.exports = router
