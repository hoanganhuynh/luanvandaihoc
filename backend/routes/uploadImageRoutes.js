var express = require('express')
var {
   deleteImage,
   uploadImage,
   uploadImageAvatar,
} = require('../controllers/cloudinaryController.js')

const router = express.Router()

router.route('/').post(uploadImage).post(deleteImage)
router.route('/avatar').post(uploadImageAvatar)

module.exports = router
