import firebase from 'firebase'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Image, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { login, register } from '../actions/userActions'
import Footer from '../components/Footer.js'
import Header from '../components/Header.js'
import Message from '../components/Message'
import ProgressLine from '../components/ProgressLine'
import configAuth from '../configAuth'

const firebaseApp = firebase.initializeApp(configAuth)

function LoginScreen({ location, history }) {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const [isLogin, setIsLogin] = useState(false)
   const [name, setName] = useState('')
   const [mail, setMail] = useState('')
   const [avatar, setPhoto] = useState('')

   const onSubmit = () => {
      var provider = new firebase.auth.GoogleAuthProvider()
      firebase
         .auth()
         .signInWithPopup(provider)
         .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential

            var token = credential.accessToken

            const { user } = result

            const email = user.email
            const name = user.displayName
            const avatar = { public_id: null, url: user.photoURL }
            const password = ''

            dispatch(register(name, email, avatar, password))
         })
         .catch((error) => {
            console.log(error)
         })
   }

   const dispatch = useDispatch()

   const userLogin = useSelector((state) => state.userLogin)
   const { loading, error, userInfo } = userLogin

   const redirect = location.search ? location.search.split('=')[1] : '/'
   const submitHandler = (e) => {
      e.preventDefault()
      dispatch(login(email, password))
   }

   useEffect(() => {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            console.log('User signed in')
            console.log(user.displayName + '\n' + user.email)
            setIsLogin(true)
            setName(user.displayName)
            setPhoto(user.photoURL)
            setMail(user.email)
            // history.push(redirect)
         } else {
            console.log('No User')
         }
      })
      window.scrollTo(0, 0)
   }, [])

   useEffect(() => {
      if (userInfo) {
         if (userInfo?.isAdmin === true) {
            history.push('/admin')
         } else {
            history.push(redirect)
         }
      }
   }, [history, userInfo, redirect])

   return (
      <>
         <Header />
         <Row className='shadow p-5 card_color ml-4 mr-4'>
            
            <Col md={5}>
               <div className='pt-5 mt-5'>
                  {error && <Message variant='danger'>{error}</Message>}
                  {loading && <ProgressLine />}
                  <Form onSubmit={submitHandler}>
                     <h2 className='text-center'>Đăng nhập</h2>
                     <Form.Group controlId='email' className='pt-3'>
                        <Form.Label as='p' className='mb-1'>
                           Địa chỉ email
                        </Form.Label>
                        <Form.Control
                           className='border border-grey rounded-pill'
                           type='email'
                           placeholder='Nhập địa chỉ email'
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                     </Form.Group>

                     <Form.Group controlId='password'>
                        <Form.Label as='p' className='mb-1'>
                           Mật khẩu
                        </Form.Label>
                        <Form.Control
                           className='border border-grey rounded-pill'
                           type='password'
                           placeholder='Nhập mật khẩu'
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                     </Form.Group>

                     <div className='mt-2'>
                        <Button
                           type='submit'
                           variant='outline-light'
                           className='btn-block  rounded-pill mb-3 btn_color_created'
                           style={{
                              fontSize: '0.875rem',
                              letterSpacing: '0.25rem',
                           }}
                        >
                           Đăng nhập
                        </Button>
                        {isLogin === false ? (
                           <Button
                              variant='outline-light'
                              className='btn-block shadow rounded-pill btn_gg'
                              style={{
                                 fontSize: '0.8rem',
                                 letterSpacing: '0.05rem',
                                 border: '1px solid #ddd',
                                 color: '#1a1a1a',
                              }}
                              onClick={onSubmit}
                           >
                              <Image
                                 src='https://img.icons8.com/fluent/20/000000/google-logo.png'
                                 className='pr-1'
                              />
                              Đăng nhập bằng tài khoản Google
                           </Button>
                        ) : (
                           <Button
                              variant='outline-light'
                              className='btn-block shadow rounded-pill btn_gg'
                              style={{
                                 fontSize: '0.8rem',
                                 border: '1px solid #ddd',
                                 letterSpacing: '0.05rem',
                                 color: '#1a1a1a',
                              }}
                              onClick={onSubmit}
                           >
                              <Image
                                 src='https://img.icons8.com/fluent/20/000000/google-logo.png'
                                 className='pr-1'
                              />
                              Đăng nhập bằng tài khoản Google
                           </Button>
                        )}
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
                              Bạn là thành viên mới?{' '}
                              <Link
                                 className='text-decoration-none text-info pl-1'
                                 to={
                                    redirect
                                       ? `/register?redirect=${redirect}`
                                       : '/register'
                                 }
                                 style={{ fontWeight: '700' }}
                              >
                                 Đăng kí
                              </Link>
                           </div>
                        </Col>
                     </Row>
                  </Form>
               </div>
            </Col>
            <Col md={7}>
               <div className='d-flex justify-content-center'>
                  <Image
                     style={{ zIndex: '2' }}
                     src='/background/Wavy_Gen-01_Single-07.jpg'
                     fluid
                  />
               </div>
            </Col>
         </Row>
         <Footer />
      </>
   )
}

export default LoginScreen
