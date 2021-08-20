var express = require('express')
var {
   createCategories,
   deleteCategoryById,
   getCategory,
   getCategoryAd,
   getCategoryById,
   updateCategoryById,
} = require('../controllers/categoriesController.js')
var { admin, protect } = require('../middleware/authMiddleware.js')

const router = express.Router()

router.route('/').post(protect, admin, createCategories).get(getCategory)

router.route('/adm').get(protect, admin, getCategoryAd)

router
   .route('/:id')
   .get(getCategoryById)
   .delete(deleteCategoryById)
   .put(protect, admin, updateCategoryById)

module.exports = router
