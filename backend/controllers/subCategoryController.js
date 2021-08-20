var asyncHandler = require('express-async-handler')
var slugify = require('slugify')
var subCategory = require('../models/subCategoryModel.js')

//* @desc       Create Categories
//* @route      POST /api/Categories
//* @access     Private/Admin
const createsubCategory = asyncHandler(async (req, res) => {
   const createsubCategory = await subCategory.create({
      name: req.body.name,
      slug: slugify(req.body.name),
      category: req.body.selectCategory,
   })

   setTimeout(() => {
      res.status(201).json(createsubCategory)
   }, 2500)
})

//* @desc       Get all orders
//* @route      GET /api/orders
//* @access     Private
const getsubCategory = asyncHandler(async (req, res) => {
   const sub = await subCategory.find({})
   setTimeout(() => {
      res.json(sub)
   }, 100)
})

//* @desc       Get all orders
//* @route      GET /api/orders
//* @access     Private/Admin
const getsubCategoryAd = asyncHandler(async (req, res) => {
   const sub = await subCategory.find({})
   setTimeout(() => {
      res.json(sub)
   }, 100)
})

//* @desc       Get subCategory by ID
//* @route      GET /api/subCategory/:id
//* @access     Private
const getsubCategoryById = asyncHandler(async (req, res) => {
   const sub = await subCategory.findById(req.params.id)

   if (sub) {
      setTimeout(() => {
         res.json(sub)
      }, 200)
   } else {
      res.status(404)
      throw new Error('Danh mục không tìm thấy')
   }
})

//* @desc       Delete subCategory
//* @route      DELETE /api/subCategory/:id
//* @access     Private
const deletesubCategoryById = asyncHandler(async (req, res) => {
   const id = req.params.id

   var array = id.split(',')

   const cat = await subCategory.find({ _id: { $in: array } })
   try {
      if (cat) {
         await subCategory.remove({ _id: { $in: array } })
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

//* @desc       Update subCategory by ID
//* @route      PUT /api/subCategory/:id
//* @access     Private/Admin
const updatesubCategoryById = asyncHandler(async (req, res) => {
   const cat = await subCategory.findById(req.params.id)

   if (cat) {
      cat.name = req.body.name || cat.name
      cat.slug = slugify(req.body.name) || cat.slug
      cat.category = req.body.selectCategory || cat.category
      const updateCat = await cat.save()
      setTimeout(() => {
         res.json({
            _id: updateCat._id,
            name: updateCat.name,
            slug: updateCat.slug,
            category: updateCat.category,
         })
      }, 2500)
   } else {
      res.status(404)
      throw new Error('Danh mục không tìm thấy')
   }
})

module.exports = {
   createsubCategory,
   getsubCategory,
   getsubCategoryById,
   deletesubCategoryById,
   updatesubCategoryById,
   getsubCategoryAd,
}
