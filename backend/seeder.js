var dotenv = require('dotenv')
var colors = require('colors')
var mongoose = require('mongoose')
var users = require('./data/users.js')
var products = require('./data/products.js')
var User = require('./models/userModel.js')
var Order = require('./models/orderModel.js')
var Product = require('./models/productModel.js')
var Categories = require('./models/categoryModel.js')
var connectDB = require('./config/db.js')
var categories = require('./data/categories.js')

dotenv.config()

connectDB()

const importData = async () => {
   try {
      await Order.deleteMany()
      await Product.deleteMany()
      await User.deleteMany()
      await Categories.deleteMany()

      const createUsers = await User.insertMany(users)

      const adminUser = createUsers[0]._id

      const sampleCategories = categories.map((cat) => {
         return { ...cat, user: adminUser }
      })
      await Categories.insertMany(sampleCategories)

      const sampleProduct = products.map((product) => {
         return { ...product, user: adminUser }
      })

      await Product.insertMany(sampleProduct)

      console.log('Data Imported.'.green.inverse)

      process.exit()
   } catch (error) {
      console.error(`${error}`.red.inverse)
      process.exit(1)
   }
}

const destroyData = async () => {
   try {
      await Order.deleteMany()
      await Product.deleteMany()
      await User.deleteMany()
      await Categories.deleteMany()

      console.log('Data Destroyed.'.red.inverse)

      process.exit()
   } catch (error) {
      console.error(`${error}`.red.inverse)
      process.exit(1)
   }
}

if (process.argv[2] === '-d') {
   destroyData()
} else {
   importData()
}
