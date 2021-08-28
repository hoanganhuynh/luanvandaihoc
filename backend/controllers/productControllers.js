var asyncHandler = require('express-async-handler')
var Product = require('../models/productModel.js')
var cloudinary = require('cloudinary')

//* @desc       all product filter page
//* @route      GET /api/products
//* @access     Public
const getProducts = asyncHandler(async (req, res) => {
   const pageSize = 6
   const page = Number(req.query.pageNumber) || 1

   const keyword = req.query.keyword
      ? {
           name: {
              $regex: req.query.keyword,
              $options: 'i',
           },
        }
      : {}

   const count = await Product.count({ ...keyword })
   const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))

   setTimeout(() => {
      res.json({ products, page, pages: Math.ceil(count / pageSize) })
   }, 100)
})

//* @desc       Fetch  all products
//* @route      GET /api/products
//* @access     Public
const getAllProduct = asyncHandler(async (req, res) => {
   const product = await Product.find({})

   if (product) {
      setTimeout(() => {
         res.json(product)
      }, 100)
   } else {
      res.status(404)
      throw new Error('Product not found')
   }

   console.log(product)
})

//* @desc       Fetch products by id
//* @route      GET /api/products/:id
//* @access     Public
const getProductById = asyncHandler(async (req, res) => {
   const product = await Product.findOne({ _id: req.params.id }).populate(
      'sales'
   )

   console.log(product)

   if (product) {
      setTimeout(() => {
         res.json(product)
      }, 100)
   } else {
      res.status(404)
      throw new Error('Product not found')
   }
})

//* @desc       Delete a product
//* @route      DELETE /api/products/:id
//* @access     Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
   const product = await Product.findById(req.params.id)

   if (product) {
      await product.remove()
      res.json({ message: 'Product removed' })
   } else {
      res.status(404)
      throw new Error('Product not found')
   }
})

//* @desc       Create product
//* @route      POST /api/products
//* @access     Private/Admin
const createProduct = asyncHandler(async (req, res) => {
   const {
      name,
      price,
      description,
      categoryy,
      countInStock,
      supplierr,
      mass,
      images,
      subCategoryy,
   } = req.body

   const product = new Product({
      user: req.user._id,
      name: name,
      price: price,
      description: description,
      images: images,
      category: categoryy,
      countInStock: countInStock,
      mass: mass,
      supplier: supplierr,
      subCategory: subCategoryy,
   })

   const createdProduct = await product.save()

   setTimeout(() => {
      res.status(201).json(createdProduct)
   }, 1500)
})

//* @desc       Update product
//* @route      PUT /api/products/:id
//* @access     Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
   const {
      name,
      price,
      description,
      // brand,
      categoryy,
      countInStock,
      supplierr,
      mass,
      images,
      subCategoryy,
   } = req.body

   const product = await Product.findById(req.params.id)

   if (product) {
      product.name = name
      product.price = price
      product.description = description
      product.images = images
      // product.brand = brand
      product.category = categoryy
      product.countInStock = countInStock
      product.supplier = supplierr
      product.mass = mass
      product.subCategory = subCategoryy

      const updatedProduct = await product.save()
      res.json(updatedProduct)
   } else {
      res.status(404)
      throw new Error('Product not found')
   }
})

//* @desc       Create new review
//* @route      POST /api/products/:id/reviews
//* @access     Private
const createProductReview = asyncHandler(async (req, res) => {
   try {
      const { rating, comment } = req.body

      const product = await Product.findById(req.params.id)
      // console.log(product)

      if (product) {
         const review = {
            name: req.user.name,
            rating: Number(rating),
            avatar: req.user.avatar,
            comment,
            user: req.user._id,
         }

         const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
         )

         if (alreadyReviewed) {
            product.reviews.forEach((review) => {
               if (review.user.toString() === req.user._id.toString()) {
                  review.comment = comment
                  review.rating = rating
               }
            })
         } else {
            product.reviews.push(review)
            product.numReviews = product.reviews.length
         }

         product.rating = (
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length
         ).toFixed(2)

         await product.save()
         setTimeout(() => {
            res.status(201).json({ message: 'Review added' })
         }, 1500)
      } else {
         res.status(404)
         throw new Error('Product not found')
      }
   } catch (error) {
      console.log(error)
   }
})

//* @desc       Get top rated products
//* @route      GET /api/products/top
//* @access     Public
const getTopProducts = asyncHandler(async (req, res) => {
   const products = await Product.find({}).sort({ rating: -1 }).limit(4)

   console.log('products', products)

   setTimeout(() => {
      res.json(products)
   }, 100)
})

//* @desc       Get top rated products
//* @route      GET /api/products/topsold
//* @access     Public
const getTopProductsSold = asyncHandler(async (req, res) => {
   const products = await Product.find({}).sort({ sold: -1 }).limit(4)

   console.log('proudtc', await Product.find({}))

   setTimeout(() => {
      res.json(products)
   }, 100)
})

//* @desc       Get category for products
//* @route      GET /api/products/category
//* @access     Public
const getCategoriesProduct = asyncHandler(async (req, res, category) => {
   // const product = await Product.find({}).populate('category', '_id name')
   const product = await Product.find({ category: req.params.id })

   // console.log(req.params.id)

   if (product) {
      setTimeout(() => {
         res.json(product)
      }, 1000)
   } else {
      res.status(404)
      throw new Error('Product not found')
   }
})

//* @desc       Get category for products
//* @route      GET /api/products/category
//* @access     Public
const getSubCategoriesProduct = asyncHandler(async (req, res, category) => {
   const product = await Product.find({ subCategory: req.params.id })

   if (product) {
      setTimeout(() => {
         res.json(product)
      }, 1000)
   } else {
      res.status(404)
      throw new Error('Product not found')
   }
})

//* @desc       Filter category for products
//* @route      GET /api/products/filter/category
//* @access     Public
const filterCategoriesProduct = asyncHandler(async (req, res) => {
   const { category } = req.body

   console.log(category)
   try {
      let products = await Product.find({ category })
         .populate('category', '_id name')
         .exec()

      setTimeout(() => {
         res.json(products)
      }, 1000)
   } catch (error) {
      console.log(error)
   }
})

//* @desc       Filter category for products
//* @route      GET /api/products/filter/category
//* @access     Public
const filterSubCategoriesProduct = asyncHandler(async (req, res) => {
   const { sub } = req.body
   try {
      let products = await Product.find({ subCategory: sub })
      // .populate('subCategory', '_id name')
      // .exec()

      setTimeout(() => {
         res.json(products)
      }, 1000)
   } catch (error) {
      console.log(error)
   }
})

//* @desc       Filter price for products
//* @route      GET /api/products/filter/price
//* @access     Public
const filterPriceProduct = asyncHandler(async (req, res) => {
   const { price } = req.body
   try {
      // console.log('price', price)

      let products = await Product.find({
         price: { $gte: price[0], $lte: price[1] },
      })
         .populate('category', '_id name')
         .exec()

      setTimeout(() => {
         res.json(products)
      }, 1000)
   } catch (error) {
      console.log(error)
   }
})

const newProduct = asyncHandler(async (req, res, next) => {
   let images = []
   if (typeof req.body.images === 'string') {
      images.push(req.body.images)
   } else {
      images = req.body.images
   }

   let imagesLinks = []

   for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
         folder: 'products',
      })

      imagesLinks.push({
         public_id: result.public_id,
         url: result.secure_url,
      })
   }

   req.body.images = imagesLinks
   // req.body.user = req.user.id

   // console.log(req.body)

   const {
      name,
      price,
      description,
      brand,
      categoryy,
      subCategoryy,
      countInStock,
      supplierr,
      mass,
   } = req.body

   const product = new Product({
      // user: req.user._id,
      name: name,
      price: price,
      description: description,
      images: req.body.images,
      brand: brand,
      category: categoryy,
      subCategory: subCategoryy,
      countInStock: countInStock,
      mass: mass,
      supplier: supplierr,
   })

   const createdProduct = await product.save()

   setTimeout(() => {
      res.status(201).json(createdProduct)
   }, 1500)
})

module.exports = {
   getProducts,
   getCategoriesProduct,
   getProductById,
   deleteProduct,
   createProduct,
   updateProduct,
   createProductReview,
   getTopProducts,
   filterCategoriesProduct,
   filterPriceProduct,
   newProduct,
   getAllProduct,
   getTopProductsSold,
   getSubCategoriesProduct,
   filterSubCategoriesProduct,
}
