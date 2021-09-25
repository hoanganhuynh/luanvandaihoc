import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
   listProducts,
   listTopRateProducts,
   listTopSoldProducts,
} from '../actions/productActions'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import Header from '../components/Header'
import SkeletonEffect from '../components/SkeletonEffect'
import Message from '../components/Message'
import Meta from '../components/Meta'
import Paginate from '../components/Paginate'
import Product from '../components/Product'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import { Close } from '@material-ui/icons'

const styles = (theme) => ({
   root: {
      margin: 0,
      padding: theme.spacing(2),
   },
   closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
   },
})

const DialogTitle = withStyles(styles)((props) => {
   const { children, classes, onClose, ...other } = props
   return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
         <Typography variant='h6'>{children}</Typography>
         {onClose ? (
            <IconButton
               aria-label='close'
               className={classes.closeButton}
               onClick={onClose}
            >
               <CloseIcon />
            </IconButton>
         ) : null}
      </MuiDialogTitle>
   )
})

const DialogContent = withStyles((theme) => ({
   root: {
      padding: theme.spacing(2),
   },
}))(MuiDialogContent)

const DialogActions = withStyles((theme) => ({
   root: {
      margin: 0,
      padding: theme.spacing(1),
   },
}))(MuiDialogActions)

function HomeScreen({ match, history }) {
   const [open, setOpen] = React.useState(false)

   const handleClickOpen = () => {
      setOpen(true)
   }

   const handleClose = () => {
      setOpen(false)
   }

   const keyword = match.params.keyword
   const pageNumber = match.params.pageNumber || 1

   const dispatch = useDispatch()

   const productList = useSelector((state) => state.productList)
   const { loading, error, products, pages, page } = productList

   const productTopRated = useSelector((state) => state.productTopRated)
   const {
      loading: loadingRate,
      error: errorRate,
      products: productsRate,
   } = productTopRated

   const productTopSold = useSelector((state) => state.productTopSold)
   const {
      loading: loadingSold,
      error: errorSold,
      products: productsSold,
   } = productTopSold

   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin

   const userDetails = useSelector((state) => state.userDetails)
   const { user } = userDetails

   useEffect(() => {
      // dispatch(getUserDetails(userInfo._id))
      setOpen(true)
      dispatch(listProducts(keyword, pageNumber))
      dispatch(listTopRateProducts())
      dispatch(listTopSoldProducts())
      // window.scrollTo(0, 0)
   }, [dispatch, keyword, pageNumber, userInfo])

   return (
      <>
         <Meta />
         <Header />
         <div>
            <Dialog
               onClose={handleClose}
               aria-labelledby='customized-dialog-title'
               open={open}
            >
               <DialogContent style={{ width: '35rem' }}>
                  <div
                     className='d-flex justify-content-between align-items-center mb-3'
                     style={{ borderBottom: '0.1rem solid #ddd' }}
                  >
                     <h4 className='mb-0'>Thông báo</h4>
                     <div className='d-flex justify-content-end'>
                        <Button
                           onClick={handleClose}
                           className='p-1 m-1 rounded-pill'
                           variant='light'
                        >
                           <Close />
                        </Button>
                     </div>
                  </div>
                  <p className='text-justify'>
                     Hệ thống CayCanh Shop xin tặng khách hàng mã
                     giảm giá <strong>COVID</strong> với giá trị là
                     50,000đ cho mỗi đơn hàng.
                  </p>
                  <p>Xin trân trọng cảm ơn!</p>
               </DialogContent>
            </Dialog>
         </div>
         {/* {!keyword && (
        <ProductCarousel className='m-0' style={{ width: '100vh' }} />
      )} */}
         {!keyword && <Banner />}
         <div>
            <div className='d-flex justify-content-center'>
               <h2 className='m-4 text-center text-success'>
                  Top bán chạy
               </h2>
            </div>
            {loadingSold ? (
               <SkeletonEffect />
            ) : errorSold ? (
               <Message variant='danger'>{error}</Message>
            ) : (
               <>
                  <Row
                     className='ml-5 mr-5 p-4'
                     style={{ borderBottom: '0.1rem solid #ddd' }}
                  >
                     {productsSold?.map(
                        (
                           product // phai co ? de kiem tra product === null
                        ) => (
                           <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                              <Product product={product} />
                           </Col>
                        )
                     )}
                  </Row>
               </>
            )}
         </div>

         <div>
            <div className='d-flex justify-content-center'>
               <h4 className='ml-5 mt-4 mb-4 title_home_rate text-center'>
                  Top đánh giá
               </h4>
            </div>
            {loadingRate ? (
               <SkeletonEffect />
            ) : errorRate ? (
               <Message variant='danger'>{error}</Message>
            ) : (
               <>
                  <Row
                     className='ml-5 mr-5'
                     style={{ borderBottom: '0.1rem solid #ddd' }}
                  >
                     {productsRate?.map(
                        (
                           product // phai co ? de kiem tra product === null
                        ) => (
                           <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                              <Product product={product} />
                           </Col>
                        )
                     )}
                  </Row>
               </>
            )}
         </div>

         <div>
            <div className='d-flex justify-content-center'>
               <h4 className='ml-5 mt-4 mb-4 title_home text-center'>
                  Tất cả sản phẩm
               </h4>
            </div>
            {loading ? (
               <SkeletonEffect />
            ) : error ? (
               <Message variant='danger'>{error}</Message>
            ) : (
               <>
                  <Row className='ml-5 mr-5'>
                     {products?.map(
                        (
                           product // phai co ? de kiem tra product === null
                        ) => (
                           <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                              <Product product={product} />
                           </Col>
                        )
                     )}
                  </Row>
                  <div className='d-flex justify-content-center'>
                     <Paginate
                        pages={pages}
                        page={page}
                        keyword={keyword ? keyword : ''}
                     />
                  </div>
               </>
            )}
         </div>
         <Footer />
      </>
   )
}

export default HomeScreen
