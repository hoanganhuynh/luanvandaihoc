// current week
var Order = require('../models/orderModel.js')
var asyncHandler = require('express-async-handler')
var moment = require('moment')

const handleCurrentWeek = (req, res) => {
   let currentDate = moment()
   let weekStart = currentDate.clone().startOf('week')
   let weekEnd = currentDate.clone().endOf('week')

   try {
      Order.aggregate([
         {
            $match: {
               isPaid: true,
               createdAt: {
                  $gte: new Date(weekStart),
                  $lte: new Date(weekEnd),
               },
            },
         },
         {
            $group: {
               _id: {
                  $dateToString: { format: '%d/%m', date: '$createdAt' },
               },
               count: { $sum: 1 },
               total: { $sum: '$totalPrice' },
            },
         },
      ])
         .sort({ _id: 1 })
         .then((orderFilters) => {
            return res.status(200).json({ orderFilters })
         })
   } catch (error) {
      return res.status(500).json({ msg: 'Server error' })
   }
}
// Month ago
const handleMonthAgo = (req, res) => {
   let monthStart = moment().clone().subtract(1, 'months').startOf('month')
   let monthEnd = moment().clone().subtract(1, 'months').endOf('month')
   try {
      Order.aggregate([
         {
            $match: {
               isPaid: true,
               createdAt: {
                  $gte: new Date(monthStart),
                  $lte: new Date(monthEnd),
               },
            },
         },
         {
            $group: {
               _id: {
                  $dateToString: { format: '%d/%m', date: '$createdAt' },
               },
               count: { $sum: 1 },
               total: { $sum: '$totalPrice' },
            },
         },
      ])
         .sort({ _id: 1 })
         .then((orderFilters) => {
            return res.status(200).json({ orderFilters })
         })
   } catch (error) {
      return res.status(500).json({ msg: 'Server error' })
   }
}
// Current Month
const handleCurrentMonth = (req, res) => {
   let currentDate = moment()
   let monthStart = currentDate.clone().startOf('month')
   // let monthEnd = currentDate.clone().endOf('month')
   try {
      Order.aggregate([
         {
            $match: {
               isPaid: true,
               createdAt: {
                  $gte: new Date(monthStart),
               },
            },
         },
         {
            $group: {
               _id: {
                  $dateToString: { format: '%d/%m', date: '$createdAt' },
               },
               count: { $sum: 1 },
               total: { $sum: '$totalPrice' },
            },
         },
      ])
         .sort({ _id: 1 })
         .then((orderFilters) => {
            return res.status(200).json({ orderFilters })
         })
   } catch (error) {
      return res.status(500).json({ msg: 'Server error' })
   }
}
// 365 day
const handleYear365 = (req, res) => {
   let day365 = moment().clone().subtract(365, 'days')
   try {
      Order.aggregate([
         {
            $match: {
               isPaid: true,
               createdAt: {
                  $gte: new Date(day365),
               },
            },
         },
         {
            $group: {
               _id: {
                  $dateToString: { format: '%d/%m', date: '$createdAt' },
               },
               count: { $sum: 1 },
               total: { $sum: '$totalPrice' },
            },
         },
         { $sort: { _id: 1 } }, // and this will sort based on your date
      ])
         // .sort({ _id: 1 })
         .then((orderFilters) => {
            return res.status(200).json({ orderFilters })
         })
   } catch (error) {
      return res.status(500).json({ msg: 'Server error' })
   }
}

const handleDay7Ago = (req, res) => {
   let day7 = moment().clone().subtract(7, 'days')
   try {
      Order.aggregate([
         {
            $match: {
               createdAt: {
                  isPaid: true,
                  $gte: new Date(day7),
               },
            },
         },
         {
            $group: {
               _id: {
                  $dateToString: { format: '%d/%m', date: '$createdAt' },
               },
               count: { $sum: 1 },
               total: { $sum: '$totalPrice' },
            },
         },
         { $sort: { _id: 1 } }, // and this will sort based on your date
      ]).then((orderFilters) => {
         return res.status(200).json({ orderFilters })
      })
   } catch (err) {
      return res.status(500).json({ msg: 'Server error' })
   }
}

const orderStatisticalByDate = asyncHandler(async (req, res) => {
   try {
      // console.log(req.body)

      if (req.body.values === 'day7Ago') {
         await handleDay7Ago(req, res)
      } else if (req.body.values === 'currentWeek') {
         await handleCurrentWeek(req, res)
      } else if (req.body.values === 'monthAgo') {
         await handleMonthAgo(req, res)
      } else if (req.body.values === 'currentMonth') {
         await handleCurrentMonth(req, res)
      } else if (req.body.values === 'year') {
         await handleYear365(req, res)
      }
   } catch (error) {
      console.log('error', error)
      return res.status(500).json({ Error: 'Server error' })
   }
})

module.exports = { orderStatisticalByDate }
