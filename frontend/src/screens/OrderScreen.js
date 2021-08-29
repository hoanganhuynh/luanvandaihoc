import ClearIcon from '@material-ui/icons/Clear'
import axios from 'axios'
import { format, utcToZonedTime } from 'date-fns-tz'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { PayPalButton } from 'react-paypal-button-v2'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../../src/notisfied.css'
import {
   Cash,
   deliverOrder,
   getOrderDetails,
   payOrder,
   updateOrderByMember,
} from '../actions/orderActions'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ImagePay from '../components/ImagePay'
import Loader from '../components/Loader'
import Message from '../components/Message'
import ProgressShipping from '../components/ProgressShipping'
import SkeletonEffect from '../components/SkeletonEffect'
import {
   ORDER_DELIVER_RESET,
   ORDER_PAY_RESET,
   ORDER_UPDATE_BY_MEMBER_RESET,
} from '../constants/orderConstants'

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

function formatMoney(n, currency) {
   return n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + currency
}

const OrderScreen = ({ match, history }) => {
   const orderId = match.params.id

   const [sdkReady, setSdkReady] = useState(false)

   const dispatch = useDispatch()

   const [orderStatus, setOrderStatus] = useState('Huỷ')

   const orderDetails = useSelector((state) => state.orderDetails)
   const { order, loading, error } = orderDetails

   const orderPay = useSelector((state) => state.orderPay)
   const { loading: loadingPay, success: successPay } = orderPay

   const orderDeliver = useSelector((state) => state.orderDeliver)
   const { loading: loadingDeliver, success: successDeliver } = orderDeliver

   const orderCash = useSelector((state) => state.orderCash)
   const { loading: loadingCash, success: successCash } = orderCash

   const orderUpdateByMember = useSelector((state) => state.orderUpdateByMember)
   const { loading: loadingByMember, success: successByMember } =
      orderUpdateByMember

   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin

   if (!loading) {
      //   Calculate prices
      const addDecimals = (num) => {
         return Math.round(num)
      }

      order.itemsPrice = addDecimals(
         order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      )
   }

   useEffect(() => {
      if (!userInfo) {
         history.push('/login')
      }

      const addPayPalScript = async () => {
         const { data: clientId } = await axios.get('/api/config/paypal')
         const script = document.createElement('script')
         script.type = 'text/javascript'
         script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
         script.async = true
         script.onload = () => {
            setSdkReady(true)
         }
         document.body.appendChild(script)
      }

      if (
         !order ||
         successPay ||
         successDeliver ||
         successByMember ||
         order._id !== orderId
      ) {
         dispatch({ type: ORDER_PAY_RESET })
         dispatch({ type: ORDER_DELIVER_RESET })
         dispatch({ type: ORDER_UPDATE_BY_MEMBER_RESET })

         dispatch(getOrderDetails(orderId))
      } else if (!order.isPaid) {
         if (!window.paypal) {
            addPayPalScript()
         } else {
            setSdkReady(true)
         }
      }
      window.scrollTo(0, 0)
   }, [dispatch, orderId, successPay, successDeliver, successByMember, order])

   const successPaymentHandler = (paymentResult) => {
      dispatch(payOrder(orderId, paymentResult))
   }

   const deliverHandler = () => {
      dispatch(deliverOrder(order))
      dispatch(Cash(order))
   }

   const cancelOrder = () => {
      dispatch(updateOrderByMember({ _id: orderId, orderStatus }))
   }

   // console.log('Trạng thái: ', order)

   return (
      <>
         <Header />
         {loading ? (
            <SkeletonEffect />
         ) : error ? (
            <Message>{error}</Message>
         ) : (
            <>
               <div className="categorylink mt-2 mb-3 ml-3">
                  <span className="fa fa-home"></span>
                  <span className="fa fa-angle-right"></span>
                  <span>Chi tiết đơn hàng</span>
                  <span className="fa fa-angle-right"></span>
                  <span>{order._id}</span>
               </div>
               <Row className='p-5'>
                  <Col cd={8}>
                     <Row>
                        <Col md={4}>
                           <p className='mt-2 h3'>Trạng thái đơn hàng</p>
                           {order.orderStatus === 'Chờ xác nhận' ? (
                              <div>
                                 <p>Bạn không muốn mua nữa?</p>
                                 <Button
                                    variant='outline-light'
                                    color='danger'
                                    className='p-1 pl-3 pr-3 btn-cancel rounded-pill '
                                    onClick={cancelOrder}
                                 >
                                    <div className='d-flex justify-content-end'>
                                       Huỷ đơn hàng
                                       
                                    </div>
                                 </Button>

                              </div>
                           ) : (
                              ''
                           )}
                        </Col>
                        <Col md={8}>
                           {order.orderStatus !== 'Huỷ' ? (
                              <ProgressShipping />
                           ) : (
                              <Announcement variant='warning'>
                                 Đơn hàng đã được huỷ
                              </Announcement>
                           )}
                        </Col>
                     </Row>
                     <p className='mt-5 h3'>Thông tin giao hàng</p>

                     <div className='pl-4 pr-4 border-1 border-gray rounded pt-3 mb-2'>
                        <Row>
                           <Col md={6}>
                              <p>
                                 <strong>Tên khách hàng: </strong>{' '}
                                 {order.user.name}
                              </p>
                           </Col>
                           <Col md={6}>
                              <p>
                                 <strong>Địa chỉ email: </strong>
                                 <a
                                    className='link-product'
                                    href={`mailto: ${order.user.email}`}
                                 >
                                    {order.user.email}
                                 </a>
                              </p>
                           </Col>
                        </Row>
                        <p>
                           <strong>Số điện thoại: </strong>
                           {formatPhoneNumber(
                              order.shippingAddress.numberPhone
                           )}
                        </p>
                        <p className='mb-3'>
                           <strong>Địa chỉ: </strong>
                           {order.shippingAddress.diaDiem == 'Nhà' ? 
                                       <span className='mt-2 diaDiem-nha'>{order.shippingAddress.diaDiem}</span>
                                       :
                                       <span className='mt-2 diaDiem-congty'>{order.shippingAddress.diaDiem}</span>
                                       }
                           {/* {order.shippingAddress.diaDiem} */}
                           {' - '}
                           {order.shippingAddress.diaChi}
                           {' - '}
                           {order.shippingAddress.xa}
                           {' - '}
                           {order.shippingAddress.huyen}
                           {' - '}
                           {order.shippingAddress.thanhPho}.
                        </p>
                     </div>
                     {order.isDelivered && (
                                 <Announcement variant='success'>
                                    Đã giao hàng vào lúc{' '}
                                    {format(
                                       new utcToZonedTime(
                                          order.deliveredAt,
                                          'Asia/Ho_Chi_Minh'
                                       ),
                                       'HH:mm:ss - dd/MM/yyyy',
                                       { timeZone: 'Asia/Ho_Chi_Minh' }
                                    )}
                                 </Announcement>
                              )}
                     <p className='mt-5 h3'>Phương thức thanh toán</p>
                     <p className='pl-4'>
                        {/* <strong>Phương thức: </strong> */}
                        {order.paymentMethod}
                     </p>

                     {order.isPaid && (
                           <Announcement
                              variant='success'
                              className='rounded-pill'
                           >
                              Đã thanh toán vào lúc{' '}
                              {format(
                                 new utcToZonedTime(
                                    order.paidAt,
                                    'Asia/Ho_Chi_Minh'
                                 ),
                                 'HH:mm:ss - dd/MM/yyyy',
                                 { timeZone: 'Asia/Ho_Chi_Minh' }
                              )}
                           </Announcement>
                        )}
                     
                     <p className='mt-5 h3'>Giỏ hàng</p>
                     {order.orderItems.length === 0 ? (
                        <Message>Giỏ hàng rỗng</Message>
                     ) : (
                        <ListGroup variant='flush'>
                           {order.orderItems.map((item, index) => (
                              <ListGroup.Item key={index}>
                                 <Row>
                                    <Col md={2}>
                                       <Link
                                          to={`/product/${item.product}`}
                                          className='link-product'
                                       >
                                          <Image
                                             src={item.images[0].url}
                                             alt={item.name}
                                             fluid
                                             rounded
                                             className='border border-gray'
                                          />
                                       </Link>
                                    </Col>

                                    <Col
                                       className='d-flex align-items-center'
                                       md={4}
                                    >
                                       <Link
                                          to={`/product/${item.product}`}
                                          className='text-decoration-none d-flex align-items-center'
                                       >
                                          <p className='mb-0'>
                                             {item.name}
                                          </p>
                                       </Link>
                                    </Col>

                                    <Col
                                       md={6}
                                       className='d-flex align-items-center justify-content-center'
                                    >
                                       <h5 className='text-lowercase'>
                                          {item.qty} x{' '}
                                          {formatMoney(item.price, 'đ')}{' '}
                                          {' = '}
                                          {formatMoney(
                                             item.qty * item.price,
                                             'đ'
                                          )}
                                       </h5>
                                    </Col>
                                 </Row>
                              </ListGroup.Item>
                           ))}
                        </ListGroup>
                     )}
                  </Col>
                  <Col md={4}>
                  <div style={{border:'1px solid #e0e0e0', borderRadius:'8px'}} 
                  className='p-3 d-flex align-items-center flex-column' >
                     <h4>CHI TIẾT HOÁ ĐƠN</h4>
                     <div className='w-100 d-flex justify-content-between px-4 pt-2 mt-2'>
                        <p>Tổng tiền sản phẩm:</p>
                        <strong>{formatMoney(order.itemsPrice, 'đ')}</strong>
                     </div>
                     <div className='w-100 d-flex justify-content-between px-4 pt-2 mt-2'>
                        <p>Phí vận chuyển:</p>
                        <strong>{formatMoney(order.shippingPrice, 'đ')}</strong>
                     </div>
                     <div className='w-100 d-flex justify-content-between px-4 pt-2 mt-2'>
                        <p>Giảm giá:</p>
                        <strong>{formatMoney(order?.discount, 'đ')}</strong>
                     </div>
                     <div className='w-100 d-flex justify-content-between px-4 pt-2 mt-2'>
                        <p>Tổng cộng:</p>
                        <strong className='text-success h4'>{formatMoney(order.totalPrice, 'đ')}</strong>
                     </div>
                     {!order.isPaid &&
                              order.orderStatus !== 'Huỷ' &&
                              order.paymentMethod !==
                                 'Thanh toán bằng tiền mặt' && (
                                 <ListGroup.Item className='border-0'>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? (
                                       <Loader />
                                    ) : (
                                       <PayPalButton
                                          amount={order.totalPrice / 100}
                                          onSuccess={successPaymentHandler}
                                          className='rounded-pill'
                                       />
                                    )}
                                    <ImagePay />
                                 </ListGroup.Item>
                              )}

                     {loadingDeliver && <Loader />}
                     {userInfo &&
                        !order.isDelivered &&
                        order.orderStatus === 'Đã giao hàng' && (
                           <div>
                              <p className='m-0 mt-3'>"Bạn đã nhận được hàng chưa? Xác nhận ngay !"</p>
                              <ListGroup.Item className='border-0'>
                                 <Button
                                    type='button'
                                    className='btn-block btn-success rounded-pill add-to-card'
                                    onClick={deliverHandler}
                                 >
                                    Đã nhận được hàng
                                 </Button>
                              </ListGroup.Item>

                           </div>
                        )}
                  </div>
                  </Col>
               </Row>
            </>
         )}
         <Footer />
      </>
   )
}

export default OrderScreen
