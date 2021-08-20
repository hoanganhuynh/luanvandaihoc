var { roundToNearestMinutes } = require('date-fns')
var express = require('express')
var { getNotifications } = require('../controllers/userControllers.js')
var { admin, protect } = require('../middleware/authMiddleware.js')
const router = express.Router()

router.route('/').get(protect, getNotifications)

module.exports = router
