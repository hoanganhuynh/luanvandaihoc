var colors = require('colors');
var morgan = require('morgan');
var dotenv = require('dotenv');
var path = require('path');
var express = require('express');
var connectDB = require('./config/db.js');
var { errorHandle, notFound } = require('./middleware/errorMiddleware.js');
var orderRoutes = require('./routes/orderRoutes.js');
var productRoutes = require('./routes/productRoutes.js');
var categoryRoutes = require('./routes/categoryRoutes.js');
var subCategoryRoutes = require('./routes/subCategoryRoutes.js');
var supplierRoutes = require('./routes/supplierRoutes.js');
var uploadRoutes = require('./routes/uploadRoutes.js');
var userRoutes = require('./routes/userRoutes.js');
var saleRoutes = require('./routes/saleRoutes.js');
var codeRoutes = require('./routes/codeRoutes.js');
var reviewsRoutes = require('./routes/reviewsRoutes.js');
var notificationRoutes = require('./routes/notificationRoutes.js');
var uploadImageRoutes = require('./routes/uploadImageRoutes.js');
var bodyParser = require('body-parser');
var cloudinary = require('cloudinary');
var fileUpload = require('express-fileupload');

const { Server } = require('socket.io');
const io = new Server();

const app = express();

dotenv.config();
connectDB().then((res) => {
   console.log(res);
   const http = require('http').createServer(app);
   const server = http.listen(
      PORT,
      console.log(
         `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
            .bold
      )
   );

   const io = require('./io').init(server);
   io.on('connection', (socket) => {
      // console.log('socket', socket.id);
   });
});

const PORT = process.env.PORT || 5000;
// app.listen(
//    PORT,
//    console.log(
//       `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
//          .bold
//    )
// )

if (process.env.NODE_ENV === 'development') {
   app.use(morgan('dev'));
}

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(fileUpload());

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use('/api/products', productRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/subCategory', subCategoryRoutes);
app.use('/api/supplier', supplierRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/sale', saleRoutes);
app.use('/api/code', codeRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/uploadImages', uploadImageRoutes);

app.get('/api/config/paypal', (req, res) =>
   res.send(process.env.PAYPAL_CLIENT_ID)
);

app.get('/', (req, res) => {
   res.send('API is running...');
});

// const __dirname = path.resolve()
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound);
app.use(errorHandle);
