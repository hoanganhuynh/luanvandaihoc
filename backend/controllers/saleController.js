var asyncHandler = require('express-async-handler')
var Sale = require('../models/salesModel.js')

//* @desc       Create Categories
//* @route      POST /api/Categories
//* @access     Private/Admin
const createSale = asyncHandler(async (req, res) => {
   try {
      const name = req.body.name

      const createSale = await Sale.create({
         name: req.body.name,
         percent:
            Number(
               name
                  .toString()
                  .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
            ) / 100,
      })

      setTimeout(() => {
         res.status(201).json(createSale)
      }, 2500)
   } catch (error) {
      console.log(error)
   }
})

//* @desc       Get all orders
//* @route      GET /api/orders
//* @access     Private
const getSale = asyncHandler(async (req, res) => {
   const sub = await Sale.find({})
   setTimeout(() => {
      res.json(sub)
   }, 100)
})

//* @desc       Get Sale by ID
//* @route      GET /api/Sale/:id
//* @access     Private
const getSaleById = asyncHandler(async (req, res) => {
   const sub = await Sale.findById(req.params.id)

   if (sub) {
      setTimeout(() => {
         res.json(sub)
      }, 200)
   } else {
      res.status(404)
      throw new Error('Danh mục không tìm thấy')
   }
})

//* @desc       Delete Sale
//* @route      DELETE /api/Sale/:id
//* @access     Private
const deleteSaleById = asyncHandler(async (req, res) => {
   const id = req.params.id

   var array = id.split(',')

   const cat = await Sale.find({ _id: { $in: array } })
   try {
      if (cat) {
         await Sale.remove({ _id: { $in: array } })
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

//* @desc       Update Sale by ID
//* @route      PUT /api/Sale/:id
//* @access     Private/Admin
const updateSaleById = asyncHandler(async (req, res) => {
   const cat = await Sale.findById(req.params.id)

   if (cat) {
      cat.name = req.body.name || cat.name
      cat.percent =
         Number(
            req.body.name
               .toString()
               .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
         ) / 100 || cat.percent
      const updateCat = await cat.save()
      setTimeout(() => {
         res.json({
            _id: updateCat._id,
            name: updateCat.name,
            percent: updateCat.percent,
         })
      }, 2500)
   } else {
      res.status(404)
      throw new Error('Danh mục không tìm thấy')
   }
})

module.exports = {
   createSale,
   getSale,
   getSaleById,
   deleteSaleById,
   updateSaleById,
}
