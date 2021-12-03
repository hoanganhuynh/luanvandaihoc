var express = require('express')
var {
   authShipper
} = require('../controllers/userControllers.js')
var {
    shipperUpdateStatus,
    ordersShipper
 } = require('../controllers/orderControllers.js')
var { admin, protect } = require('../middleware/authMiddleware.js')

const router = express.Router()

router.route('/login').post(authShipper)
router.route('/orders').get(protect, ordersShipper)
router.route('/order/:id').post(shipperUpdateStatus)

module.exports = router
