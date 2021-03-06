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
import { getOrderDetails, updateOrder, chooseShipper } from '../../actions/orderActions'
import { listUsers } from '../../actions/userActions'
import SkeletonEffect from '../../components/SkeletonEffect'
import Message from '../../components/Message'
import { CHOOSE_SHIPPER_RESET, ORDER_UPDATE_RESET } from '../../constants/orderConstants'
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
   const [shipper, setShipper] = useState("")

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

   console.log('orderDetils: ', order && order.shipper);


   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin

   const {users} = useSelector((state) => state.userList)
   const {isUpdated} = useSelector((state) => state.orderUpdate)

   const orderUpdate = useSelector((state) => state.orderUpdate)
   const {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
   } = orderUpdate

   const orderPay = useSelector((state) => state.orderPay)
   const { loading: loadingPay, success: successPay } = orderPay

   const shippers = users && users.filter(u => u.role && u.role === 'shipper')

   console.log('shippers array', shippers);

   // console.log('orderstuas', order?.orderStatus)

   const stateOrder = ['Ch??? x??c nh???n', '??ang v???n chuy???n', '???? giao h??ng', 'Hu???']
   const [orderStatus, setOrderStatus] = useState(order?.orderStatus)
   const stateOrder_three = ['???? giao h??ng']

   const submitHandler = (e) => {
      e.preventDefault()
      if(shipper) {
         dispatch(chooseShipper(orderId, {shipper: shipper}))
      } else {
         dispatch(updateOrder({ _id: orderId, orderStatus }))
      }
   }

   useEffect(() => {
      dispatch(listUsers())
      if (userInfo) {
         if (successUpdate) {
            dispatch({ type: ORDER_UPDATE_RESET })
         } else {
            dispatch(getOrderDetails(orderId))
         }
      }

      if(isUpdated) {
         dispatch({type: CHOOSE_SHIPPER_RESET})
      }
   }, [dispatch, orderId, successUpdate, isUpdated])

   return (
      <>
         <Header />
         <Row style={{ backgroundColor: '#fafafa' }}>
            <Col md={2} className='p-0'>
               <SideBar />
            </Col>
            <Col md={10} className='pl-0'>
               {loadingUpdate && (
                  <MessageSuccess variant='Ch???nh s???a th??nh c??ng'></MessageSuccess>
               )}
               {errorUpdate && <Message>{errorUpdate}</Message>}
               {loading ? (
                  <SkeletonEffect />
               ) : (
                  <Form onSubmit={submitHandler}>
                     <ListGroup variant='flush' className='mt-3'>
                        <ListGroup.Item className='border-0'>
                           <div className='text-center'>
                              <h3 className='pl-2'>CHI TI???T ????N H??NG</h3>
                           </div>
                           <Row>
                              <Col md={6}>
                                 <p className='text-start'>
                                    M?? ????n h??ng: <strong>{order._id}</strong>
                                 </p>
                                 <p className='text-start'>
                                    T???ng ti???n:{' '}
                                    <strong>
                                       {formatMoney(order.totalPrice, '??')}
                                    </strong>
                                 </p>
                              </Col>
                              <Col md={6}>
                              
                                 <div>
                                 {!order.shipper && shippers &&
                                    (
                                       <select onChange={(e) => setShipper(e.target.value)} style={{
                                                                                                fontSize:'18px',
                                                                                                backgroundColor:'#1cb8ee',
                                                                                                color:'white',
                                                                                                padding:'4px',
                                                                                                marginTop:'17px'

                                       }}>
                                          <option hidden>Ch???n shipper</option>
                                          {shippers.map(shipper => (
                                             <option value={shipper._id}>{shipper.name}</option>
                                          ))}
                                       </select>
                                    )}
                                    <h5 className='text-info pb-1' style={{paddingTop:'10px', color:'#3ba66b'}}>
                                       Tr???ng th??i ????n h??ng: {order?.orderStatus}
                                    </h5>
                                 </div>
                                 
                                 <div>Th??ng tin ng?????i giao h??ng: {order && order.shipper && order.shipper.name} ({order && order.shipper && order.shipper.numberPlate} - S??t: {order && order.shipper && order.shipper.numberPhoneShipper} ) </div>
                              
                                 <div>
                                    <h5>
                                    {/* <p>Tr???ng th??i ????n h??ng: {order?.orderStatus}</p> */}
                                          <FormControl className={classes.formControl}>
                                    <InputLabel
                                       id='demo-controlled-open-select-label'
                                       style={{ fontSize: '1.2rem' }}
                                    >
                                       Vui l??ng ch???n tr???ng th??i ????n h??ng
                                    </InputLabel>
                                    {order && order?.orderStatus === '??ang v???n chuy???n' ? 
                                    (<Select
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
                                       {stateOrder_three.map((t) => (
                                          <MenuItem
                                             className='justify-content-center'
                                             value={t}
                                          >
                                             {t}
                                          </MenuItem>
                                       ))}
                                    </Select>)
                                    : 
                                    order?.orderStatus === '???? giao h??ng' ? 
                                    ('') 
                                    : 
                                    (<Select
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
                                    </Select>)
                                    }
                                    {/* <Select
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
                                    </Select> */}
                                  
                                    
                                 </FormControl>


                                       {/* {order?.orderStatus == 'Hu???' || 
                                       order?.orderStatus == 'Ch??? x??c nh???n' && 
                                       order.isPaid == false || 
                                       order.paymentMethod !== 'Thanh to??n b???ng ti???n m???t' ? (
                                          <p>Tr???ng th??i ????n h??ng: {order?.orderStatus}</p>
                                       ) : (
                                       <div>
                                          <p>Tr???ng th??i ????n h??ng: {order?.orderStatus}</p>
                                          <FormControl className={classes.formControl}>
                                    <InputLabel
                                       id='demo-controlled-open-select-label'
                                       style={{ fontSize: '1.2rem' }}
                                    >
                                       Vui l??ng ch???n tr???ng th??i ????n h??ng
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
                                       </div>) } */}
                                       {/* Tr???ng th??i ????n h??ng: {order?.orderStatus} */}
                                    </h5>
                                 </div>
                                 
                              </Col>
                           </Row>
                        </ListGroup.Item>
                        <ListGroup.Item className='border-0 '>
                           <Row>
                              <Col md={6} className='border-0 '>
                                 <Card
                                    className=' card_color '
                                    style={{
                                       height: '13rem',
                                       backgroundColor: '#F8F8F8',
                                    }}
                                 >
                                    <CardContent>
                                       <h5 className='border-bottom border-info text-info pb-1'>
                                          Th??ng tin ng?????i nh???n
                                       </h5>
                                       <div>
                                          <Row className='m-0'>
                                             <Col md={4}>
                                                <p
                                                   style={{ color: 'grey' }}
                                                   className='mb-1'
                                                >
                                                   ?????a ch???:
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
                                                   T??n kh??ch h??ng:
                                                </p>
                                             </Col>
                                             <Col md={8}>
                                                <p className='mb-1'>
                                                   {
                                                      order.shippingAddress
                                                         .diaDiem
                                                   }
                                                   {' - '}
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
                                                   S??? ??i???n tho???i:
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
                                          Ph????ng th???c thanh to??n
                                       </h5>
                                       <div>
                                          <Row className='m-0'>
                                             <Col md={5}>
                                                <p
                                                   style={{ color: 'grey' }}
                                                   className='mb-1'
                                                >
                                                   Ph????ng th???c:
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
                                                   Th???i gian thanh to??n:
                                                </p>
                                             </Col>
                                             <Col md={7}>
                                                <p className='mb-1'>
                                                   {order.paymentMethod ===
                                                      'Thanh to??n b???ng ti???n m???t' &&
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
                                                     'Thanh to??n b???ng PayPal' ? (
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
                                                            Ch??a thanh to??n
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
                                                   Th???i gian nh???n h??ng:
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
                                                         Ch??a nh???n h??ng
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
                              Gi??? h??ng
                           </h5>

                           <div className='rounded mt-3'>
                              {order.orderItems.map((item, index) => (
                                 <div
                                    key={index}
                                    // className='p-3 card_color shadow border mb-1'
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
                                             {formatMoney(item.price, '??')}
                                             {' = '}
                                             {formatMoney(
                                                item.qty * item.price,
                                                '??'
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
                                 // variant='outline-light rounded-pill mt-4 btn_color'
                                 variant='outline-light'
                                 className='btn-block btn-success rounded-pill add-to-card btn btn-outline-light'
                                 size='normal'
                                 style={{
                                    width: '14rem',
                                    fontSize: '1rem',
                                    letterSpacing: '0.25rem',
                                 }}
                              >
                                 DUY???T
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
