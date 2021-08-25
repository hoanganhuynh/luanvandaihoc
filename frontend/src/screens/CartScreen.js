import { Chip } from '@material-ui/core'
import Buttonn from '@material-ui/core/Button'
import ButtonGroupp from '@material-ui/core/ButtonGroup'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import AddIcon from '@material-ui/icons/Add'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import RemoveIcon from '@material-ui/icons/Remove'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { addToCart, removeFromCart } from '../actions/cartActions.js'
import Footer from '../components/Footer.js'
import Header from '../components/Header.js'

import DeleteOutlined from '@material-ui/icons/DeleteOutlined'

const useStyles = makeStyles((theme) => ({
   root: {
      '& .MuiTextField-root': {
         margin: theme.spacing(0),
      },

      '& .MuiInputBase-input': {
         padding: theme.spacing(2),
      },

      '& .MuiFilledInput-input': {
         padding: theme.spacing(2),
      },

      '& .MuiFilledInput-inputMarginDense': {
         padding: theme.spacing(1),
         textAlign: 'center',
      },
   },
}))

function format(n) {
   return n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'đ'
}

export const CartScreen = ({ match, location, history }) => {
   const classes = useStyles()
   const productId = match.params.id
   const qty = location.search ? Number(location.search.split('=')[1]) : 1

   const dispatch = useDispatch()

   const userDetails = useSelector((state) => state.userDetails)
   const { loading, error, user } = userDetails

   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin

   const cart = useSelector((state) => state.cart)
   const { cartItems } = cart

   const [items, setItems] = useState(cartItems.map((c) => c.qty))

   useEffect(() => {
      if (productId) {
         dispatch(addToCart(productId, qty))
      }
      window.scrollTo(0, 0)
   }, [dispatch, productId, qty, userInfo])

   const removeFromCartHandler = (id) => {
      dispatch(removeFromCart(id))
   }

   const checkoutHandler = () => {
      history.push('/login?redirect=shipping')
   }

   // const test = (e) => {
   //   const value = e.target.value
   //   if (parseInt(value) === 0) {
   //     alert('sai')
   //   }
   //   console.log(value)
   // }

   return (
      <>
         <Header />
         {/* <Link className='btn btn-light my-3 rounded-pill' to='/'>
        <i class='fas fa-arrow-left pr-2'></i>
        Go back
      </Link> */}

         <Row className='m-4' style={{ height: '100vh' }}>
            <Col md={9} className='p-0 pr-4 mt-3 text-uppercase'>
               {cartItems.length === 0 ? (
                  // <Announcement variant='danger'>
                  <>
                     {/* <Row>
                <Col className='mb-2'> */}
                     <div className='mb-1'>
                        <Link to='/'>
                           <Button className='text-uppercase btn_color rounded-pill'>
                              Mua hàng
                           </Button>
                        </Link>
                     </div>
                     {/* </Col>
                <Col md={12}> */}
                     <div>
                        <Image
                           className=' p-5'
                           src='/images/cart_empty.png'
                           fluid
                        />
                     </div>
                     {/* </Col>
              </Row> */}
                  </>
               ) : (
                  // </Announcement>
                  <ListGroup variant='flush'>
                     
                     <h3>Giỏ hàng</h3>
                     <Row className='mt-3 p0 m-0' style={{borderBottom: '1px solid #e0e0e0'}}>
                        <Col className='text-center' md={2}><p>Hình ảnh</p></Col>
                        <Col className='text-center' md={3}><p>Tên sản phẩm</p></Col>
                        <Col className='text-center' md={2}><p>Giá</p></Col>
                        <Col className='text-center' md={3}><p>Số lượng</p></Col>
                        <Col className='text-center' md={2}><p>Thao tác</p></Col>
                     </Row>

                     {cartItems.map((item)=> (
                        <ListGroup.Item
                           key={item.product}
                           className='p-0 m-0'
                           rounded
                        >
                           <Row>
                              <Col md={2}><Image
                                          src={item.images[0].url}
                                          alt={item.name}
                                          fluid
                                       /></Col>
                              <Col className='text-center d-flex align-items-center justify-content-center' md={3}><p>{item.name}</p></Col>
                              <Col className='text-center d-flex align-items-center justify-content-center' md={2}><p>{format(item.price)}</p></Col>
                              <Col md={3} className='d-flex align-items-center justify-content-center'>
                                 <ButtonGroupp size='small' aria-label='small '>
                                       <Buttonn
                                          className="giam-btn"
                                          aria-label='reduce'
                                          size='small'
                                          color='default'
                                          onClick={() =>
                                             Number(item.qty) - 1 === 0
                                                ? toast.error(
                                                   <div>
                                                      <ErrorOutlineIcon
                                                         className='pr-1'
                                                         fontSize='large'
                                                      />
                                                      {`Phải có ít nhất 1 sản phẩm`}
                                                   </div>,
                                                   {
                                                      className:
                                                         'Toastify__toast--success',
                                                      position: 'top-right',
                                                      autoClose: 3000,
                                                      hideProgressBar: true,
                                                      closeOnClick: true,
                                                      pauseOnHover: true,
                                                      draggable: true,
                                                      progress: undefined,
                                                   }
                                                )
                                                : item.qty > 0 &&
                                                dispatch(
                                                   addToCart(
                                                      item.product,
                                                      Math.min(item.qty - 1, 1)
                                                   )
                                                )
                                          }
                                          variant='contained'
                                       >
                                          <RemoveIcon fontSize='small' />
                                       </Buttonn>

                                       {/* <Buttonn variant='contained'>{item.qty}</Buttonn> */}
                                       <div>
                                          {item.qty === 0 ? (
                                             <TextField
                                                error
                                                className='input-value-PD'
                                                id='filled-size-small'
                                                value={item.qty}
                                                variant='filled'
                                                size='small'
                                                onChange={(e) =>
                                                   // Number(e.target.value) === 0
                                                   //   ? toast.error(
                                                   //       <div>
                                                   //         <ErrorOutlineIcon
                                                   //           className='pr-1'
                                                   //           fontSize='large'
                                                   //         />
                                                   //         Phải có ít nhất 1 sản phẩm
                                                   //       </div>,
                                                   //       {
                                                   //         className: 'Toastify__toast--success',
                                                   //         position: 'top-right',
                                                   //         autoClose: 3000,
                                                   //         hideProgressBar: true,
                                                   //         closeOnClick: true,
                                                   //         pauseOnHover: true,
                                                   //         draggable: true,
                                                   //         progress: undefined,
                                                   //       }
                                                   //     )
                                                   //   :
                                                   Number(e.target.value) >
                                                   item.countInStock
                                                      ? toast.error(
                                                         <div>
                                                            <ErrorOutlineIcon
                                                               className='pr-1'
                                                               fontSize='large'
                                                            />
                                                            {`Số lượng không được vượt quá ${item.countInStock}`}
                                                         </div>,
                                                         {
                                                            className:
                                                               'Toastify__toast--success',
                                                            position:
                                                               'top-right',
                                                            autoClose: 3000,
                                                            hideProgressBar: true,
                                                            closeOnClick: true,
                                                            pauseOnHover: true,
                                                            draggable: true,
                                                            progress: undefined,
                                                         }
                                                      )
                                                      : Number(e.target.value) <=
                                                         item.countInStock &&
                                                      dispatch(
                                                         addToCart(
                                                            item.product,
                                                            Math.max(
                                                               Number(
                                                                  e.target.value
                                                               ),
                                                               0
                                                            )
                                                         )
                                                      )
                                                }
                                             />
                                          ) : (
                                             <TextField
                                                className='input-value-PD'
                                                id='filled-size-small'
                                                value={item.qty}
                                                variant='filled'
                                                size='small'
                                                onChange={(e) =>
                                                   // Number(e.target.value) === 0
                                                   //   ? toast.error(
                                                   //       <div>
                                                   //         <ErrorOutlineIcon
                                                   //           className='pr-1'
                                                   //           fontSize='large'
                                                   //         />
                                                   //         Phải có ít nhất 1 sản phẩm
                                                   //       </div>,
                                                   //       {
                                                   //         className: 'Toastify__toast--success',
                                                   //         position: 'top-right',
                                                   //         autoClose: 3000,
                                                   //         hideProgressBar: true,
                                                   //         closeOnClick: true,
                                                   //         pauseOnHover: true,
                                                   //         draggable: true,
                                                   //         progress: undefined,
                                                   //       }
                                                   //     )
                                                   //   :
                                                   Number(e.target.value) >
                                                   item.countInStock
                                                      ? toast.error(
                                                         <div>
                                                            <ErrorOutlineIcon
                                                               className='pr-1'
                                                               fontSize='large'
                                                            />
                                                            {`Số lượng đặt hàng không được vượt quá số lượng hàng hoá trong kho (${item.countInStock} sản phẩm)`}
                                                         </div>,
                                                         {
                                                            className:
                                                               'Toastify__toast--success',
                                                            position:
                                                               'top-right',
                                                            autoClose: 3000,
                                                            hideProgressBar: true,
                                                            closeOnClick: true,
                                                            pauseOnHover: true,
                                                            draggable: true,
                                                            progress: undefined,
                                                         }
                                                      )
                                                      : Number(e.target.value) <=
                                                         item.countInStock &&
                                                      dispatch(
                                                         addToCart(
                                                            item.product,
                                                            Math.max(
                                                               Number(
                                                                  e.target.value
                                                               ),
                                                               0
                                                            )
                                                         )
                                                      )
                                                }
                                             />
                                          )}
                                       </div>
                                       <Buttonn
                                          className="tang-btn"
                                          aria-label='increase'
                                          size='small'
                                          onClick={() => {
                                             item.qty < item.countInStock
                                                ? dispatch(
                                                   addToCart(
                                                      item.product,
                                                      Number(item.qty) + 1
                                                   )
                                                )
                                                : Number(item.qty) >=
                                                   item.countInStock &&
                                                toast.error(
                                                   <div>
                                                      <ErrorOutlineIcon
                                                         className='pr-1'
                                                         fontSize='large'
                                                      />
                                                      {`Số lượng không được vượt quá  ${item.countInStock}`}
                                                   </div>,
                                                   {
                                                      className:
                                                         'Toastify__toast--success',
                                                      position: 'top-right',
                                                      autoClose: 3000,
                                                      hideProgressBar: true,
                                                      closeOnClick: true,
                                                      pauseOnHover: true,
                                                      draggable: true,
                                                      progress: undefined,
                                                   }
                                                )
                                          }}
                                          variant='contained'
                                          color='default'
                                       >
                                          <AddIcon fontSize='small' />
                                       </Buttonn>
                                    </ButtonGroupp>
                              </Col>
                              <Col md={2} className='d-flex align-items-center justify-content-center'>
                                 <Button 
                                    type='button'
                                    size='small'
                                    className='delete-btn d-flex align-items-center justify-content-center'
                                    color="secondary"
                                    variant="outlined"
                                    onClick={() =>
                                       removeFromCartHandler(item.product)
                                    }
                                 >
                                    <DeleteOutlined fontSize='small' />
                                 </Button>
                              </Col>
                           </Row>
                        </ListGroup.Item>
                     ))}
                     
                  </ListGroup>
               )}
            </Col>

            <Col md={3} className='p-0'>
               <Card
                  className='mt-5 p-3'
                  style={{ zIndex: '1' }}
               >
                  <ListGroup variant='flush'>
                     <ListGroup.Item>
                        <Row>
                           <Col md={6}>
                              <h6 className=''>
                                 Số lượng:{' '}
                              </h6>
                           </Col>
                           <Col md={6}>
                              <h5 className='title-bill-value text-lowercase pl-1'>
                                 {cartItems.reduce(
                                    (acc, item) => acc + item.qty,
                                    0
                                 )}{' '}
                                 
                              </h5>
                           </Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col md={6}>
                              <h6 className=''>
                                 Tổng cộng:{' '}
                              </h6>
                           </Col>
                           <Col md={6}>
                              <h5 className='title-bill-value text-lowercase pl-1'>
                                 {format(
                                    cartItems.reduce(
                                       (acc, item) =>
                                          acc + item.qty * item.price,
                                       0
                                    )
                                 )}
                              </h5>
                           </Col>
                        </Row>
                     </ListGroup.Item>
                  </ListGroup>
               </Card>
               <Card className='mt-3 border-0'>
                  <Button
                     type='button'
                     variant='outline-light'
                     className='btn-block btn-success rounded-pill add-to-card btn btn-outline-light'
                     disabled={
                        cartItems.length === 0 ||
                        cartItems.reduce((acc, item) => acc + item.qty, 0) <
                           cartItems.length
                     }
                     onClick={checkoutHandler}
                     size='xl'
                  >
                     <h5 className='text-light m-0'>Tiếp tục</h5>
                  </Button>
               </Card>
            </Col>
         </Row>
         <Footer />
      </>
   )
}

export default CartScreen
