import { deepOrange } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Image, Row } from 'react-bootstrap'
import Resizer from 'react-image-file-resizer'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CREATE_USER_RESET } from '../../constants/userConstants'
import { uploadFileAvatar } from '../../actions/cloudinary'
import { createUser } from '../../actions/userActions'
import Footer from '../../components/Footer.js'
import Header from './components/Header'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import SideBar from './components/SideBar'
import { Radio, Input, Space } from 'antd'
import MessageSuccess from '../../components/MessageSuccess'
import SkeletonEffect from '../../components/SkeletonEffect'

const useStyles = makeStyles((theme) => ({
   root: {
      display: 'flex',
   },
   orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
      width: theme.spacing(8),
      height: theme.spacing(8),
      fontSize: '3rem',
   },
}))

function CreateUserScreen({ location, history }) {
   const classes = useStyles()

   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [role, setRole] = useState('')
   const [address, setAddress] = useState('')
   const [avatar, setAvatar] = useState(null)
   const [password, setPassword] = useState('')
   const [numberPlate, setNumberPlate] = useState('')
   const [numberPhoneShipper, setNumberPhoneShipper] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [message, setMessage] = useState(null)
   const [uploading, setUploading] = useState(false)

   const dispatch = useDispatch()

   // const userRegister = useSelector((state) => state.userRegister)
   const { loading, error, success } = useSelector((state) => state.createUser)

   // const createUser1 = useSelector((state) => state.createUser1)
   // const {
   //    loading: loadingCreate,
   //    error: errorCreate,
   //    success: successCreate,
   // } = createUser1

   const submitHandler = (e) => {
      e.preventDefault()
      const formData = new FormData();
      formData.set('name', name)
      formData.set('email', email)
      formData.set('password', password)
      formData.set('role', role)
      formData.set('numberPlate', numberPlate)
      formData.set('numberPhoneShipper', numberPhoneShipper)
      formData.set('avatar', JSON.stringify(avatar))
      console.log('avatar', formData.get('avatar'))
      console.log('avatar1', JSON.stringify(avatar))

      dispatch(createUser(formData))
   }

   const uploadFile = (e) => {
      let files = e.target.files[0]

      let preview = []
      if (files) {
         preview.push(files.name)
         Resizer.imageFileResizer(files, 720, 720, 'JPEG', 100, 0, (uri) => {
            try {
               uploadFileAvatar({ image: uri }).then((res) => {
                  setAvatar(res.data)
                  console.log('result', res.data)
               })
               setUploading(true)
            } catch (error) {
               setUploading(false)
            }
         })
      }
      console.log('avat', avatar)
   }

   useEffect(() => {
      if (success) {
         history.push('/admin/list-user')
         dispatch({ type: CREATE_USER_RESET })
      }

      window.scrollTo(0, 0)
   }, [history, dispatch, success])

   return (
      <>
         <Header />
         <Row style={{ backgroundColor: '#fff' }}>
            <Col md={2}>
               <SideBar />
            </Col>
            <Col md={10}>
               <>
               <div>
               {loading && (
                     <MessageSuccess variant='T???o th??nh c??ng'></MessageSuccess>
                  )}
                  {loading ? (
                     <SkeletonEffect />
                  ) : error ? (
                     <Message>{error}</Message>
                  ) : (
                     <>
                   {/* {message && <Message variant='danger'>{message}</Message>}
                   {error && <Message variant='danger'>{error}</Message>}
                   {loading && <Loader />} */}
                  {/* {uploading === false && (
                     <Message variant='danger'>
                        {'???nh ?????i di???n kh??ng ???????c tr???ng'}
                     </Message>
                  )} */}
                  <Form onSubmit={submitHandler} fluid>
                     <h2 className='text-center p-2'>????ng k??</h2>
                     <Form.Group controlId='name'>
                        <Form.Label as='p' className='mb-1'>
                           H??? v?? t??n
                        </Form.Label>
                        <Form.Control
                           type='name'
                           placeholder='Nh???p h??? v?? t??n'
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                           className='border border-grey rounded-pill'
                        ></Form.Control>
                     </Form.Group>

                     <Form.Group controlId='email'>
                        <Form.Label as='p' className='mb-1'>
                           ?????a ch??? email
                        </Form.Label>
                        <Form.Control
                           type='email'
                           placeholder='Nh???p ?????a ch??? email'
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           className='border border-grey rounded-pill'
                        ></Form.Control>
                     </Form.Group>

                     <Form.Group controlId='password'>
                        <Form.Label as='p' className='mb-1'>
                           M???t kh???u
                        </Form.Label>
                        <Form.Control
                           type='password'
                           placeholder='Nh???p m???t kh???u'
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           className='border border-grey rounded-pill'
                        ></Form.Control>
                     </Form.Group>
                     <Form.Group controlId='numberPhoneShipper'>
                        <Form.Label as='p' className='mb-1'>
                           S??? ??i???n tho???i
                        </Form.Label>
                        <Form.Control
                           type='text'
                           placeholder='Nh???p s??? ??i???n tho???i'
                           value={numberPhoneShipper}
                           onChange={(e) => setNumberPhoneShipper(e.target.value)}
                           className='border border-grey rounded-pill'
                        ></Form.Control>
                     </Form.Group>

                     <Form.Group controlId='password'>
                        <Form.Label as='p' className='mb-1'>
                           Bi???n s??? xe
                        </Form.Label>
                        <Form.Control
                           type='text'
                           placeholder='Nh???p bi???n s??? xe'
                           value={numberPlate}
                           onChange={(e) => setNumberPlate(e.target.value)}
                           className='border border-grey rounded-pill'
                        ></Form.Control>
                     </Form.Group>
                     <Form.Group controlId='password'>
                        <Form.Label as='p' className='mb-1'>
                           Ph??n quy???n
                        </Form.Label>
                        <Radio.Group onChange={(e) => setRole(e.target.value)} value={role}>
                           <Space direction="vertical">
                              <Radio value={"admin"}>Admin</Radio>
                              <Radio value={"shipper"}>Shipper</Radio>
                              <Radio value={"order"}>B??n H??ng</Radio>
                           </Space>
                        </Radio.Group>
                     </Form.Group>

                     <Form.Group controlId='image'>
                        <Form.Label as='p' className='mb-1'>
                           ???nh ?????i di???n
                        </Form.Label>
                        <Row>
                           <div className='d-flex align-items-center'>
                              <Col md={6}>
                                 {avatar && (
                                    <Image
                                       src={avatar && avatar?.url}
                                       className='rounded-circle avatar_img'
                                       fluid
                                    />
                                 )}
                              </Col>
                              <Col md={6}>
                                 <Form.File
                                    className='border border-grey'
                                    id='image-file'
                                    label='Ch???n ???nh'
                                    custom
                                    onChange={uploadFile}
                                    required
                                    style={{ width: '220px' }}
                                 ></Form.File>
                                 {/* {uploading && <Loader />} */}
                              </Col>
                           </div>
                        </Row>
                     </Form.Group>

                     <div>
                        <Button
                           type='submit'
                           // variant='outline-light'
                           className='btn-block btn_color_created'
                           style={{
                              fontSize: '0.875rem',
                              letterSpacing: '0.25rem',
                              backgroundColor: '#3ba66b',
                              borderRadius: '9px'

                           }}
                        >
                           ????ng k??
                        </Button>
                     </div>

                     <Row className='py-3'>
                        <Col
                           className='d-flex align-items-center justify-content-center'
                           style={{
                              fontSize: '0.8rem',
                              letterSpacing: '0.05rem',
                           }}
                        >
                        </Col>
                     </Row>
                  </Form>
                  </>
                  )}
               </div>
               </>
            </Col>
         </Row>
         <Footer />
      </>
   )
}

export default CreateUserScreen
