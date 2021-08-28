import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { removeFromCart } from '../actions/cartActions'
import { listCode } from '../actions/codeAction'
import { createOrder } from '../actions/orderActions'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer.js'
import Header from '../components/Header.js'
import Message from '../components/Message'
import Step from '../components/Step'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { USER_DETAILS_RESET } from '../constants/userConstants'

PlaceOrderScreen.propTypes = {}

let formatPhoneNumber = (str) => {
   //Filter only numbers from the input
   let cleaned = ('' + str).replace(/\D/g, '')

   //Check if the input is of correct length
   let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)

   if (match) {
      return '(' + match[1] + ') ' + match[2] + ' ' + match[3]
   }

   return null
}

function format(n, currency) {
   return n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + currency
}

function PlaceOrderScreen({ history }) {
   const dispatch = useDispatch()

   const cart = useSelector((state) => state.cart)

   // Calculate prices
   cart.itemsPrice = cart.cartItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
   )

   const addDecimals = (num) => {
      return Math.round(num)
   }

   if (
      cart.shippingAddress.thanhPho === 'Thành phố Hà Nội' ||
      cart.shippingAddress.thanhPho === 'Thành phố Hồ Chí Minh'
   ) {
      cart.shippingPrice = 25000
   } else if (cart.shippingAddress.thanhPho === 'Thành phố Cần Thơ') {
      cart.shippingPrice = 15000
   } else {
      cart.shippingPrice = 35000
   }

   const [discountCode, setDiscountCode] = useState('')

   const codeList = useSelector((state) => state.codeList)
   const { code } = codeList

   // cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
   let discounted = ''

   code?.filter((c) => c.name === discountCode && (discounted = c.discount))

   cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
   cart.totalPrice =
      Number(cart.itemsPrice) + Number(cart.shippingPrice) - Number(discounted)

   const orderCreate = useSelector((state) => state.orderCreate)
   const { order, success, error } = orderCreate

   const placeOrderHandler = () => {
      dispatch(
         createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
            discount: Number(discounted),
         })
      )
      // } else {
      //    toast.error(
      //       <div>
      //          <ErrorOutlineIcon className='pr-1' fontSize='large' /> Mã giảm
      //          giá không tồn tại
      //       </div>,
      //       {
      //          position: 'top-right',
      //          autoClose: 2500,
      //          hideProgressBar: true,
      //          closeOnClick: true,
      //          pauseOnHover: true,
      //          draggable: true,
      //          progress: undefined,
      //       }
      //    )
      // }
   }

   useEffect(() => {
      dispatch(listCode())
      if (success) {
         history.push(`/order/${order._id}`)
         dispatch({ type: USER_DETAILS_RESET })
         dispatch({ type: ORDER_CREATE_RESET })

         cart.cartItems.map((item) => dispatch(removeFromCart(item.product)))
      }
      window.scrollTo(0, 0)
   }, [history, success])

   return (
      <>
         <Header />
         <div className="categorylink mt-2 mb-3 ml-3">
                  <span className="fa fa-home"></span>
                  <span className="fa fa-angle-right"></span>
                  <span>Giỏ hàng</span>
                  <span className="fa fa-angle-right"></span>
                  <span>Địa chỉ giao hàng</span>
                  <span className="fa fa-angle-right"></span>
                  <span>Phương thức thanh toán</span>
                  <span className="fa fa-angle-right"></span>
                  <span>Xác nhận đơn hàng</span>
                  
               </div>
         <Row className='justify-content-center d-flex'>
            <Col md={7}>
            <Step step1 step2 step3 step4 />
            </Col>
         </Row>
         <Row className='p-5 mt-5'>
               <Col md={8}>
                  <h5 className='text-success'>GIỎ HÀNG ({cart && cart?.cartItems.length})</h5>
                     {cart.cartItems.map((item, index) => (
                        <ListGroup.Item className='mt-2' style={{borderRadius:'8px', border:'1px solid #e0e0e0'}} key={index}>
                           <Row>
                              <Col md={2}>
                                 <Image
                                    width='65px'
                                    src={item.images[0].url}
                                    alt={item.name}
                                    
                                 />
                              </Col>

                              <Col md={4} className='d-flex align-items-center'>
                                 <Link
                                    to={`/product/${item.product}`}
                                    className='link-product'
                                 >
                                    {item.name}
                                 </Link>
                              </Col>

                              <Col md={4} className='d-flex align-items-center'>
                                 <b style={{ fontSize: '1rem' }}>
                                    {item.qty} x {format(item.price, 'đ')}
                                    {' = '}
                                    {format(item.qty * item.price, 'đ')}
                                 </b>
                              </Col>
                           </Row>
                        </ListGroup.Item>
                     ))}
                  <h5 className='mt-5 text-success'>THÔNG TIN GIAO HÀNG</h5>
                  <div className='d-flex'>
                     <div>
                        <strong><span className='fa fa-phone'></span> Số điện thoại</strong>
                        <p className='mt-2'>{formatPhoneNumber(cart.shippingAddress.numberPhone)}</p>

                     </div>
                     <div className='mx-5'>
                        <strong><span className='fa fa-home'></span> Địa điểm</strong>
                        {cart.shippingAddress.diaDiem == 'Nhà' ? 
                        <p className='mt-2 diaDiem-nha'>{cart.shippingAddress.diaDiem}</p>
                        :
                        <p className='mt-2 diaDiem-congty'>{cart.shippingAddress.diaDiem}</p>
                        }
                     </div>
                  </div>
                  <strong><span className='fa fa-map'></span> Địa chỉ</strong>
                     <p className='mt-2 pb-4'>
                        {cart.shippingAddress.diaChi} {' - '} {cart.shippingAddress.xa} {' - '} {cart.shippingAddress.huyen}{' '}
                           {' - '}
                           {cart.shippingAddress.thanhPho}.</p>
                  
                  <h5 className='mt-4 text-success'>PHƯƠNG THỨC THANH TOÁN</h5>
                     {cart.paymentMethod ? (
                        <p>{cart.paymentMethod}</p>
                           
                        ) : (
                           <strong className='text-danger'>
                              Chưa chọn phương thức thanh toán
                           </strong>
                        )}

                  <h5 className='mt-4 text-success'>Mã giảm giá</h5>
                  <Form>
                     <Form.Group controlId='text' style={{width:'400px'}}>
                        <Form.Control
                           className='border-1 border-grey rounded-pill'
                           type='text'
                           placeholder='Nhập mã giảm giá'
                           value={discountCode}
                           onChange={(e) =>
                              setDiscountCode(e.target.value)
                           }
                        ></Form.Control>
                     </Form.Group>
                  </Form>
               </Col>
               <Col md={4}>
                  <div style={{border:'1px solid #e0e0e0', borderRadius:'8px'}} 
                  className='p-3 d-flex align-items-center flex-column' >
                     <h4>CHI TIẾT HOÁ ĐƠN</h4>
                     <div className='w-100 d-flex justify-content-between px-4 pt-2 mt-2'>
                        <p>Tổng tiền sản phẩm:</p>
                        <strong>{format(cart.itemsPrice, 'đ')}</strong>
                     </div>
                     <div className='w-100 d-flex justify-content-between px-4 pt-2'>
                        <p>Phí vận chuyển:</p>
                        <strong>{format(cart.shippingPrice, 'đ')}</strong>
                     </div>
                     <div className='w-100 d-flex justify-content-between px-4 pt-2'>
                        <p>Mã giảm giá:</p>
                        {discountCode === '' ? (<strong>0đ</strong>) : (
                           <div>
                              {code?.map((c) => (
                                 <strong>
                                    {discountCode === c.name &&
                                       format(c.discount, 'đ')}
                                 </strong>
                              ))}
                           </div>
                        )}
                     </div>
                     <div className='w-100 d-flex justify-content-between px-4 pt-2'>
                        <p>Tổng cộng:</p>
                        <strong className='text-success h4'>{format(cart.totalPrice, 'đ')}</strong>
                     </div>
                     <Button
                        type='button'
                        // variant='outline-light'
                        className='btn-block btn-success rounded-pill add-to-card btn btn-outline-light'
                        disabled={cart.cartItems === 0}
                        onClick={placeOrderHandler}
                     >
                        <h5>Xác nhận đặt hàng</h5>
                     </Button>

                  </div>
                  
               </Col>
         </Row>
         <Footer />
      </>
   )
}

export default PlaceOrderScreen
