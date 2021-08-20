var express = require('express')
var {
   createSupplier,
   deleteSupplierById,
   getSupplier,
   getSupplierAd,
   getSupplierById,
   updateSupplierById,
} = require('../controllers/supplierController.js')
var { admin, protect } = require('../middleware/authMiddleware.js')
const router = express.Router()

router.route('/').post(protect, admin, createSupplier).get(getSupplier)

router.route('/adm').get(protect, admin, getSupplierAd)

router
   .route('/:id')
   .get(getSupplierById)
   .put(protect, admin, updateSupplierById)
   .delete(deleteSupplierById)

module.exports = router
