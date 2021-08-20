import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect, useState } from 'react'
import { Col, Image, ListGroup, Row, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getOrderDetails, updateOrder } from '../../actions/orderActions'
import SkeletonEffect from '../../components/SkeletonEffect'
import Message from '../../components/Message'
import { ORDER_UPDATE_RESET } from '../../constants/orderConstants'
import MessageSuccess from '../../components/MessageSuccess'
import { format, utcToZonedTime } from 'date-fns-tz'
import SideBar from './components/SideBar'
import Header from './components/Header'

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

const useStyles = makeStyles((theme) => ({
   formControl: {
      margin: theme.spacing(1),
      minWidth: 500,
   },
}))

const OrderEditScreen = ({ match, history }) => {
   const classes = useStyles()
   const [open, setOpen] = React.useState(false)

   const handleClose = () => {
      setOpen(false)
   }

   const handleOpen = () => {
      setOpen(true)
   }

   const dispatch = useDispatch()

   const orderId = match.params.id

   const orderDetails = useSelector((state) => state.orderDetails)
   const { order, loading } = orderDetails

   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin

   const orderUpdate = useSelector((state) => state.orderUpdate)
   const {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
   } = orderUpdate

   const orderPay = useSelector((state) => state.orderPay)
   const { loading: loadingPay, success: successPay } = orderPay

   console.log('orderstuas', order?.orderStatus)

   const stateOrder = ['Chờ xác nhận', 'Đang vận chuyển', 'Đã giao hàng', 'Huỷ']
   const [orderStatus, setOrderStatus] = useState(order?.orderStatus)

   const submitHandler = (e) => {
      e.preventDefault()
      dispatch(updateOrder({ _id: orderId, orderStatus }))
   }

   useEffect(() => {
      if (userInfo) {
         if (successUpdate) {
            dispatch({ type: ORDER_UPDATE_RESET })
         } else {
            dispatch(getOrderDetails(orderId))
         }
      }
   }, [dispatch, orderId, successUpdate])

   return (
      <>
         <Header />
         <Row style={{ backgroundColor: '#b68973' }}>
            <Col md={2} className='p-0'>
               <SideBar />
            </Col>
            <Col md={10} className='pl-0'>
               {loadingUpdate && (
                  <MessageSuccess variant='Chỉnh sửa thành công'></MessageSuccess>
               )}
               {errorUpdate && <Message>{errorUpdate}</Message>}
               {loading ? (
                  <SkeletonEffect />
               ) : (
                  <Form onSubmit={submitHandler}>
                     <ListGroup variant='flush' className='mt-3'>
                        <ListGroup.Item className='border-0'>
                           <div className='text-center'>
                              <h3 className='pl-2'>CHI TIẾT ĐƠN HÀNG</h3>
                           </div>
                           <Row>
                              <Col md={6}>
                                 <p className='text-start'>
                                    Mã đơn hàng: <strong>{order._id}</strong>
                                 </p>
                                 <p className='text-start'>
                                    Tổng tiền:{' '}
                                    <strong>
                                       {formatMoney(order.totalPrice, 'đ')}
                                    </strong>
                                 </p>
                              </Col>
                              <Col md={6}>
                                 <div>
                                    <h5>
                                       Trạng thái đơn hàng: {order?.orderStatus}
                                    </h5>
                                 </div>
                                 <FormControl className={classes.formControl}>
                                    <InputLabel
                                       id='demo-controlled-open-select-label'
                                       style={{ fontSize: '1.2rem' }}
                                    >
                                       Vui lòng chọn trạng thái đơn hàng
                                    </InputLabel>
                                    <Select
                                       labelId='demo-controlled-open-select-label'
                                       id='demo-controlled-open-select'
                                       open={open}
                                       onClose={handleClose}
                                       onOpen={handleOpen}
                                       value={orderStatus}
                                       onChange={(e) =>
                                          setOrderStatus(e.target.value)
                                       }
                                       className='text-danger text-center text-uppercase'
                                    >
                                       {stateOrder.map((t) => (
                                          <MenuItem
                                             className='justify-content-center'
                                             value={t}
                                          >
                                             {t}
                                          </MenuItem>
                                       ))}
                                    </Select>
                                 </FormControl>
                              </Col>
                           </Row>
                        </ListGroup.Item>
                        <ListGroup.Item className='border-0 '>
                           <Row>
                              <Col md={6} className='border-0 '>
                                 <Card
                                    className='rounded card_color '
                                    style={{
                                       height: '13rem',
                                       backgroundColor: '#F8F8F8',
                                    }}
                                 >
                                    <CardContent>
                                       <h5 className='border-bottom border-info text-info pb-1'>
                                          Thông tin người nhận
                                       </h5>
                                       <div>
                                          <Row className='m-0'>
                                             <Col md={4}>
                                                <p
                                                   style={{ color: 'grey' }}
                                                   className='mb-1'
                                                >
                                                   Địa chỉ:
                                                </p>
                                             </Col>
                                             <Col md={8}>
                                                <strong>
                                                   {order.user?.name}
                                                </strong>
                                             </Col>
                                          </Row>
                                          <Row className='m-0'>
                                             <Col md={4}>
                                                <p
                                                   style={{ color: 'grey' }}
                                                   className='mb-1'
                                                >
                                                   Tên khách hàng:
                                                </p>
                                             </Col>
                                             <Col md={8}>
                                                <p className='mb-1'>
                                                   {
                                                      order.shippingAddress
                                                         .diaChi
                                                   }
                                                   {' - '}
                                                   {order.shippingAddress.xa}
                                                   {' - '}
                                                   {order.shippingAddress.huyen}
                                                   {' - '}
                                                   {
                                                      order.shippingAddress
                                                         .thanhPho
                                                   }
                                                   .
                                                </p>
                                             </Col>
                                          </Row>
                                          <Row className='m-0'>
                                             <Col md={4}>
                                                <p
                                                   style={{ color: 'grey' }}
                                                   className='mb-1'
                                                >
                                                   Số điện thoại:
                                                </p>
                                             </Col>
                                             <Col md={8}>
                                                <p className='mb-1'>
                                                   {formatPhoneNumber(
                                                      order.shippingAddress
                                                         .numberPhone
                                                   )}
                                                </p>
                                             </Col>
                                          </Row>
                                          <Row className='m-0'>
                                             <Col md={4}>
                                                <p
                                                   style={{ color: 'grey' }}
                                                   className='mb-1'
                                                >
                                                   Email:
                                                </p>
                                             </Col>
                                             <Col md={8}>
                                                <p className='mb-1'>
                                                   {order.user?.email}
                                                </p>
                                             </Col>
                                          </Row>
                                       </div>
                                    </CardContent>
                                 </Card>
                              </Col>
                              <Col md={6}>
                                 <Card
                                    className='rounded card_color'
                                    style={{
                                       height: '13rem',
                                       backgroundColor: '#F8F8F8',
                                    }}
                                 >
                                    <CardContent>
                                       <h5 className='border-bottom border-info text-info pb-1'>
                                          Phương thức thanh toán
                                       </h5>
                                       <div>
                                          <Row className='m-0'>
                                             <Col md={5}>
                                                <p
                                                   style={{ color: 'grey' }}
                                                   className='mb-1'
                                                >
                                                   Phương thức:
                                                </p>
                                             </Col>
                                             <Col md={7} className='pt-1'>
                                                <strong
                                                   className='mb-0 text-capitalize'
                                                   style={{
                                                      letterSpacing: '0.1rem',
                                                   }}
                                                >
                                                   {order.paymentMethod}
                                                </strong>
                                             </Col>
                                          </Row>
                                          <Row className='m-0'>
                                             <Col md={5}>
                                                <p
                                                   style={{ color: 'grey' }}
                                                   className='mb-1'
                                                >
                                                   Thời gian thanh toán:
                                                </p>
                                             </Col>
                                             <Col md={7}>
                                                <p className='mb-1'>
                                                   {order.paymentMethod ===
                                                      'Thanh toán bằng tiền mặt' &&
                                                   order.isDelivered ? (
                                                      <strong className='mb-0'>
                                                         {format(
                                                            new utcToZonedTime(
                                                               order.deliveredAt,
                                                               'Asia/Ho_Chi_Minh'
                                                            ),
                                                            'HH:mm:ss - dd/MM/yyyy',
                                                            {
                                                               timeZone:
                                                                  'Asia/Ho_Chi_Minh',
                                                            }
                                                         )}
                                                      </strong>
                                                   ) : order.paymentMethod ===
                                                     'Thanh toán bằng PayPal' ? (
                                                      <strong className='mb-0'>
                                                         {format(
                                                            new utcToZonedTime(
                                                               order.paidAt,
                                                               'Asia/Ho_Chi_Minh'
                                                            ),
                                                            'HH:mm:ss - dd/MM/yyyy',
                                                            {
                                                               timeZone:
                                                                  'Asia/Ho_Chi_Minh',
                                                            }
                                                         )}
                                                      </strong>
                                                   ) : (
                                                      <div className='d-flex'>
                                                         <strong className='text-danger mb-0'>
                                                            Chưa thanh toán
                                                         </strong>
                                                      </div>
                                                   )}
                                                </p>
                                             </Col>
                                          </Row>
                                          <Row className='m-0'>
                                             <Col md={5}>
                                                <p
                                                   style={{ color: 'grey' }}
                                                   className='mb-1'
                                                >
                                                   Thời gian nhận hàng:
                                                </p>
                                             </Col>
                                             <Col md={7}>
                                                {order.isDelivered ? (
                                                   <strong className='mb-0'>
                                                      {format(
                                                         new utcToZonedTime(
                                                            order.deliveredAt,
                                                            'Asia/Ho_Chi_Minh'
                                                         ),
                                                         'HH:mm:ss - dd/MM/yyyy',
                                                         {
                                                            timeZone:
                                                               'Asia/Ho_Chi_Minh',
                                                         }
                                                      )}
                                                   </strong>
                                                ) : (
                                                   <div className='d-flex'>
                                                      {/* <Image
                                  src='https://img.icons8.com/fluent/24/000000/only-cash.png'
                                  className='pr-1'
                                /> */}
                                                      <strong className='text-danger mb-0'>
                                                         Chưa nhận hàng
                                                      </strong>
                                                   </div>
                                                )}
                                             </Col>
                                          </Row>
                                       </div>
                                    </CardContent>
                                 </Card>
                              </Col>
                           </Row>
                        </ListGroup.Item>

                        <ListGroup.Item className='border-0'>
                           <h5
                              className='pb-1'
                              style={{ borderBottom: '0.04rem solid #ddd' }}
                           >
                              Giỏ hàng
                           </h5>

                           <div className='rounded mt-3'>
                              {order.orderItems.map((item, index) => (
                                 <div
                                    key={index}
                                    className='p-3 card_color shadow border mb-1'
                                    style={{ backgroundColor: '#F8F8F8' }}
                                 >
                                    <Row>
                                       <Col md={1} className='img_container'>
                                          <Image
                                             className='img_color'
                                             src={item.images[0].url}
                                             alt={item.name}
                                             fluid
                                             rounded
                                          />
                                       </Col>

                                       <Col md={7} className='text-center'>
                                          <Link
                                             to={`/product/${item.product}`}
                                             className='link-product fst-italic'
                                          >
                                             <p
                                                style={{ fontSize: '1.1rem' }}
                                                className='pt-3'
                                             >
                                                {item.name}
                                             </p>
                                          </Link>
                                       </Col>

                                       <Col md={4} className='text-center'>
                                          <p
                                             style={{ fontSize: '1.1rem' }}
                                             className='pt-3 fst-italic'
                                          >
                                             {item.qty} x{' '}
                                             {formatMoney(item.price, 'đ')}
                                             {' = '}
                                             {formatMoney(
                                                item.qty * item.price,
                                                'đ'
                                             )}
                                          </p>
                                       </Col>
                                    </Row>
                                 </div>
                              ))}
                           </div>
                        </ListGroup.Item>

                        <ListGroup.Item className='border-0'>
                           <div
                              className='d-flex justify-content-end '
                              style={{ borderTop: '0.04rem solid #ddd' }}
                           >
                              <Button
                                 type='submit'
                                 variant='outline-light rounded-pill mt-4 btn_color'
                                 size='normal'
                                 style={{
                                    width: '14rem',
                                    fontSize: '1rem',
                                    letterSpacing: '0.25rem',
                                 }}
                              >
                                 DUYỆT
                              </Button>
                           </div>
                        </ListGroup.Item>
                     </ListGroup>
                  </Form>
               )}
            </Col>
         </Row>
      </>
   )
}

export default OrderEditScreen
