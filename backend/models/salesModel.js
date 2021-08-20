var mongoose = require('mongoose')

const saleSchema = mongoose.Schema(
   {
      name: {
         type: String,
         trim: true,
         required: true,
         minlength: [1, 'Quá ngắn'],
         maxlength: [4, 'Quá dài'],
         text: true,
      },

      percent: {
         type: Number,
         require: true,
         default: 0.0,
      },
   },
   { timestamps: true }
)

const Sale = mongoose.model('Sale', saleSchema)
module.exports = Sale
