var mongoose = require('mongoose')

const codeSchema = mongoose.Schema(
   {
      name: {
         type: String,
         trim: true,
         required: true,
         minlength: [1, 'Quá ngắn'],
         maxlength: [40, 'Quá dài'],
         text: true,
      },

      discount: {
         type: Number,
         required: true,
      },

      date: {
         type: String,
         require: true,
      },
   },
   { timestamps: true }
)

const Code = mongoose.model('Code', codeSchema)
module.exports = Code
