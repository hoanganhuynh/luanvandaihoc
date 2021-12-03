var express = require('express')
var { orderStatisticalByDate } = require('../controllers/consultController.js')
var {
   addOrderItems,
   deleteOrder,
   getMyOrders,
   getOrderById,
   getOrders,
   updateOrderToDelivered,
   updateOrderToPaid,
   updateStatus,
   updateStatusByMember,
   filterOrder,
   updateOrderToPaidCash,
   updateShipperForOrder,
} = require('../controllers/orderControllers.js')
var { admin, protect } = require('../middleware/authMiddleware.js')

const router = express.Router()

router.route('/').post(protect, addOrderItems).get(getOrders)

router.route('/myorders').get(protect, getMyOrders)
router
   .route('/:id')
   .get(protect, getOrderById)
   .delete(protect, admin, deleteOrder)
   .put(protect, updateStatusByMember)
   .put(protect, updateStatus)

router.route('/consult').post(protect, admin, orderStatisticalByDate)

router.route('/shipper/:id').post(protect, updateShipperForOrder)

router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, updateOrderToDelivered)
router.route('/:id/cash').put(protect, updateOrderToPaidCash)

router.route('/filter').post(protect, filterOrder)

module.exports = router
