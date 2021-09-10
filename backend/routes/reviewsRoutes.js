var express = require('express');
const {
   allReviews,
   approveStatusOfReview,
   deleteStatusOfReview,
   filterReviews,
} = require('../controllers/reviewsController.js');
var { admin, protect } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.route('/').get(allReviews);

router.route('/approveStatusOfReviews').post(approveStatusOfReview);
router.route('/deleteStatusOfReviews').post(deleteStatusOfReview);
router.route('/filterReviews').post(filterReviews);

module.exports = router;
