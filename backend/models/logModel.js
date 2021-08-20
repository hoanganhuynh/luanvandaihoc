var mongoose = require('mongoose')

const logSchema = mongoose.Schema(
   {
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
      },
      rootId: {
         type: mongoose.Schema.Types.ObjectId,
      },
      type: String,
   },
   {
      timestamps: true,
   }
)

const Log = mongoose.model('Log', logSchema)

module.exports = Log
