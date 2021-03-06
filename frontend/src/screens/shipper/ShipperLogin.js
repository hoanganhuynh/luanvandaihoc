import firebase from 'firebase'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Image, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { loginShipper, register } from '../../actions/userActions'
import Footer from '../../components/Footer.js'
import Header from '../../components/Header.js'
import Message from '../../components/Message'
import ProgressLine from '../../components/ProgressLine'
import configAuth from '../../configAuth'

// const firebaseApp = firebase.initializeApp(configAuth)

function ShipperLogin({ location, history }) {
   document.querySelector('.header-shipper')?.classList.add('d-none')
   document.querySelector('.header-shipperr')?.classList.add('d-none')

   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   // const [isLogin, setIsLogin] = useState(false)
   // const [name, setName] = useState('')
   // const [mail, setMail] = useState('')
   // const [avatar, setPhoto] = useState('')

   const dispatch = useDispatch()

   const userLogin = useSelector((state) => state.userLogin)
   const { loading, error, userInfo } = userLogin

   const submitHandler = (e) => {
      e.preventDefault()
      dispatch(loginShipper(email, password))
   }
   const redirect = location.search ? location.search.split('=')[1] : '/shipper/login'
   // useEffect(() => {
   //    firebase.auth().onAuthStateChanged((user) => {
   //       if (user) {
   //          console.log('User signed in')
   //          console.log(user.displayName + '\n' + user.email)
   //          setIsLogin(true)
   //          setName(user.displayName)
   //          setPhoto(user.photoURL)
   //          setMail(user.email)
   //          // history.push(redirect)
   //       } else {
   //          console.log('No User')
   //       }
   //    })
   //    window.scrollTo(0, 0)
   // }, [])

   useEffect(() => {
      if (userInfo) {
         //if (userInfo?.shipper === true) {
            history.push('/shipper/orders')
         //} else {
            //history.push(redirect)
        // }
      }
   }, [history, userInfo])

   return (
      <>
         {/* <Header /> */}
         <Row className=' p-3  ml-4 mr-4' style={{position:'relative', top:'30px'}}>
            <Col md={12}>
               <div className='pt-5 d-flex flex-column align-items-center'>
                  {error && <Message variant='danger'>{error}</Message>}
                  {loading && <ProgressLine />}
                  <Image
                              style={{ zIndex: '2' }}
                              src='/background/shipper.jpeg'
                              width='180px'
                              className='mb-5'
                              // src={product && product.images[0].url}
                           />
                  <Form onSubmit={submitHandler}>
                     <h4 className='text-center text-success'>????ng nh???p Shipper</h4>
                     <Form.Group controlId='email' className='pt-4'>
                        <Form.Label as='p' className='mb-1'>
                           ?????a ch??? email
                        </Form.Label>
                        <Form.Control
                           className='border border-grey'
                           type='email'
                           placeholder='Nh???p ?????a ch??? email'
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           style={{borderRadius:'9px'}}
                        ></Form.Control>
                     </Form.Group>

                     <Form.Group controlId='password'>
                        <Form.Label as='p' className='mb-1'>
                           M???t kh???u
                        </Form.Label>
                        <Form.Control
                           className='border border-grey'
                           type='password'
                           placeholder='Nh???p m???t kh???u'
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           style={{borderRadius:'9px'}}
                        ></Form.Control>
                     </Form.Group>

                     <div className='mt-4'>
                        <Button
                           type='submit'
                           variant='outline-light'
                           className='btn-block  rounded-pill mb-3 btn_color_created'
                           style={{
                              fontSize: '0.875rem',
                              letterSpacing: '0.25rem',
                           }}
                        >
                           ????ng nh???p
                        </Button>
                        
                     </div>
                  </Form>
               </div>
            </Col>
         </Row>
         {/* <Footer /> */}
      </>
   )
}

export default ShipperLogin
