var mongoose = require('mongoose')

const subCategorySchema = mongoose.Schema(
   {
      name: {
         type: String,
         trim: true,
         required: false,
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
         required: false,
      },
      category: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Category',
         required: false,
      },
   },
   { timestamps: true }
)

const subCategory = mongoose.model('subCategory', subCategorySchema)
module.exports = subCategory
