var cloudinary = require('cloudinary')

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadImage = async (req, res) => {
   try {
      // console.log(req.body.image)
      let result = await cloudinary.v2.uploader.upload(req.body.image, {
         folder: 'products',
         public_id: `${Date.now()}`,
         resource_type: 'auto',
      })

      return setTimeout(() => {
         res.status(200).json({
            public_id: result.public_id,
            url: result.secure_url,
         })
      }, 100)
   } catch (error) {
      return res.status(500).json({ msg: 'Server error' })
   }
}

const uploadImageAvatar = async (req, res) => {
   try {
      // console.log(req.body.image)
      let result = await cloudinary.v2.uploader.upload(req.body.image, {
         folder: 'avatars',
         public_id: `${Date.now()}`,
         resource_type: 'auto',
      })

      return setTimeout(() => {
         res.status(200).json({
            public_id: result.public_id,
            url: result.secure_url,
         })
      }, 100)
   } catch (error) {
      return res.status(500).json({ msg: 'Server error' })
   }
}

const deleteImage = async (req, res) => {
   try {
      let image_id = req.body.public_id
      cloudinary.v2.uploader.destroy(image_id, (err, result) => {
         if (err) return res.json({ msg: 'Delete image was failed!' })
         res.send('Delete image was success')
      })
   } catch (error) {
      return res.status(500).json({ msg: 'Server error' })
   }
}

module.exports = { uploadImage, deleteImage, uploadImageAvatar }
