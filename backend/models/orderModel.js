var mongoose = require('mongoose')

const orderSchema = mongoose.Schema(
   {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: 'User',
      },

      orderItems: [
         {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
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
            price: { type: Number, required: true },
            product: {
               type: mongoose.Schema.Types.ObjectId,
               required: true,
               ref: 'Product',
            },
         },
      ],

      shippingAddress: {
         thanhPho: { type: String, required: false },
         huyen: { type: String, required: false },
         xa: { type: String, required: false },
         diaChi: { type: String, required: false },
         numberPhone: {
            type: String,
            required: false,
            minLength: [10, 'Số điện thoại ít nhất là 10 số'],
            maxLength: [10, 'Số điện thoại nhiều nhất là 10 số'],
         },
      },

      paymentMethod: {
         type: String,
         required: true,
      },

      discount: {
         type: Number,
         required: false,
      },

      paymentResult: {
         id: { type: String },
         status: { type: String },
         update_time: { type: String },
         email_address: { type: String },
      },

      taxPrice: {
         type: Number,
         required: true,
         default: 0.0,
      },

      shippingPrice: {
         type: Number,
         required: true,
         default: 0.0,
      },

      totalPrice: {
         type: Number,
         required: true,
         default: 0.0,
      },

      isPaid: {
         type: Boolean,
         required: true,
         default: false,
      },

      paidAt: {
         type: Date,
         default: Date.now,
      },

      isDelivered: {
         type: Boolean,
         required: true,
         default: false,
      },

      deliveredAt: {
         type: Date,
         default: Date.now,
      },

      orderStatus: {
         type: String,
         required: false,
         default: 'Chờ xác nhận',
         enum: ['Chờ xác nhận', 'Đang vận chuyển', 'Đã giao hàng', 'Huỷ'],
      },
      shipper: {
         type: mongoose.Schema.Types.ObjectId,
         required: false,
         ref: 'User',
      }
   },
   {
      timestamps: true,
   }
)

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
