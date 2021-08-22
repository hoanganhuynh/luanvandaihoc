import { deepOrange } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Image, Row } from 'react-bootstrap'
import Resizer from 'react-image-file-resizer'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { uploadFileAvatar } from '../actions/cloudinary'
import { register } from '../actions/userActions'
import Footer from '../components/Footer.js'
import Header from '../components/Header.js'
import Loader from '../components/Loader'
import Message from '../components/Message'

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

function RegisterScreen({ location, history }) {
   const classes = useStyles()

   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [avatar, setAvatar] = useState(null)
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [message, setMessage] = useState(null)
   const [uploading, setUploading] = useState(false)

   const dispatch = useDispatch()

   const userRegister = useSelector((state) => state.userRegister)
   const { loading, error, userInfo } = userRegister

   const redirect = location.search ? location.search.split('=')[1] : '/'
   const submitHandler = (e) => {
      e.preventDefault()
      if (password !== confirmPassword) {
         setMessage('Password do not match')
      } else {
         dispatch(register(name, email, avatar, password))
      }
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
               })
               setUploading(true)
            } catch (error) {
               setUploading(false)
            }
         })
      }
   }

   useEffect(() => {
      if (userInfo) {
         history.push(redirect)
      }

      window.scrollTo(0, 0)
   }, [history, userInfo, redirect])

   return (
      <>
         <Header />
         <Row className='shadow p-5 card_color m-0'>
            
            <Col className="pl-3" md={5}>
               <div>
                  {message && <Message variant='danger'>{message}</Message>}
                  {error && <Message variant='danger'>{error}</Message>}
                  {loading && <Loader />}
                  {/* {uploading === false && (
                     <Message variant='danger'>
                        {'Ảnh đại diện không được trống'}
                     </Message>
                  )} */}
                  <Form onSubmit={submitHandler}>
                     <h2 className='text-center'>Đăng kí</h2>
                     <Form.Group controlId='name'>
                        <Form.Label as='p' className='mb-1'>
                           Họ và tên
                        </Form.Label>
                        <Form.Control
                           type='name'
                           placeholder='Nhập họ và tên'
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                           className='border border-grey rounded-pill'
                        ></Form.Control>
                     </Form.Group>

                     <Form.Group controlId='email'>
                        <Form.Label as='p' className='mb-1'>
                           Địa chỉ email
                        </Form.Label>
                        <Form.Control
                           type='email'
                           placeholder='Nhập địa chỉ email'
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           className='border border-grey rounded-pill'
                        ></Form.Control>
                     </Form.Group>

                     <Form.Group controlId='password'>
                        <Form.Label as='p' className='mb-1'>
                           Mật khẩu
                        </Form.Label>
                        <Form.Control
                           type='password'
                           placeholder='Nhập mật khẩu'
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           className='border border-grey rounded-pill'
                        ></Form.Control>
                     </Form.Group>

                     <Form.Group controlId='password'>
                        <Form.Label as='p' className='mb-1'>
                           Nhập lại mật khẩu
                        </Form.Label>
                        <Form.Control
                           type='password'
                           placeholder=' Nhập lại mật khẩu'
                           value={confirmPassword}
                           onChange={(e) => setConfirmPassword(e.target.value)}
                           className='border border-grey rounded-pill'
                        ></Form.Control>
                     </Form.Group>

                     <Form.Group controlId='image'>
                        <Form.Label as='p' className='mb-1'>
                           Ảnh đại diện
                        </Form.Label>
                        <Row>
                           <div className='d-flex align-items-center'>
                              <Col md={3}>
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
                                    label='Chọn ảnh'
                                    custom
                                    onChange={uploadFile}
                                    required
                                 ></Form.File>
                                 {/* {uploading && <Loader />} */}
                              </Col>
                           </div>
                        </Row>
                     </Form.Group>

                     <div>
                        <Button
                           type='submit'
                           variant='outline-light'
                           className='btn-block  rounded-pill btn_color_created'
                           style={{
                              fontSize: '0.875rem',
                              letterSpacing: '0.25rem',
                           }}
                        >
                           Đăng kí
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
                           <div>
                              Bạn đã có tài khoản?
                              <Link
                                 className='text-decoration-none text-info pl-1 '
                                 to={
                                    redirect
                                       ? `/login?redirect=${redirect}`
                                       : '/login'
                                 }
                                 style={{ fontWeight: '700' }}
                              >
                                 Đăng nhập
                              </Link>
                           </div>
                        </Col>
                     </Row>
                  </Form>
               </div>
            </Col>

            <Col md={7}>
               <Image src='/background/3071357.jpg' fluid />
            </Col>

         </Row>
         <Footer />
      </>
   )
}

export default RegisterScreen
