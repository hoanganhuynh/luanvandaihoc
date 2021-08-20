var express = require('express')
const {
   createSale,
   getSale,
   getSaleById,
   updateSaleById,
   deleteSaleById,
} = require('../controllers/saleController.js')

var { admin, protect } = require('../middleware/authMiddleware.js')

const router = express.Router()

router.route('/').get(getSale).post(protect, admin, createSale)

router
   .route('/:id')
   .get(protect, admin, getSaleById)
   .put(protect, admin, updateSaleById)
   .delete(protect, admin, deleteSaleById)

module.exports = router
