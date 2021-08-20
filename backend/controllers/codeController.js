var asyncHandler = require('express-async-handler')
var Code = require('../models/codeModel.js')

//* @desc       Create Categories
//* @route      POST /api/Categories
//* @access     Private/Admin
const createCode = asyncHandler(async (req, res) => {
   try {
      // console.log(req.body)

      const createCode = await Code.create({
         name: req.body.name,
         discount: req.body.discount,
         date: req.body.date,
      })

      setTimeout(() => {
         res.status(201).json(createCode)
      }, 2500)
   } catch (error) {
      console.log(error)
   }
})

//* @desc       Get all orders
//* @route      GET /api/orders
//* @access     Private
const getCode = asyncHandler(async (req, res) => {
   const sub = await Code.find({})
   setTimeout(() => {
      res.json(sub)
   }, 100)
})

//* @desc       Get Codeby ID
//* @route      GET /api/Code/:id
//* @access     Private
const getCodeById = asyncHandler(async (req, res) => {
   const sub = await Code.findById(req.params.id)

   if (sub) {
      setTimeout(() => {
         res.json(sub)
      }, 200)
   } else {
      res.status(404)
      throw new Error('Danh mục không tìm thấy')
   }
})

//* @desc       Delete Code
//* @route      DELETE /api/Code/:id
//* @access     Private
const deleteCodeById = asyncHandler(async (req, res) => {
   const id = req.params.id

   var array = id.split(',')

   const cat = await Code.find({ _id: { $in: array } })
   try {
      if (cat) {
         await Code.remove({ _id: { $in: array } })
         setTimeout(() => {
            res.json({ message: 'Danh mục đã được xoá' })
         }, 2500)
      } else {
         res.status(404)
         throw new Error('Danh mục không tìm thấy')
      }
   } catch (error) {
      console.log(error)
   }
})

//* @desc       Update Codeby ID
//* @route      PUT /api/Code/:id
//* @access     Private/Admin
const updateCodeById = asyncHandler(async (req, res) => {
   const cat = await Code.findById(req.params.id)

   if (cat) {
      cat.name = req.body.name || cat.name
      cat.discount = req.body.discount || cat.discount
      cat.date = req.body.date || cat.date
      const updateCat = await cat.save()
      setTimeout(() => {
         res.json({
            _id: updateCat._id,
            name: updateCat.name,
            discount: updateCat.discount,
            date: updateCat.date,
         })
      }, 2500)
   } else {
      res.status(404)
      throw new Error('Danh mục không tìm thấy')
   }
})

module.exports = {
   createCode,
   getCode,
   getCodeById,
   deleteCodeById,
   updateCodeById,
}
