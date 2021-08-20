import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Image, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'
import FormContainer from '../components/FormContainer'
import Step from '../components/Step'
import Footer from '../components/Footer.js'
import Header from '../components/Header.js'

export const PaymentScreen = ({ history }) => {
   const cart = useSelector((state) => state.cart)
   const { shippingAddress } = cart

   if (!shippingAddress) {
      history.push('/shipping')
   }

   const [paymentMethod, setPaymentMethod] = useState('Thanh toán bằng PayPal')

   const dispatch = useDispatch()

   useEffect(() => {
      window.scrollTo(0, 0)
   }, [])

   const submitHandler = (e) => {
      e.preventDefault()
      dispatch(savePaymentMethod(paymentMethod))
      history.push('/placeorder')
   }

   return (
      <>
         <Header />
         <Row className='shadow p-2 card_color m-4' style={{ height: '100vh' }}>
            <Col md={6} className='d-flex align-items-center'>
               <Image
                  src='/background/payment.jpg'
                  style={{ height: '90vh' }}
               />
            </Col>
            <Col md={6} className='d-flex align-items-center'>
               <div>
                  <Step step1 step2 step3 />
                  <Form
                     onSubmit={submitHandler}
                     className=' p-4 mt-2 text-center'
                  >
                     <Form.Group>
                        <Form.Label as='legend'>
                           <h3>Phương thức thanh toán</h3>
                        </Form.Label>

                        <Col>
                           <div>
                              <RadioGroup
                                 value={paymentMethod}
                                 onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                 }
                              >
                                 <FormControlLabel
                                    value='Thanh toán bằng PayPal'
                                    control={<Radio />}
                                    label='Thanh toán bằng PayPal'
                                 />
                                 <FormControlLabel
                                    value='Thanh toán bằng tiền mặt'
                                    control={<Radio />}
                                    label='Thanh toán bằng tiền mặt'
                                 />
                              </RadioGroup>
                           </div>
                        </Col>
                     </Form.Group>

                     <Button
                        type='submit'
                        variant='danger'
                        className='btn-block btn_color rounded-pill'
                     >
                        Tiếp Tục
                     </Button>
                  </Form>
               </div>
            </Col>
         </Row>
         <Footer />
      </>
   )
}
