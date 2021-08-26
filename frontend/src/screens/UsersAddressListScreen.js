import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Link from '@material-ui/core/Link'
import { Close } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { Radio, RadioGroup} from 'react-radio-group'
import { Image, Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import DeleteOutlined from '@material-ui/icons/DeleteOutlined'
import EditIcon from '@material-ui/icons/Edit';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

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
   const [diaDiem, setDiadiem] = useState('Nhà')
   const [numberPhone, setNumberPhone] = useState('')
   const [open, setOpen] = useState(false)
   const [openEdit, setOpenEdit] = useState(false)
   const [idAddress, setIdAddress] = useState('')

   const addressUser = { thanhPho, huyen, xa, diaChi, diaDiem, numberPhone }
   const updateInformationAddress = {
      idAddress,
      thanhPho,
      huyen,
      xa,
      diaChi,
      diaDiem,
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
            <div className="categorylink mt-2 mb-3 ml-4">
               <span className="fa fa-home"></span>
               <span className="fa fa-angle-right"></span>
               <span>Cá nhân</span>
               <span className="fa fa-angle-right"></span>
               <span> Địa chỉ</span>
            </div>
               <div>
                  <Dialog
                     // fullScreen="xs"
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
                           <Form>
                              <div value={diaDiem} onChange={(e) => setDiadiem(e.target.value)}>
                                 <Form.Label as='p' className='mb-1'>
                                    <strong>Tôi sẽ giao hàng đến:</strong>
                                 </Form.Label>
                                 <Form.Check
                                 inline
                                    name="group1"
                                    type='radio'
                                    label='Nhà'
                                    value="Nhà"
                                 />

                                 <Form.Check
                                    inline
                                    name="group1"
                                    type='radio'
                                    label='Công ty'
                                    value='Công ty'
                                 />
                              </div>
                              
                           </Form>

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
                                 placeholder='Nhập địa chỉ chi tiết'
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
                                 className='btn-block btn-success rounded-pill add-to-card'
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
                           <Form>
                              <div value={diaDiem} onChange={(e) => setDiadiem(e.target.value)}>
                                 <Form.Label as='p' className='mb-1'>
                                    <strong>Tôi sẽ giao hàng đến:</strong>
                                 </Form.Label>
                                 <Form.Check
                                 inline
                                    name="group1"
                                    type='radio'
                                    label='Nhà'
                                    value="Nhà"
                                 />

                                 <Form.Check
                                    inline
                                    name="group1"
                                    type='radio'
                                    label='Công ty'
                                    value='Công ty'
                                 />
                              </div>
                              
                           </Form>
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
                                 className='btn-block btn-success rounded-pill add-to-card'
                                 style={{ width: '15rem' }}
                              >
                                 Cập nhật
                              </Button>
                           </div>
                        </Form>
                     </DialogContent>
                  </Dialog>
               </div>
               <div className='mt-4 mb-5 px-4'>
                  <div
                     className='text-center pb-3 d-flex justify-content-between align-items-center'
                     
                  >
                     <h4>Danh sách địa chỉ ({user && user.address?.length})</h4>
                     <Button
                        className='btn-success rounded-pill add-to-card'
                        variant='outline-light'
                        size='sm'
                        onClick={handleClickOpen}
                        disabled={user.address && user?.address.length === 5}
                     >
                        <i className='fas fa-plus pr-1'></i>Thêm địa chỉ mới
                     </Button>
                  </div>

                  <Row className='my-2 pb-3 m-0' style={{borderBottom: '1px solid #e0e0e0'}}>
                     <Col className='text-center' md={2}><strong>Số điện thoại</strong></Col>
                     <Col className='text-center' md={2}><strong>Loại</strong></Col>
                     <Col className='text-center' md={2}><strong>Xã/Phường</strong></Col>
                     <Col className='text-center' md={2}><strong>Quận/Huyện</strong></Col>
                     <Col className='text-center' md={2}><strong>Tỉnh/Thành phố</strong></Col>
                     <Col className='text-center' md={2}><strong>Thao tác</strong></Col>
                  </Row>
                  {user.address && user.address?.map((add) => (
                     <Row className='my-3 align-item-center'>
                        <Col className='text-center m-0' md={2}><p className='m-0'>{formatPhoneNumber(add.numberPhone)}</p></Col>
                        {add.diaDiem == 'Nhà' ? (
                           <Col className='text-center' md={2}><span className='diaDiem-nha'>{add.diaDiem}</span></Col>
                        ) : (
                           <Col className='text-center' md={2}><span className='diaDiem-congty'>{add.diaDiem}</span></Col>
                        )}
                        
                        <Col className='text-center' md={2}><p className='m-0'>{add.xa}</p></Col>
                        <Col className='text-center' md={2}><p className='m-0'>{add.huyen}</p></Col>
                        <Col className='text-center' md={2}><p className='m-0'>{add.thanhPho}</p></Col>
                        <Col className='text-center' md={2}>
                           <Button
                              variant='outline-warning'
                              size='sm'
                              className='rounded-pill'
                              onClick={() => handleClickOpenEdit(add._id)}
                           >
                              <EditIcon fontSize='small'/>
                           </Button>
                           <Button
                              variant='outline-danger'
                              size='sm'
                              className='rounded-pill mx-1'
                              onClick={() => deleteAddress(add._id)}
                           >
                              
                              <DeleteOutlined fontSize='small' />
                           </Button>
                           {add.role === true ? (
                              <Button
                              size='sm'
                              variant='outline-dark'
                              // disabled
                              className='rounded-pill'
                              onClick={() => selectRole(add._id, true)}
                           >
                              <StarIcon fontSize='small' />
                           </Button>
                           ): (
                              <Button
                                 size='sm'
                                 variant='outline-dark'
                                 className='rounded-pill'
                                 onClick={() => selectRole(add._id, true)}
                              >
                                 <StarBorderIcon fontSize='small' />
                              </Button>

                           )}
                        </Col>

                     </Row>
                     
                  ))}
                  
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
                  
                  <ToastContainer />
               </div>
            </>
         )}
         <Footer />
      </>
   )
}

export default UsersAddressListScreen
