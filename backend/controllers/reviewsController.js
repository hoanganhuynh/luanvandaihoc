var asyncHandler = require('express-async-handler');
var Product = require('../models/productModel.js');

const allReviews = asyncHandler(async (req, res) => {
   try {
      const product = await Product.find({}).sort({ createdAt: -1 });

      const list = product.filter((r) => r.reviews.length !== 0);

      
      setTimeout(() => {
         res.json(list);
      }, 100);
   } catch (error) {
      console.log(error);
   }
   
});

const approveStatusOfReview = asyncHandler(async (req, res) => {
   try {
      const { productId, reviewId } = req.body;

      await Product.updateOne(
         { _id: productId, 'reviews._id': reviewId },
         {
            $set: { 'reviews.$.status': 'Đã duyệt' },
         }
      );

      setTimeout(() => {
         res.json('Đã duyệt thành công');
      }, 1000);
   } catch (error) {
      console.log(error);
   }
});

const deleteStatusOfReview = asyncHandler(async (req, res) => {
   try {
      const { productId, reviewId } = req.body;

      await Product.updateOne(
         { _id: productId, 'reviews._id': reviewId },
         {
            $set: { 'reviews.$.status': 'Xoá' },
         }
      );

      setTimeout(() => {
         res.json('Đã xoá thành công');
      }, 1000);
   } catch (error) {
      console.log(error);
   }
});

const filterReviews = asyncHandler(async (req, res) => {
   try {
      const statusFilter = req.body.status;

      // const product = await Product.find({}).sort({ createdAt: -1 });
      // const list = product.filter((r) => r.reviews.length !== 0);

      // const la = list.find((x) => x.reviews.filter((y) => y.status === 'Xoá'));

      const product = await Product.find({
         reviews: { $match: { status: { $in: [statusFilter] } } },
      });

      console.log('statusFilter', product);

      if (product) {
         res.json(product);
      } else {
         res.status(404);
         throw new Error('Review not found');
      }
   } catch (error) {
      console.log(error);
   }
});

module.exports = {
   allReviews,
   approveStatusOfReview,
   deleteStatusOfReview,
   filterReviews,
};
