var asyncHandler = require('express-async-handler')
var User = require('../models/userModel.js')
var generateToken = require('../utils/generateToken.js')

//* @desc       Auth users & get token
//* @route      GET /api/users/login
//* @access     Public
const authUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body

   const user = await User.findOne({ email })

   if (user && (await user.matchPassword(password))) {
      res.json({
         _id: user._id,
         name: user.name,
         email: user.email,
         avatar: user.avatar,
         sex: user.sex,
         isAdmin: user.isAdmin,
         token: generateToken(user._id),
      })
   } else {
      res.status(404)
      throw new Error('Invalid email or password')
   }
})

//* @desc       Register a new user
//* @route      POST /api/users
//* @access     Public
const registerUser = asyncHandler(async (req, res) => {
   const { name, email, avatar, password } = req.body

   const user = await User.findOneAndUpdate(
      { email },
      { name, email, avatar, password },
      { new: true }
   )

   // console.log('user,', user)
   if (user) {
      res.status(201).json({
         _id: user._id,
         name: user.name,
         email: user.email,
         avatar: user.avatar,
         isAdmin: user.isAdmin,
         token: generateToken(user._id),
      })
   } else {
      const user = await User.create({
         name,
         email,
         avatar,
         password,
      })
      res.status(201).json({
         _id: user._id,
         name: user.name,
         email: user.email,
         avatar: user.avatar,
         isAdmin: user.isAdmin,
         token: generateToken(user._id),
      })
   }
})

//* @desc       Get user profile
//* @route      GET /api/users/profile
//* @access     Public
const getUserProfile = asyncHandler(async (req, res) => {
   const user = await User.findById(req.user._id)

   if (user) {
      res.json(user)
   } else {
      res.status(404)
      throw new Error('User not found')
   }
})

//* @desc       Update user profile
//* @route      PUT /api/users/profile
//* @access     Public
const updateUserProfile = asyncHandler(async (req, res) => {
   const user = await User.findById(req.user._id)

   if (user) {
      try {
         user.name = req.body.name || user.name
         user.email = req.body.email || user.email
         user.avatar = req.body.avatar || user.avatar
         user.birthDay = req.body.birthDay || user.birthDay
         user.sex = req.body.sex || user.sex
         user.numberPhone = req.body.numberPhone || user.numberPhone
         user.birthDay = req.body.selectedDate || user.birthDay
         user.address = req.body.address || user.address

         if (req.body.password) {
            user.password = req.body.password
         }

         const updateUser = await user.save()

         res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            avatar: updateUser.avatar,
            birthDay: updateUser.birthDay,
            sex: updateUser.sex,
            address: updateUser.address,
            isAdmin: updateUser.isAdmin,
            token: generateToken(updateUser._id),
         })
      } catch (error) {
         console.log(error)
      }
   } else {
      res.status(404)
      throw new Error('User not found')
   }
})

//* @desc       Get all user
//* @route      GET /api/users
//* @access     Private/Admin
const getUsers = asyncHandler(async (req, res) => {
   const users = await User.find({})
   setTimeout(() => {
      res.json(users)
   }, 100)
})

//* @desc       Delete user user
//* @route      DELETE /api/users/:id
//* @access     Private/Admin
const deleteUsers = asyncHandler(async (req, res) => {
   const user = await User.findById(req.params.id)

   if (user) {
      await user.remove()
      res.json({ message: 'User removed' })
   } else {
      res.status(404)
      throw new Error('User not found')
   }
})

//* @desc       Get user by ID
//* @route      GET /api/users/:id
//* @access     Private/Admin
const getUsersById = asyncHandler(async (req, res) => {
   const user = await User.findById(req.params.id)
   if (user) {
      res.json(user)
   } else {
      res.status(404)
      throw new Error('User not found')
   }
})

//* @desc       Update user by ID
//* @route      PUT /api/users/:id
//* @access     Private/Admin
const updateUser = asyncHandler(async (req, res) => {
   const user = await User.findById(req.params.id)

   if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.isAdmin = req.body.isAdmin || user.isAdmin
      user.password = req.body.password || user.password

      const updateUser = await user.save()

      setTimeout(() => {
         res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            avatar: updateUser.avatar,
            isAdmin: updateUser.isAdmin,
            password: updateUser.password,
         })
      }, 2000)
   } else {
      res.status(404)
      throw new Error('User not found')
   }
})

const getNotifications = asyncHandler(async (req, res, next) => {
   try {
      const userData = await User.findOne({ email: req.user.email })

      const user = await User.findById(userData._id, {
         'notifications.newNotifications': 1,
         'notifications.list': { $slice: 8 },
      }).populate({
         path: 'notifications.list.logId',
         populate: {
            path: 'userId',
            select: 'name avatar',
         },
      })

      if (user.notifications.newNotifications) {
         user.notifications.newNotifications = 0
         await user.save()
      }

      res.json({ notifications: user.notifications.list })
   } catch (error) {
      console.log(error)
      next(error)
   }
})

//* @desc       Add address user by ID
//* @route      POST /api/users/address
//* @access     Private
const getUserAddress = asyncHandler(async (req, res) => {
   const id = req.user._id
   const idAddress = req.body.id

   try {
      const adress = await User.find({
         $where: function () {
            return 'address.$._id' == idAddress
         },
      })

      setTimeout(() => {
         res.status(200).json(adress)
      }, 1500)
   } catch (error) {
      console.log(error)
   }
})

//* @desc       Add address user by ID
//* @route      POST /api/users/address
//* @access     Private
const updateUserAddress = asyncHandler(async (req, res) => {
   const id = req.user._id
   const { thanhPho, huyen, xa, diaChi, numberPhone } = req.body
   const idAddress = req.body.idAddress

   // console.log(req.body)

   try {
      await User.updateOne(
         { _id: id, 'address._id': idAddress },
         {
            $set: {
               'address.$.thanhPho': thanhPho,
               'address.$.huyen': huyen,
               'address.$.xa': xa,
               'address.$.diaChi': diaChi,
               'address.$.numberPhone': numberPhone,
            },
         }
      )

      const user = await User.findById(req.user._id)
      setTimeout(() => {
         res.status(200).json(user)
      }, 1500)
   } catch (error) {
      console.log(error)
   }
})

//* @desc       Add address user by ID
//* @route      POST /api/users/address
//* @access     Private
const createUserAddress = asyncHandler(async (req, res) => {
   const id = req.user._id
   const add = req.body

   console.log(req.body)

   try {
      await User.findOneAndUpdate(
         { _id: id },
         {
            $push: {
               address: {
                  $each: [add],
                  $slice: 5,
               },
            },
         }
      )

      const user = await User.findById(req.user._id)
      setTimeout(() => {
         res.status(200).json(user)
      }, 1500)
   } catch (error) {
      console.log(error)
   }
})

//* @desc       Add address user by ID
//* @route      POST /api/users/address
//* @access     Private
const updateRoleUserAddress = asyncHandler(async (req, res) => {
   const id = req.user._id
   const role = req.body.role
   const idAddress = req.body.id

   try {
      await User.updateOne(
         { _id: id, 'address._id': idAddress },
         {
            $set: { 'address.$.role': role },
         }
      )

      const user = await User.findById(req.user._id)
      setTimeout(() => {
         res.status(200).json(user)
      }, 1500)
   } catch (error) {
      console.log(error)
   }
})

//* @desc       DELETE address user by ID
//* @route      DELETE /api/users/address
//* @access     Private
const deleteUserAddress = asyncHandler(async (req, res) => {
   const id = req.user._id
   const idAddress = req.body.id

   // console.log(req.body)

   try {
      await User.findOneAndUpdate(
         { _id: id },
         {
            $pull: {
               address: {
                  _id: idAddress,
               },
            },
         }
      )

      const user = await User.findById(req.user._id)
      setTimeout(() => {
         res.status(200).json(user)
      }, 1500)
   } catch (error) {
      console.log(error)
   }
})

module.exports = {
   authUser,
   getUserProfile,
   updateUserProfile,
   registerUser,
   getUsers,
   deleteUsers,
   getUsersById,
   updateUser,
   getNotifications,
   createUserAddress,
   deleteUserAddress,
   updateRoleUserAddress,
   updateUserAddress,
   getUserAddress,
}
