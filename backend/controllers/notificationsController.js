var asyncHandler = require('express-async-handler')
var User = require('../models/userModel.js')

module.exports.getNotificaions = async (req, res, next) => {
   const { userId } = req
   const { page = 1 } = req.query

   try {
      const userData = await User.findOne({ email: req.user.email })
      const user = await User.findById(userData._id, {
         'notifications.newNotifications': 1,
         'notifications.list': { $slice: [-8 * +page, 8] },
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
   }
}
