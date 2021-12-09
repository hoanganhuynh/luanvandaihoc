var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },

      email: {
         type: String,
         required: true,
         unique: true,
      },

      password: {
         type: String,
         required: false,
         default: '',
      },

      birthDay: {
         type: String,
         required: false,
      },

      sex: {
         type: String,
         required: false,
      },

      address: [
         {
            thanhPho: { type: String, required: false },
            huyen: { type: String, required: false },
            xa: { type: String, required: false },
            diaChi: { type: String, required: false },
            role: { type: Boolean, default: false },
            numberPhone: {
               type: String,
               required: false,
               minLength: [10, 'Số điện thoại ít nhất là 10 số'],
               maxLength: [10, 'Số điện thoại nhiều nhất là 10 số'],
            },
         },
      ],

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
      numberPhoneShipper: {
         type: String, required: false,
         minLength: [10, 'Số điện thoại ít nhất là 10 số'],
         maxLength: [10, 'Số điện thoại nhiều nhất là 10 số'],
      },


      isAdmin: {
         type: Boolean,
         required: true,
         default: false,
      },
      role: {
         type: String,
      },
      numberPlate: {
         type: String, required: false
      },

      notifications: {
         newNotifications: {
            type: Number,
            default: 0,
         },
         list: [
            {
               hasRead: {
                  type: Boolean,
                  default: false,
               },
               logId: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'Log',
               },
            },
         ],
      },
   },
   {
      timestamps: true,
   }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
   return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
   if (!this.isModified('password')) {
      next()
   }

   const salt = await bcrypt.genSalt(10)
   this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

module.exports = User
