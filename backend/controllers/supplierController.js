var asyncHandler = require('express-async-handler')
var slugify = require('slugify')
var Supplier = require('../models/supplierModel.js')

//* @desc       Create Supplier
//* @route      POST /api/Supplier
//* @access     Private/Admin
const createSupplier = asyncHandler(async (req, res) => {
   const createSupplier = await Supplier.create({
      name: req.body.name,
      slug: slugify(req.body.name),
   })

   setTimeout(() => {
      res.status(201).json(createSupplier)
   }, 2500)
})

//* @desc       Get all Supplier
//* @route      GET /api/Supplier
//* @access     Private
const getSupplier = asyncHandler(async (req, res) => {
   const cat = await Supplier.find({})
   setTimeout(() => {
      res.json(cat)
   }, 1500)
})

//* @desc       Get all Supplier
//* @route      GET /api/Supplier
//* @access     Private/Admin
const getSupplierAd = asyncHandler(async (req, res) => {
   const cat = await Supplier.find({})
   setTimeout(() => {
      res.json(cat)
   }, 500)
})

//* @desc       Get category by ID
//* @route      GET /api/category/:id
//* @access     Private
const getSupplierById = asyncHandler(async (req, res) => {
   const sup = await Supplier.findById(req.params.id)

   if (sup) {
      setTimeout(() => {
         res.json(sup)
      }, 200)
   } else {
      res.status(404)
      throw new Error('Danh mục không tìm thấy')
   }
})

//* @desc       Delete Supplier
//* @route      DELETE /api/Supplier/:id
//* @access     Private
const deleteSupplierById = asyncHandler(async (req, res) => {
   const id = req.params.id

   var array = id.split(',')

   const sup = await Supplier.find({ _id: { $in: array } })

   if (sup) {
      await Supplier.remove({ _id: { $in: array } })
      setTimeout(() => {
         res.json({ message: 'Danh mục đã được xoá' })
      }, 2500)
   } else {
      res.status(404)
      throw new Error('Danh mục không tìm thấy')
   }
})

//* @desc       Update Supplier by ID
//* @route      PUT /api/Supplier/:id
//* @access     Private/Admin
const updateSupplierById = asyncHandler(async (req, res) => {
   const sup = await Supplier.findById(req.params.id)

   if (sup) {
      sup.name = req.body.name || sup.name
      sup.slug = slugify(req.body.name) || sup.slug
      const updateSup = await sup.save()
      setTimeout(() => {
         res.json({
            _id: updateSup._id,
            name: updateSup.name,
            slug: updateSup.slug,
         })
      }, 2500)
   } else {
      res.status(404)
      throw new Error('Danh mục không tìm thấy')
   }
})

module.exports = {
   createSupplier,
   getSupplier,
   getSupplierById,
   deleteSupplierById,
   updateSupplierById,
   getSupplierAd,
}
