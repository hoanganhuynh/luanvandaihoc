var mongoose = require('mongoose')

const categorySchema = mongoose.Schema(
   {
      name: {
         type: String,
         trim: true,
         required: true,
         minlength: [1, 'Quá ngắn'],
         maxlength: [42, 'Quá dài'],
         text: true,
      },
      slug: {
         type: String,
         trim: true,
         unique: true,
         lowercase: true,
         index: true,
      },
   },
   { timestamps: true }
)

const Category = mongoose.model('Category', categorySchema)
module.exports = Category
