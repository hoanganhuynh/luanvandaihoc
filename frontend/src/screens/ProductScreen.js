import Avatar from '@material-ui/core/Avatar';
import Buttonn from '@material-ui/core/Button';
import ButtonGroupp from '@material-ui/core/ButtonGroup';
import { deepOrange } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import RemoveIcon from '@material-ui/icons/Remove';

import SendIcon from '@material-ui/icons/Send';
import { Carousel, Image, Skeleton } from 'antd';
import { format, utcToZonedTime } from 'date-fns-tz';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, ListGroup, Row } from 'react-bootstrap';
import {
   PictureInPictureMagnifier,
   GlassMagnifier,
   SideBySideMagnifier,
} from 'react-image-magnifiers';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
   createProductReview,
   listProductDetails,
} from '../actions/productActions.js';
import { listSale } from '../actions/saleAction.js';
import { listUsers } from '../actions/userActions.js';
import ActiveRating from '../components/ActiveRating';
import Announcement from '../components/Announcement.js';
import ButtonComponent from '../components/ButtonComponent';
import Footer from '../components/Footer.js';
import Header from '../components/Header.js';
import SkeletonEffect from '../components/SkeletonEffect';
import Message from '../components/Message';
import Meta from '../components/Meta';
import ProgressLine from '../components/ProgressLine.js';
import Rating from '../components/Rating';

import Product from '../components/Product';

import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants.js';

format(new Date(2014, 1, 11), 'dd/MM/yyyy');

const useStyles = makeStyles((theme) => ({
   root: {
      '& .MuiTextField-root': {
         margin: theme.spacing(1),
      },

      '& .MuiInputBase-input': {
         padding: theme.spacing(1),
      },

      '& .MuiFilledInput-input': {
         padding: theme.spacing(1),
      },

      '& .MuiFilledInput-inputMarginDense': {
         padding: theme.spacing(1),
         textAlign: 'center',
      },
   },
   orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
      width: theme.spacing(4),
      height: theme.spacing(4),
      textAlign: 'center',
   },
   form: {
      width: 1150,
   },
}));

function formatPrice(n, currency) {
   return n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + currency;
}

function ProductScreen({ history, match }) {
   const classes = useStyles();
   const [qty, setQty] = useState(1);
   const [rating, setRating] = useState(0);
   const [comment, setComment] = useState('');
   const [hover, setHover] = React.useState(-1);

   const dispatch = useDispatch();

   const productDetails = useSelector((state) => state.productDetails);
   const { loading, error, product } = productDetails;

   const productTopRated = useSelector((state) => state.productTopRated);
   const {
      loading: loadingRate,
      error: errorRate,
      products: productsRate,
   } = productTopRated;

   const categoriesList = useSelector((state) => state.categoriesList);
   const { category } = categoriesList;

   const subCategoryList = useSelector((state) => state.subCategoryList);
   const { Sub } = subCategoryList;

   const userDetails = useSelector((state) => state.userDetails);
   const { user } = userDetails;

   const userLogin = useSelector((state) => state.userLogin);
   const { userInfo } = userLogin;

   const userList = useSelector((state) => state.userList);
   const { users } = userList;

   // const categoryProduct = useSelector((state) => state.categoryProduct)
   // const { users } = userList

   const saleList = useSelector((state) => state.saleList);
   const { sale } = saleList;

   const productReviewCreate = useSelector(
      (state) => state.productReviewCreate
   );
   const {
      loading: loadingProductReview,
      success: successProductReview,
      error: errorProductReview,
   } = productReviewCreate;

   let url = users?.map((u) => u._id);

   var settings = {
      className: 'slider variable-width',
      dots: true,
      infinite: true,
      speed: 700,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      autoplaySpeed: 2500,
      cssEase: 'linear',
      autoplay: true,
   };

   function onChange(a, b, c) {
      console.log(a, b, c);
   }

   useEffect(() => {
      dispatch(listUsers());
      dispatch(listSale());
      if (successProductReview) {
         setRating(0);
         setComment(' ');
         dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
      }

      dispatch(listProductDetails(match.params.id));
      window.scrollTo(0, 0);
   }, [dispatch, match, successProductReview]);

   const submitHandle = (e) => {
      e.preventDefault();
      dispatch(
         createProductReview(match.params.id, {
            rating,
            comment,
         })
      );
      toast.success(
         <div>
            <CheckCircleOutlineIcon className='pr-1' fontSize='large' />
            Đánh giá của bạn đang được xem xét !
         </div>,
         {
            className: 'Toastify__toast--success',
            position: 'top-right',
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
         }
      );
   };

   const addToCartHandler = () => {
      if (qty <= product.countInStock && qty > 0) {
         history.push(`/cart/${match.params.id}?qty=${qty}`);
      } else if (qty <= 0) {
         toast.error(
            <div>
               <ErrorOutlineIcon className='pr-1' fontSize='large' />
               Phải có ít nhất 1 sản phẩm
            </div>,
            {
               className: 'Toastify__toast--success',
               position: 'top-right',
               autoClose: 3000,
               hideProgressBar: true,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            }
         );
      } else {
         toast.error(
            <div>
               <ErrorOutlineIcon className='pr-1' fontSize='large' />
               {`Số lượng đặt hàng không được vượt quá số lượng hàng hoá trong kho (${product.countInStock} sản phẩm)`}
            </div>,
            {
               className: 'Toastify__toast--success',
               position: 'top-right',
               autoClose: 3500,
               hideProgressBar: true,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            }
         );
      }
   };

   function getCatePro(x) {
      let nameCat = '';
      category &&
         category.map((cate) => {
            if (cate._id == x) nameCat = cate.name;
         });

      return nameCat;
   }

   function getSubCat(x) {
      let subCat = '';
      Sub &&
         Sub.map((sub) => {
            if (sub._id == x) subCat = sub.name;
         });
      return subCat;
   }

   function getTag(x, y) {
      var tagStr = '';
      var plusStr = x + ' ' + y;
      plusStr && plusStr.split(' ').map((x) => (tagStr += x + ', '));
      return (tagStr = tagStr.substring(0, tagStr.length - 2));
   }

   return (
      <>
         {/* {successProductReview && <MessageSuccess variant='Success' />} */}
         <Header />
         <div className='container'>
            {/* <Link className='btn btn-light my-3 rounded-pill' to='/'>
               <i className='fas fa-arrow-left pr-2'></i>
               Quay lại
            </Link> */}
            <div className='categorylink mt-2 mb-3'>
               <span className='fa fa-home'></span>
               <span className='fa fa-angle-right'></span>
               <span>{getCatePro(product.category)}</span>
               <span className='fa fa-angle-right'></span>
               <span> {getSubCat(product.subCategory)}</span>
            </div>
            {loading ? (
               <SkeletonEffect />
            ) : error ? (
               <Message variant='danger'>{error}</Message>
            ) : (
               <>
                  <Meta title={product.name} />
                  <Row className='container-productGreen mb-2'>
                     <Col
                        md={5}
                        className='flex-column img-productGreen align-items-center'
                     >
                        <Row className='flex-column'>
                           <Col md={12} className='mt-3'>
                              <Carousel vertical fade dots>
                                 {product.images &&
                                    product.images.map((img) => (
                                       <>
                                          <GlassMagnifier
                                             style={{
                                                objectFit: 'cover',
                                                zIndex: '5',
                                                border: '1px solid #f0f0f0',
                                                borderRadius: '8px',
                                             }}
                                             magnifierSize='50%'
                                             alwaysInPlace='true'
                                             imageSrc={img && img?.url}
                                             imageAlt='Example'
                                             largeImageSrc={
                                                product.images && img?.url
                                             } // Optional
                                          />
                                       </>
                                    ))}
                              </Carousel>
                           </Col>
                           <Col md={2} className='d-flex flex-row mb-3'>
                              <Image.PreviewGroup>
                                 {product.images &&
                                    product.images.map((img) => (
                                       <div className='d-flex p-1'>
                                          <Image
                                             src={img.url}
                                             style={{
                                                height: '5rem',
                                                width: '5rem',
                                             }}
                                             className='image-slider-product-details'
                                          />
                                       </div>
                                    ))}
                              </Image.PreviewGroup>
                           </Col>
                        </Row>
                     </Col>

                     <Col md={4} className='text-left p-1'>
                        <Row className='pl-4 pr-2'>
                           <ListGroup variant='flush' className='pr-3'>
                              <p className='mt-3 mb-2'>
                                 Nhà cung cấp:{' '}
                                 <strong>{product.supplier?.name}</strong>
                              </p>
                              <Rating
                                 value={product.rating}
                                 text={`(${product.numReviews} đánh giá)`}
                              />
                              <h3 className='text-capitalize mt-2'>
                                 {product.name}
                              </h3>

                              {product.sales ? (
                                 <div className='d-flex flex-row align-items-center mb-2 mt-2'>
                                    <h3 className='mb-0 mr-3 text-lowercase text-success'>
                                       {product.price &&
                                          formatPrice(
                                             product.price -
                                                product.price *
                                                   product.sales.percent,
                                             'đ'
                                          )}
                                    </h3>
                                    <h5 className='mb-0 text-lowercase text-secondary text-decoration-line-through'>
                                       {product.price &&
                                          formatPrice(product.price, 'đ')}
                                    </h5>
                                    <span className='badge badge-success ml-3'>
                                       - {product.sales.percent * 100}%
                                    </span>
                                 </div>
                              ) : (
                                 <h4 className='text-success'>
                                    {product.price &&
                                       formatPrice(product.price, 'đ')}
                                 </h4>
                              )}

                              {/* <h6 className='mb-0 pr-2'>Khối lượng</h6> */}
                              <p className='mt-2'>
                                 Chiều cao: <strong>{product.mass} cm</strong>
                              </p>

                              <p className=''>
                                 ID: <strong>{product._id}</strong>
                              </p>

                              {product.countInStock > 0 ? (
                                 <p className=''>
                                    Số lượng:{' '}
                                    <strong className='text-success'>
                                       {product?.countInStock}
                                    </strong>{' '}
                                    sản phẩm{' '}
                                 </p>
                              ) : (
                                 <p>Hết hàng</p>
                              )}

                              <Col className='d-flex p-0 mb-3'>
                                 <ButtonGroupp size='small' aria-label='small'>
                                    <Buttonn
                                       className='giam-btn'
                                       aria-label='reduce'
                                       size='small'
                                       color='default'
                                       onClick={() => {
                                          setQty(Math.max(qty - 1, 1));
                                       }}
                                       variant='contained'
                                    >
                                       <RemoveIcon fontSize='small' />
                                    </Buttonn>

                                    <div>
                                       <TextField
                                          className='input-value-PD'
                                          id='filled-size-small'
                                          value={qty}
                                          variant='filled'
                                          size='small'
                                          onChange={(e) =>
                                             setQty(e.target.value)
                                          }
                                       />
                                    </div>
                                    <Buttonn
                                       className='tang-btn'
                                       aria-label='increase'
                                       size='small'
                                       onClick={() => {
                                          setQty(Number(qty) + 1);
                                       }}
                                       variant='contained'
                                       // color=''
                                    >
                                       <AddIcon fontSize='small' />
                                    </Buttonn>
                                 </ButtonGroupp>
                              </Col>

                              <ListGroup.Item className='m-0 p-0'>
                                 <Button
                                    onClick={addToCartHandler}
                                    className='btn-block btn-success rounded-pill add-to-card'
                                    variant='outline-light'
                                    type='button'
                                    disabled={product.countInStock === 0}
                                    style={{ fontSize: '1em', width: '16rem' }}
                                 >
                                    <AddShoppingCartIcon />
                                    <strong className='pl-1 '>
                                       Thêm vào giỏ hàng
                                    </strong>
                                    <div className='wave'></div>
                                 </Button>
                              </ListGroup.Item>
                           </ListGroup>
                           <p className='mt-4 p-0'>
                              Tag:{' '}
                              <span className='text-lowercase'>
                                 {getTag(
                                    product.name,
                                    getCatePro(product.category)
                                 )}
                              </span>
                           </p>
                        </Row>
                     </Col>

                     <Col md={3}>
                        <div
                           style={{
                              border: '1px solid #e0e0e0',
                              borderRadius: '8px',
                           }}
                        >
                           <div className='box-service d-flex p-3'>
                              {/* <span className="service-icon fa fa-shield-alt mr-4"></span> */}
                              <Image
                                 className='service-icon'
                                 width='136px'
                                 src='/background/credit-card2.png'
                                 fluid
                              />
                              <div className='box-content ml-3'>
                                 <strong>Thanh toán an toàn</strong>
                                 <p>
                                    Thanh toán bằng các phương thức thanh toán
                                    phổ biến nhất trên thế giới.
                                 </p>
                              </div>
                           </div>

                           <div className='box-service mt-3 d-flex p-3'>
                              {/* <span className="service-icon fa fa-shield-alt mr-4"></span> */}
                              <Image
                                 className='service-icon'
                                 width='76px'
                                 src='/background/safety2.png'
                                 fluid
                              />
                              <div className='box-content ml-3'>
                                 <strong>Sự tự tin</strong>
                                 <p>Bảo vệ bao gồm việc mua hàng của bạn</p>
                              </div>
                           </div>

                           <div className='box-service mt-3 d-flex p-3'>
                              {/* <span className="service-icon fa fa-shield-alt mr-4"></span> */}
                              <Image
                                 className='service-icon'
                                 width='75px'
                                 src='/background/truck2.png'
                                 fluid
                              />
                              <div className='box-content ml-3'>
                                 <strong>Giao hàng toàn quốc</strong>
                                 <p>Giao hàng tận nơi hơn 60 tỉnh thành</p>
                              </div>
                           </div>
                        </div>
                     </Col>

                     <div className='p-4'>
                        <h2>Mô tả</h2>
                        <p className='mb-0'>{product.description}</p>
                     </div>

                     <Row className='p-4'>
                        <Col md={7}>
                           <h4>Đánh giá và Bình luận</h4>
                           {userInfo ? (
                              <Form onSubmit={submitHandle} className='mb-3'>
                                 <Form.Group
                                    controlId='rating'
                                    className='rating-star-sp'
                                 >
                                    {/* <Form.Label
                                       as='h5'
                                       className='text-capitalize'
                                    >
                                       Đánh giá
                                    </Form.Label> */}
                                    <ActiveRating
                                       value={rating}
                                       hover={hover}
                                       setValue={setRating}
                                       setHover={setHover}
                                       size='large'
                                    />
                                 </Form.Group>

                                 <Form.Group
                                    controlId='comment'
                                    // className={classes.root}
                                 >
                                    <label>Viết bình luận</label>
                                    <textarea
                                       className='form-control'
                                       style={{
                                          backgroundColor: '#fff',
                                          border: '1px solid #e8e8e8',
                                          borderRadius: '4px',
                                       }}
                                       rows='3'
                                       value={comment}
                                       onChange={(e) =>
                                          setComment(e.target.value)
                                       }
                                    ></textarea>
                                 </Form.Group>
                                 <input
                                    type='submit'
                                    className='btn btn-success gui-binh-luan'
                                    value='Gửi'
                                 ></input>
                                 <ToastContainer />
                              </Form>
                           ) : (
                              <Announcement
                                 variant='dark'
                                 style={{ color: '#82FF9E' }}
                              >
                                 Vui lòng{' '}
                                 <Link
                                    to='/login'
                                    style={{
                                       color: '#5FAD41',
                                       textDecoration: 'none',
                                       fontWeight: '700',
                                    }}
                                 >
                                    Đăng nhập
                                 </Link>{' '}
                                 để đánh giá
                              </Announcement>
                           )}

                           {/* BINH LUAN */}
                           {product.reviews.length === 0 && (
                              <Row>
                                 <Col md={4}>
                                    <Announcement variant='warning'>
                                       Không có đánh giá{' '}
                                       <Image src='https://img.icons8.com/fluent/24/000000/box-important.png' />
                                    </Announcement>
                                 </Col>
                              </Row>
                           )}

                           {loadingProductReview ? (
                              <>
                                 <Skeleton avatar paragraph={{ rows: 1 }} />
                              </>
                           ) : (
                              product.reviews.map(
                                 (review) =>
                                    review?.status === 'Đã duyệt' && (
                                       <ListGroup.Item
                                          key={review._id}
                                          className='comment-guest mb-3'
                                       >
                                          <div className='d-flex justify-content-between'>
                                             <div className='d-flex justify-content-start'>
                                                <div className='pr-2'>
                                                   {review ? (
                                                      <Image
                                                         className='rounded-circle'
                                                         src={review.avatar.url}
                                                         style={{
                                                            height: '2rem',
                                                            width: '2rem',
                                                         }}
                                                      />
                                                   ) : (
                                                      <Avatar
                                                         className={
                                                            classes.orange
                                                         }
                                                      >
                                                         {review.name.substring(
                                                            0,
                                                            1
                                                         )}
                                                      </Avatar>
                                                   )}
                                                </div>
                                                <div>
                                                   <div className='d-flex'>
                                                      <h5 className='mb-0 text-capitalize'>
                                                         {review.name} •{' '}
                                                      </h5>
                                                      <span className='pl-2'>
                                                         <Rating
                                                            value={
                                                               review.rating
                                                            }
                                                         />
                                                      </span>
                                                   </div>
                                                </div>
                                             </div>
                                             <div
                                                style={{
                                                   fontWeight: '200',
                                                   color: 'gray',
                                                   fontSize: '0.95rem',
                                                }}
                                             >
                                                <p className='mb-1'>
                                                   {format(
                                                      new utcToZonedTime(
                                                         review.createdAt,
                                                         'Asia/Ho_Chi_Minh'
                                                      ),
                                                      'HH:mm:ss - MM/dd/yyyy',
                                                      {
                                                         timeZone:
                                                            'Asia/Ho_Chi_Minh',
                                                      }
                                                   )}
                                                </p>
                                             </div>
                                          </div>
                                          <strong
                                             style={{
                                                fontWeight: '500',
                                                color: 'black',
                                             }}
                                          >
                                             "{review.comment}"
                                          </strong>
                                       </ListGroup.Item>
                                    )
                              )
                           )}
                        </Col>
                        <Col md={5}>
                           <Image
                              style={{ zIndex: '2' }}
                              src='/background/binhluan.jpg'
                              // src={product && product.images[0].url}
                           />
                        </Col>
                     </Row>
                  </Row>

                  <Row className='mb-2 m-0 pt-4 pb-4 mt-4'>
                     <h3 className='p-0 mb-5'>Sản phẩm liên quan</h3>
                     {loadingRate ? (
                        <SkeletonEffect />
                     ) : errorRate ? (
                        <Message variant='danger'>{error}</Message>
                     ) : (
                        <>
                           <Row>
                              {productsRate?.map(
                                 (
                                    product // phai co ? de kiem tra product === null
                                 ) => (
                                    <Col
                                       key={product._id}
                                       sm={12}
                                       md={6}
                                       lg={4}
                                       xl={3}
                                    >
                                       <Product product={product} />
                                    </Col>
                                 )
                              )}
                           </Row>
                        </>
                     )}
                  </Row>
               </>
            )}
         </div>
         <Footer />
      </>
   );
}

export default ProductScreen;
