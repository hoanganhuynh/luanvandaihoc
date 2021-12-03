var mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
   {
      name: { type: String, required: true },
      avatar: {
         public_id: {
            type: String,
            required: false,
         },
         url: {
            type: String,
            required: false,
         },
      },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      user: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: 'User',
      },
         status: {
            type: String,
            required: false,
            default: 'Chưa duyệt',
            enum: ['Đã duyệt', 'Chưa duyệt', 'Xoá'],
         },
   },
   {
      timestamps: true,
   }
);

const productSchema = mongoose.Schema(
   {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         required: false,
         ref: 'User',
      },

      name: {
         type: String,
         required: true,
      },

      images: [
         {
            public_id: {
               type: String,
               required: false,
            },
            url: {
               type: String,
               required: false,
            },
         },
      ],

      mass: {
         type: String,
         required: false,
      },

      category: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Category',
         required: false,
      },

      subCategory: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'subCategory',
         required: false,
      },

      supplier: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Supplier',
         required: false,
      },

      sales: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Sale',
         required: false,
      },

      description: {
         type: String,
         required: true,
      },

      rating: {
         type: Number,
         required: true,
         default: 0,
      },

      reviews: [reviewSchema],

      numReviews: {
         type: Number,
         required: false,
         default: 0,
      },

      price: {
         type: Number,
         required: true,
         default: 0,
      },

      countInStock: {
         type: Number,
         required: true,
         default: 0,
      },

      sold: {
         type: Number,
         required: false,
         default: 0,
      },
   },
   {
      timestamps: true,
   }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
