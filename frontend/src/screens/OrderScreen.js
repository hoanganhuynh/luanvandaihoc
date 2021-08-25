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
               <Row className='m-4'>
                  <Col md={8}>
                     <ListGroup
                        variant='flush'
                        className='shadow mt-3 card_color p-1 border-order'
                     >
                        <ListGroup.Item>
                           <h3
                              className='text-center'
                              style={{ color: '#7563c8' }}
                           >
                              Đơn hàng {order._id}
                           </h3>
                           <Row>
                              <Col md={6} className='d-flex align-items-center'>
                                 <h5 className='text-uppercase mb-0'>
                                    Trạng thái đơn hàng
                                 </h5>
                              </Col>
                              <Col
                                 md={6}
                                 className='d-flex justify-content-end mb-3'
                              >
                                 <div>
                                    {order.orderStatus === 'Chờ xác nhận' ? (
                                       <Button
                                          variant='outline-light'
                                          className='p-1 pl-3 pr-3 btn_color_cancel rounded-pill '
                                          onClick={cancelOrder}
                                       >
                                          <div className='d-flex justify-content-end'>
                                             Huỷ
                                             <ClearIcon
                                                fontSize='small'
                                                style={{ marginTop: '0.2rem' }}
                                             />
                                          </div>
                                       </Button>
                                    ) : (
                                       <Button
                                          disabled
                                          className='p-1 pl-3 pr-3 rounded-pill'
                                       >
                                          <div className='d-flex justify-content-end'>
                                             Huỷ
                                             <ClearIcon
                                                fontSize='small'
                                                style={{ marginTop: '0.2rem' }}
                                             />
                                          </div>
                                       </Button>
                                    )}
                                 </div>
                              </Col>
                           </Row>

                           {order.orderStatus !== 'Huỷ' ? (
                              <ProgressShipping />
                           ) : (
                              <Announcement variant='warning'>
                                 Đơn hàng đã được huỷ
                              </Announcement>
                           )}

                           <h5 className='text-uppercase'>
                              Thông tin giao hàng
                           </h5>
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
                                 {order.shippingAddress.diaDiem}
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
                           {
                              order.isDelivered && (
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
                              )
                              // : (
                              //   <Announcement variant='danger'>No Delivered</Announcement>
                              // )}
                           }
                        </ListGroup.Item>

                        <ListGroup.Item>
                           <h5 className='text-uppercase'>
                              Phương thức thanh toán
                           </h5>
                           <p className='pl-4'>
                              <strong>Phương thức: </strong>
                              {order.paymentMethod}
                           </p>

                           {
                              order.isPaid && (
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
                              )
                              // : (
                              //   <Announcement variant='danger'>No Paid</Announcement>
                              // )
                           }
                        </ListGroup.Item>

                        <ListGroup.Item>
                           <h5 className='text-uppercase'>Giỏ hàng</h5>
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
                        </ListGroup.Item>
                     </ListGroup>
                  </Col>
                  <Col md={4} style={{ zIndex: '1' }}>
                     <Card className='border-0'>
                        <ListGroup
                           variant='flush'
                           className='shadow mt-3 card_color p-1 border-order'
                        >
                           <ListGroup.Item>
                              <h4 className='text-uppercase text-center'>
                                 Chi tiết hoá đơn
                              </h4>
                              <Row className='mt-3'>
                                 <Col md={8}>Tổng tiền sản phẩm</Col>
                                 <Col md={4}>
                                    <p className='mb-0'>
                                       {formatMoney(order.itemsPrice, 'đ')}
                                    </p>
                                 </Col>
                              </Row>
                           </ListGroup.Item>
                           <ListGroup.Item>
                              <Row>
                                 <Col md={8}>Phí vận chuyển</Col>
                                 <Col md={4}>
                                    <p className='mb-0'>
                                       {formatMoney(order.shippingPrice, 'đ')}
                                    </p>
                                 </Col>
                              </Row>
                           </ListGroup.Item>
                           <ListGroup.Item>
                              <Row>
                                 <Col md={8}>Giảm giá</Col>
                                 <Col md={4}>
                                    <p className='mb-0'>
                                       {formatMoney(order?.discount, 'đ')}
                                    </p>
                                 </Col>
                              </Row>
                           </ListGroup.Item>

                           <ListGroup.Item>
                              <Row>
                                 <Col md={8} className='text-danger'>
                                    <h5 className='mb-0'>Tổng cộng</h5>
                                 </Col>
                                 <Col md={4}>
                                    <h5 className='mb-0 text-danger text-lowercase'>
                                       {formatMoney(order.totalPrice, 'đ')}
                                    </h5>
                                 </Col>
                              </Row>
                           </ListGroup.Item>

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
                                 </ListGroup.Item>
                              )}

                           {loadingDeliver && <Loader />}
                           {userInfo &&
                              !order.isDelivered &&
                              order.orderStatus === 'Đã giao hàng' && (
                                 <ListGroup.Item className='border-0'>
                                    <Button
                                       type='button'
                                       className='btn_color btn-block rounded-pill'
                                       onClick={deliverHandler}
                                    >
                                       Đã giao hàng
                                    </Button>
                                 </ListGroup.Item>
                              )}

                           <ListGroup.Item className='border-0 p-0'>
                              <ImagePay />
                           </ListGroup.Item>
                        </ListGroup>
                     </Card>
                  </Col>
               </Row>
            </>
         )}
         <Footer />
      </>
   )
}

export default OrderScreen
