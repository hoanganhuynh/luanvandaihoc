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
} = require('../controllers/orderControllers.js')
var { admin, protect } = require('../middleware/authMiddleware.js')

const router = express.Router()

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)

router.route('/myorders').get(protect, getMyOrders)
router
   .route('/:id')
   .get(protect, getOrderById)
   .delete(protect, admin, deleteOrder)
   .put(protect, updateStatusByMember)
   .put(protect, admin, updateStatus)

router.route('/consult').post(protect, admin, orderStatisticalByDate)

router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, updateOrderToDelivered)
router.route('/:id/cash').put(protect, updateOrderToPaidCash)

router.route('/filter').post(protect, admin, filterOrder)

module.exports = router
