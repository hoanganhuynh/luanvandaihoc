import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Image, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'
import { getUserDetails } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import SkeletonEffect from '../components/SkeletonEffect'
import Step from '../components/Step'
import data from '../data.json'
import Footer from '../components/Footer.js'
import Header from '../components/Header.js'
import { Link } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { Close } from '@material-ui/icons'

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

export const ShippingScreen = ({ history }) => {
   const cart = useSelector((state) => state.cart)
   const { shippingAddress, loading } = cart

   const userDetails = useSelector((state) => state.userDetails)
   const { loading: loadingUserDetail, success, user } = userDetails

   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin

   const [thanhPho, setThanhPho] = useState(shippingAddress.thanhPho)
   const [huyen, setHuyen] = useState(shippingAddress.huyen)
   const [xa, setXa] = useState(shippingAddress.xa)
   const [diaChi, setDiachi] = useState(shippingAddress.diaChi)
   const [diaDiem, setDiadiem] = useState(shippingAddress.diaDiem)
   const [numberPhone, setNumberPhone] = useState(shippingAddress.numberPhone)
   const [open, setOpen] = useState(false)
   const [add, setAdd] = useState([])
   const updateInformationAddress = {
      thanhPho,
      huyen,
      xa,
      diaChi,
      diaDiem,
      numberPhone,
   }

   console.log('add', add)

   const dispatch = useDispatch()

   const handleClickOpen = () => {
      setOpen(true)
   }

   const handleClose = () => {
      setOpen(false)
   }

   const submitHandler = (e) => {
      e.preventDefault()
      dispatch(
         saveShippingAddress({ thanhPho, huyen, xa, diaChi, diaDiem, numberPhone })
      )
      history.push('/payment')
   }

   const updateAddress = (diaDiem, diaChi, xa, huyen, thanhPho, numberPhone) => {
      setThanhPho(thanhPho)
      setHuyen(huyen)
      setXa(xa)
      setDiachi(diaChi)
      setDiadiem(diaDiem)
      setNumberPhone(numberPhone)
      setOpen(false)
   }

   useEffect(() => {
      if (!userInfo) {
         history.push('/login')
      } else {
         if (!user) {
            dispatch(getUserDetails('profile'))
         } else {
            {
               user.address?.map(
                  (ad) =>
                     ad.role === true &&
                     (setThanhPho(ad.thanhPho),
                     setHuyen(ad.huyen),
                     setXa(ad.xa),
                     setDiachi(ad.diaChi),
                     setDiadiem(ad.diaDiem),
                     setNumberPhone(ad.numberPhone))
               )
            }
         }
      }
      window.scrollTo(0, 0)
   }, [dispatch, history, user])

   return (
      <>
         <Header />
         {loadingUserDetail ? (
            <SkeletonEffect />
         ) : (
            <>
               <div>
                  <Dialog
                     maxWidth='xl'
                     open={open}
                     onClose={handleClose}
                     aria-labelledby='form-dialog-title'
                  >
                     <div className='d-flex justify-content-end'>
                        <Button
                           onClick={handleClose}
                           className='p-1 m-1 rounded-pill'
                           variant='light'
                        >
                           <Close />
                        </Button>
                     </div>
                     <h4 id='form-dialog-title' className='text-center p-2'>
                        Thay đổi thông tin giao hàng
                     </h4>
                     <DialogContent style={{ width: '45rem' }}>
                        <Form
                           // onSubmit={updateAddress}
                           className='mt-2 border-0 mb-2'
                        >
                           <Form.Group controlId='address'>
                              <Form.Label as='p' className='mb-1 mt-2'>
                                 <strong>Địa chỉ giao hàng</strong>
                              </Form.Label>
                              {user.address?.map((add) => (
                                 <div
                                    className='p-3 mt-1 mb-1'
                                    style={{
                                       borderBottom: '0.1rem solid #ddd',
                                    }}
                                 >
                                    <Row className='mb-2'>
                                       <Col
                                          md={3}
                                          className='d-flex align-items-center '
                                       >
                                          <strong>Số điện thoại</strong>
                                       </Col>
                                       <Col
                                          md={7}
                                          style={{ fontSize: '0.9rem' }}
                                          className='d-flex align-items-center'
                                       >
                                          {formatPhoneNumber(add.numberPhone)}
                                       </Col>
                                       <Col md={2}>
                                          <Button
                                             variant='outline-dark'
                                             size='sm'
                                             className='rounded-pill btn-block'
                                             style={{ letterSpacing: '0.1rem' }}
                                             onClick={() =>
                                                updateAddress(
                                                   add.diaDiem,
                                                   add.diaChi,
                                                   add.xa,
                                                   add.huyen,
                                                   add.thanhPho,
                                                   add.numberPhone
                                                )
                                             }
                                          >
                                             Chọn
                                          </Button>
                                       </Col>
                                    </Row>
                                    <Row className='button_select_default'>
                                       <Col
                                          md={3}
                                          className='d-flex align-items-center'
                                       >
                                          <strong>Địa chỉ liên hệ</strong>
                                       </Col>
                                       <Col
                                          md={9}
                                          style={{ fontSize: '0.9rem' }}
                                          className='d-flex align-items-center text-justify'
                                       >
                                          {add.diaDiem} {' - '} {add.diaChi} {' - '} {add.xa} {' - '}{' '}
                                          {add.huyen} {' - '}
                                          {add.thanhPho}.
                                       </Col>
                                    </Row>
                                 </div>
                              ))}
                           </Form.Group>
                           <div className='text-end'>
                              <strong>
                                 <Link
                                    href='/profile/address'
                                    color='secondary'
                                 >
                                    Thêm địa chỉ mới
                                 </Link>
                              </strong>
                           </div>
                        </Form>
                     </DialogContent>
                  </Dialog>
               </div>
               
               <div className="categorylink mt-2 mb-3 ml-3">
                  <span className="fa fa-home"></span>
                  <span className="fa fa-angle-right"></span>
                  <span>Giỏ hàng</span>
                  <span className="fa fa-angle-right"></span>
                  <span>Địa chỉ giao hàng</span>
                  
               </div>

               <Row className='justify-content-center d-flex'>
                  <Col md={7}>
                  <Step step1 step2 />
                  </Col>
               </Row>

               <Row
                  className='p-2 m-4'
                  style={{ height: '75vh' }}
               >
                  <Col md={12} className='mt-2 d-flex justify-content-center'>
                     <div>
                        

                        <Form
                           onSubmit={submitHandler}
                           className='mt-2 border-0 mb-2'
                        >
                           <h3 className='text-center'>
                              Thông tin Vận chuyển
                           </h3>
                           <Form.Group>
                              <div
                                 className='rounded pt-4'
                                 // style={{
                                 //    border: '0.14rem dotted grey',
                                 // }}
                              >  
                                 <div className='d-flex'>
                                    <div>
                                       <strong><span className='fa fa-phone'></span> Số điện thoại</strong>
                                       <p className='mt-2'>{formatPhoneNumber(numberPhone)}</p>

                                    </div>
                                    <div className='mx-5'>
                                       <strong><span className='fa fa-home'></span> Địa điểm</strong>
                                       {diaDiem == 'Nhà' ? 
                                       <p className='mt-2 diaDiem-nha'>{diaDiem}</p>
                                       :
                                       <p className='mt-2 diaDiem-congty'>{diaDiem}</p>
                                       }
                                    </div>

                                    <div>
                                       <Button
                                          size='sm'
                                          className='rounded-pill'
                                          variant='outline-dark'
                                          onClick={handleClickOpen}
                                       >
                                          Thay đổi
                                       </Button>
                                    </div>

                                 </div>

                                 <strong><span className='fa fa-map'></span> Địa chỉ</strong>
                                 <p className='mt-2 pb-4' style={{borderBottom:'1px solid #e0e0e0'}} >
                                    {diaChi} {' - '} {xa} {' - '} {huyen}{' '}
                                       {' - '}
                                       {thanhPho}.</p>
                              </div>
                           </Form.Group>
                           <div className='d-flex justify-content-center'>
                              <Button
                                 type='submit'
                                 variant='outline-light'
                                 className='btn-block btn-success rounded-pill add-to-card btn btn-outline-light'
                                 style={{ width: '10rem' }}
                              >
                                 Tiếp tục
                              </Button>
                           </div>
                        </Form>
                     </div>
                  </Col>
               
                  {/* <Col md={6} className='d-flex align-items-center'>
                     <Image
                        src='/background/shipping.jpg'
                        style={{ height: '60vh' }}
                     />
                  </Col> */}
               
               </Row>
            </>
         )}
         <Footer />
      </>
   )
}
