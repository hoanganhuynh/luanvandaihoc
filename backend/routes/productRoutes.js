var express = require('express')
var {
   createProduct,
   createProductReview,
   deleteProduct,
   filterCategoriesProduct,
   filterPriceProduct,
   getAllProduct,
   getCategoriesProduct,
   getProductById,
   getProducts,
   getTopProducts,
   getTopProductsSold,
   newProduct,
   updateProduct,
   getSubCategoriesProduct,
   filterSubCategoriesProduct,
} = require('../controllers/productControllers.js')
var { admin, protect } = require('../middleware/authMiddleware.js')

const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, createProduct)

router.route('/adm').get(protect, admin, getAllProduct)

router.route('/:id/reviews').post(protect, createProductReview)
router.route('/top').get(getTopProducts)
router.route('/topsold').get(getTopProductsSold)
router.route('/:id/category').get(getCategoriesProduct)
router.route('/:id/subcategory').get(getSubCategoriesProduct)

router.route('/filter/category').post(filterCategoriesProduct)
router.route('/filter/subcategory').post(filterSubCategoriesProduct)
router.route('/filter/price').post(filterPriceProduct)

router
   .route('/:id')
   .get(getProductById)
   .delete(protect, admin, deleteProduct)
   .put(protect, admin, updateProduct)

module.exports = router
