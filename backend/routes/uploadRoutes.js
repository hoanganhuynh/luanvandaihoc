var express = require('express')
var multer = require('multer')
var path = require('path')
const router = express.Router()

const storage = multer.diskStorage({
   destination(res, file, cb) {
      cb(null, 'uploads/')
   },
   filename(req, file, cb) {
      cb(
         null,
         `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      )
   },
})

function checkFileType(file, cb) {
   const filetypes = /jpg|png|jpeg/
   const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
   const mimetype = filetypes.test(file.mimetype)

   if (extname && mimetype) {
      return cb(null, true)
   } else {
      cb('Images Only!!!')
   }
}

const upload = multer({
   storage,
   fileFilter: function (req, file, cb) {
      checkFileType(file, cb)
   },
})

router.post('/', upload.single('image'), (req, res) => {
   res.send(`/${req.file.path}`)
})

module.exports = router
