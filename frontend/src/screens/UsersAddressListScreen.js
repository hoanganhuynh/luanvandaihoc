import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Link from '@material-ui/core/Link'
import { Close } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
   createAddressUser,
   deleteAddressUser,
   getUserDetails,
   selectRoleAddressUser,
   updateAddressUser,
} from '../actions/userActions'
import Announcement from '../components/Announcement.js'
import Footer from '../components/Footer.js'
import Header from '../components/Header.js'
import Message from '../components/Message'
import SkeletonEffect from '../components/SkeletonEffect'
import data from '../data.json'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import { toast, ToastContainer } from 'react-toastify'

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

const UsersAddressListScreen = ({ history }) => {
   const [thanhPho, setThanhPho] = useState('')
   const [huyen, setHuyen] = useState('')
   const [xa, setXa] = useState('')
   const [diaChi, setDiachi] = useState('')
   const [numberPhone, setNumberPhone] = useState('')
   const [open, setOpen] = useState(false)
   const [openEdit, setOpenEdit] = useState(false)
   const [idAddress, setIdAddress] = useState('')

   const addressUser = { thanhPho, huyen, xa, diaChi, numberPhone }
   const updateInformationAddress = {
      idAddress,
      thanhPho,
      huyen,
      xa,
      diaChi,
      numberPhone,
   }

   const handleClickOpen = () => {
      setOpen(true)
   }

   const handleClose = () => {
      setOpen(false)
   }

   const handleClickOpenEdit = (id) => {
      setOpenEdit(true)
      setIdAddress(id)
   }

   const handleCloseEdit = () => {
      setOpenEdit(false)
   }

   const dispatch = useDispatch()

   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin

   const userDetails = useSelector((state) => state.userDetails)
   const { loading, error, user } = userDetails

   const userDeleteAddress = useSelector((state) => state.userDeleteAddress)
   const { success: successDeleteAddress } = userDeleteAddress

   const userCreateAddress = useSelector((state) => state.userCreateAddress)
   const { success: successCreateAddress } = userCreateAddress

   const userSelectRole = useSelector((state) => state.userSelectRole)
   const { success: successSelectRole } = userSelectRole

   const userUpdateAddress = useSelector((state) => state.userUpdateAddress)
   const { success: successUpdateAddress } = userUpdateAddress

   useEffect(() => {
      if (!userInfo) {
         history.push('/login')
      } else {
         if (
            successDeleteAddress ||
            successCreateAddress ||
            successSelectRole ||
            successUpdateAddress
         ) {
            setOpen(false)
            setOpenEdit(false)

            dispatch(getUserDetails('profile'))
         }
      }
      window.scrollTo(0, 0)
   }, [
      history,
      dispatch,
      successDeleteAddress,
      successCreateAddress,
      successSelectRole,
      successUpdateAddress,
   ])

   const deleteAddress = (id) => {
      dispatch(deleteAddressUser({ id: id }))
   }

   const createAddress = (e) => {
      e.preventDefault()
      if (numberPhone.length === 14 || numberPhone.length === 10) {
         dispatch(createAddressUser(addressUser))
      } else {
         toast.error(
            <div>
               <ErrorOutlineIcon className='pr-1' fontSize='large' /> Số điện
               thoại phải đúng 10 số
            </div>,
            {
               position: 'top-right',
               autoClose: 2500,
               hideProgressBar: true,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            }
         )
      }
   }

   const selectRole = (id, role) => {
      dispatch(selectRoleAddressUser({ id: id, role: role }))
   }

   const updateAddress = (e) => {
      e.preventDefault()
      if (numberPhone.length === 14 || numberPhone.length === 10) {
         dispatch(updateAddressUser(updateInformationAddress))
      } else {
         toast.error(
            <div>
               <ErrorOutlineIcon className='pr-1' fontSize='large' /> Số điện
               thoại phải đúng 10 số
            </div>,
            {
               position: 'top-right',
               autoClose: 2500,
               hideProgressBar: true,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            }
         )
      }
   }

   return (
      <>
         <Header />

         {loading ? (
            <SkeletonEffect />
         ) : error ? (
            <Message variant='danger'>{error}</Message>
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
                     <h4 id='form-dialog-title' className='text-center p-3'>
                        Thêm địa chỉ mới
                     </h4>
                     <DialogContent style={{ width: '35rem' }}>
                        <Form
                           onSubmit={createAddress}
                           className='mt-2 border-0 mb-2'
                        >
                           <Form.Group controlId='address'>
                              <Form.Label as='p' className='mb-1 mt-2'>
                                 <strong>Thành Phố / Tỉnh</strong>
                              </Form.Label>
                              <Form.Control
                                 type='text'
                                 as='select'
                                 placeholder='Enter address'
                                 value={thanhPho}
                                 onChange={(e) => setThanhPho(e.target.value)}
                                 className='border-1 border-gray rounded-pill'
                              >
                                 <option>
                                    Vui lòng chọn thành phố/tỉnh...
                                 </option>
                                 {data.map((tp) => (
                                    <option
                                       style={{ color: 'black' }}
                                       key={tp.Id}
                                       value={tp.Name}
                                    >
                                       {tp.Name}
                                    </option>
                                 ))}
                              </Form.Control>
                           </Form.Group>

                           <Form.Group controlId='city'>
                              <Form.Label as='p' className='mb-1'>
                                 <strong> Quận / Huyện</strong>
                              </Form.Label>
                              <Form.Control
                                 type='text'
                                 as='select'
                                 placeholder='Enter city'
                                 value={huyen}
                                 onChange={(e) => setHuyen(e.target.value)}
                                 className='border-1 border-gray rounded-pill'
                              >
                                 <option>Vui lòng chọn quận/huyện...</option>
                                 {data.map(
                                    (a) =>
                                       a.Name === thanhPho &&
                                       a.Districts.map((b) => (
                                          <option
                                             key={b.Id}
                                             style={{ color: 'black' }}
                                             value={b.Name}
                                          >
                                             {b.Name}
                                          </option>
                                       ))
                                 )}
                              </Form.Control>
                           </Form.Group>

                           <Form.Group controlId='postalCode'>
                              <Form.Label as='p' className='mb-1'>
                                 <strong>Phường / Xã</strong>
                              </Form.Label>
                              <Form.Control
                                 type='text'
                                 as='select'
                                 required
                                 placeholder='Enter postalCode'
                                 value={xa}
                                 onChange={(e) => setXa(e.target.value)}
                                 className='border-1 border-gray rounded-pill'
                              >
                                 <option>
                                    Vui lòng chọn thành xã/phường...
                                 </option>
                                 {data.map(
                                    (a) =>
                                       a.Name === thanhPho &&
                                       a.Districts.map(
                                          (b) =>
                                             b.Name === huyen &&
                                             b.Wards.map((c) => (
                                                <option
                                                   style={{ color: 'black' }}
                                                >
                                                   {c.Name}
                                                </option>
                                             ))
                                       )
                                 )}
                              </Form.Control>
                           </Form.Group>

                           <Form.Group controlId='country'>
                              <Form.Label as='p' className='mb-1'>
                                 <strong>Địa chỉ chi tiết</strong>
                              </Form.Label>
                              <Form.Control
                                 type='text'
                                 placeholder='Enter country'
                                 value={diaChi}
                                 onChange={(e) => setDiachi(e.target.value)}
                                 className='border-1 border-gray rounded-pill'
                              ></Form.Control>
                           </Form.Group>

                           <Form.Group controlId='country'>
                              <Form.Label as='p' className='mb-1'>
                                 <strong>Số điện thoại</strong>
                              </Form.Label>
                              <Form.Control
                                 type='text'
                                 placeholder='Enter country'
                                 value={formatPhoneNumber(numberPhone)}
                                 onChange={(e) =>
                                    setNumberPhone(e.target.value)
                                 }
                                 className='border-1 border-gray rounded-pill'
                              ></Form.Control>
                           </Form.Group>

                           <div className='d-flex justify-content-center'>
                              <Button
                                 type='submit'
                                 className='btn_color rounded-pill text-center'
                                 style={{ width: '15rem' }}
                              >
                                 Tạo
                              </Button>
                           </div>
                        </Form>
                     </DialogContent>
                  </Dialog>
               </div>
               <div>
                  <Dialog
                     maxWidth='xl'
                     open={openEdit}
                     onClose={handleCloseEdit}
                     aria-labelledby='form-dialog-title'
                  >
                     <div className='d-flex justify-content-end'>
                        <Button
                           onClick={handleCloseEdit}
                           className='p-1 m-1 rounded-pill'
                           variant='light'
                        >
                           <Close />
                        </Button>
                     </div>
                     <h4 id='form-dialog-title' className='text-center p-3'>
                        Sửa thông tin địa chỉ
                     </h4>
                     <DialogContent style={{ width: '35rem' }}>
                        <Form
                           onSubmit={updateAddress}
                           className='mt-2 border-0 mb-2'
                        >
                           <Form.Group controlId='address'>
                              <Form.Label as='p' className='mb-1 mt-2'>
                                 <strong>Thành Phố / Tỉnh</strong>
                              </Form.Label>
                              <Form.Control
                                 type='text'
                                 as='select'
                                 placeholder='Enter address'
                                 value={thanhPho}
                                 onChange={(e) => setThanhPho(e.target.value)}
                                 className='border-1 border-gray rounded-pill'
                              >
                                 <option>
                                    Vui lòng chọn thành phố/tỉnh...
                                 </option>
                                 {data.map((tp) => (
                                    <option
                                       style={{ color: 'black' }}
                                       key={tp.Id}
                                       value={tp.Name}
                                    >
                                       {tp.Name}
                                    </option>
                                 ))}
                              </Form.Control>
                           </Form.Group>

                           <Form.Group controlId='city'>
                              <Form.Label as='p' className='mb-1'>
                                 <strong> Quận / Huyện</strong>
                              </Form.Label>
                              <Form.Control
                                 type='text'
                                 as='select'
                                 placeholder='Enter city'
                                 value={huyen}
                                 onChange={(e) => setHuyen(e.target.value)}
                                 className='border-1 border-gray rounded-pill'
                              >
                                 <option>Vui lòng chọn quận/huyện...</option>
                                 {data.map(
                                    (a) =>
                                       a.Name === thanhPho &&
                                       a.Districts.map((b) => (
                                          <option
                                             key={b.Id}
                                             style={{ color: 'black' }}
                                             value={b.Name}
                                          >
                                             {b.Name}
                                          </option>
                                       ))
                                 )}
                              </Form.Control>
                           </Form.Group>

                           <Form.Group controlId='postalCode'>
                              <Form.Label as='p' className='mb-1'>
                                 <strong>Phường / Xã</strong>
                              </Form.Label>
                              <Form.Control
                                 type='text'
                                 as='select'
                                 required
                                 placeholder='Enter postalCode'
                                 value={xa}
                                 onChange={(e) => setXa(e.target.value)}
                                 className='border-1 border-gray rounded-pill'
                              >
                                 <option>
                                    Vui lòng chọn thành xã/phường...
                                 </option>
                                 {data.map(
                                    (a) =>
                                       a.Name === thanhPho &&
                                       a.Districts.map(
                                          (b) =>
                                             b.Name === huyen &&
                                             b.Wards.map((c) => (
                                                <option
                                                   style={{ color: 'black' }}
                                                >
                                                   {c.Name}
                                                </option>
                                             ))
                                       )
                                 )}
                              </Form.Control>
                           </Form.Group>

                           <Form.Group controlId='country'>
                              <Form.Label as='p' className='mb-1'>
                                 <strong>Địa chỉ chi tiết</strong>
                              </Form.Label>
                              <Form.Control
                                 type='text'
                                 placeholder='Enter country'
                                 value={diaChi}
                                 onChange={(e) => setDiachi(e.target.value)}
                                 className='border-1 border-gray rounded-pill'
                              ></Form.Control>
                           </Form.Group>

                           <Form.Group controlId='country'>
                              <Form.Label as='p' className='mb-1'>
                                 <strong>Số điện thoại</strong>
                              </Form.Label>
                              <Form.Control
                                 type='text'
                                 placeholder='Enter country'
                                 value={formatPhoneNumber(numberPhone)}
                                 onChange={(e) =>
                                    setNumberPhone(e.target.value)
                                 }
                                 className='border-1 border-gray rounded-pill'
                              ></Form.Control>
                           </Form.Group>

                           <div className='d-flex justify-content-center'>
                              <Button
                                 type='submit'
                                 className='btn_color rounded-pill text-center'
                                 style={{ width: '15rem' }}
                              >
                                 Cập nhật
                              </Button>
                           </div>
                        </Form>
                     </DialogContent>
                  </Dialog>
               </div>
               <Container className='mt-4 mb-4 card_color shadow p-4'>
                  <div
                     className='text-center pb-3 d-flex justify-content-between align-items-center'
                     style={{ borderBottom: '0.1rem solid #ddd' }}
                  >
                     <h4>Danh sách địa chỉ</h4>
                     <Button
                        className='btn_color_created rounded-pill'
                        variant='outline-light'
                        size='sm'
                        onClick={handleClickOpen}
                        disabled={user.address && user?.address.length === 5}
                     >
                        <i className='fas fa-plus pr-1'></i>Thêm địa chỉ mới
                     </Button>
                  </div>
                  {user.address && user?.address.length === 5 && (
                     <Announcement
                        variant='warning'
                        className='d-flex justify-content-center'
                     >
                        Danh sách địa chỉ đã đầy. Nếu bạn muốn thêm một địa chỉ
                        mới, xin vui lòng xoá địa chỉ không cần thiết. Xin cảm
                        ơn!
                     </Announcement>
                  )}
                  {user.address?.map((add) => (
                     <div
                        className='p-3 mt-1 mb-1'
                        style={{ borderBottom: '0.1rem solid #ddd' }}
                     >
                        <Row className='mb-2'>
                           <Col md={3} className='d-flex align-items-center '>
                              <strong>Số điện thoại</strong>
                           </Col>
                           <Col
                              md={7}
                              style={{ fontSize: '0.9rem' }}
                              className='d-flex align-items-center'
                           >
                              {formatPhoneNumber(add.numberPhone)}
                           </Col>
                           <Col md={1} className='d-flex align-items-center '>
                              <Link>
                                 <Button
                                    variant='outline-warning'
                                    size='sm'
                                    className='rounded-pill'
                                    onClick={() => handleClickOpenEdit(add._id)}
                                 >
                                    Sửa
                                 </Button>
                              </Link>
                           </Col>
                           <Col md={1}>
                              <Button
                                 variant='outline-danger'
                                 size='sm'
                                 className='rounded-pill'
                                 onClick={() => deleteAddress(add._id)}
                              >
                                 Xoá
                              </Button>
                           </Col>
                        </Row>
                        <Row className='button_select_default'>
                           <Col md={3} className='d-flex align-items-center'>
                              <strong>Địa chỉ liên hệ</strong>
                           </Col>
                           <Col
                              md={7}
                              style={{ fontSize: '0.9rem' }}
                              className='d-flex align-items-center'
                           >
                              {add.diaChi} {' - '} {add.xa} {' - '} {add.huyen}{' '}
                              {' - '}
                              {add.thanhPho}.
                           </Col>
                           <Col md={2} className='text-center'>
                              <Button
                                 size='sm'
                                 variant='outline-dark'
                                 className='rounded-pill btn-block select_default'
                                 disabled={add.role === true}
                                 onClick={() => selectRole(add._id, true)}
                              >
                                 Thiết lập mặc định
                              </Button>
                           </Col>
                        </Row>
                     </div>
                  ))}
                  <ToastContainer />
               </Container>
            </>
         )}
         <Footer />
      </>
   )
}

export default UsersAddressListScreen
