import { Switch } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Image, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserDetails, updateUser } from '../../actions/userActions'
import FormContainer from '../../components/FormContainer'
import SkeletonEffect from '../../components/SkeletonEffect'
import Message from '../../components/Message'
import MessageSuccess from '../../components/MessageSuccess'
import { USER_UPDATE_RESET } from '../../constants/userConstants'
import Header from './components/Header'
import SideBar from './components/SideBar'

function UserEditScreen({ match, history }) {
   const [state, setState] = useState(false)

   const handleChange = () => {
      setState(!state)
   }

   const userId = match.params.id

   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [isAdmin, setIsAdmin] = useState(false)
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')

   const dispatch = useDispatch()

   const userDetails = useSelector((state) => state.userDetails)
   const { loading, error, user } = userDetails

   const userUpdate = useSelector((state) => state.userUpdate)
   const {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
   } = userUpdate

   const submitHandler = (e) => {
      e.preventDefault()

      dispatch(updateUser({ _id: userId, name, email, isAdmin, password }))
   }

   useEffect(() => {
      if (successUpdate) {
         dispatch({ type: USER_UPDATE_RESET })
      } else {
         if (!user.name || user._id !== userId) {
            dispatch(getUserDetails(userId))
         } else {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
         }
      }
   }, [dispatch, user, userId, successUpdate])

   return (
      <>
         <Header />
         <Row style={{ backgroundColor: '#fafafa' }}>
            <Col md={2} className='p-0'>
               <SideBar />
            </Col>
            <Col md={10} className='pl-0 mt-3'>
               <div className='d-flex justify-content-center'>
                  {loadingUpdate && <SkeletonEffect /> && (
                     <MessageSuccess variant='Ch???nh s???a th??nh c??ng'></MessageSuccess>
                  )}
                  {errorUpdate && <Message>{errorUpdate}</Message>}
                  {loading ? (
                     <SkeletonEffect />
                  ) : (
                     <Form
                        onSubmit={submitHandler}
                        className='bg-light p-3 card_color '
                        style={{ width: '50rem' }}
                     >
                        <h2 className='mt-3 text-center'>
                           C???p nh???t ng?????i d??ng
                        </h2>
                        <Row>
                           <Col md={6}>
                              <Form.Group controlId='name'>
                                 <Form.Label>
                                    <strong>T??n</strong>
                                 </Form.Label>
                                 <Form.Control
                                    type='name'
                                    placeholder='Nh???p t??n'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className='rounded-pill border-1'
                                 ></Form.Control>
                              </Form.Group>
                           </Col>
                           <Col md={6}>
                              <Form.Group controlId='email'>
                                 <Form.Label>
                                    <strong>?????a ch??? email</strong>
                                 </Form.Label>
                                 <Form.Control
                                    type='email'
                                    placeholder='Enter email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='rounded-pill border-1'
                                 ></Form.Control>
                              </Form.Group>
                           </Col>
                        </Row>

                        <Form.Group
                           controlId='idAdmin'
                           className='d-flex justify-content-start'
                        >
                           <Form.Check
                              type='checkbox'
                              label='Ng?????i qu???n l??'
                              size='lg'
                              checked={isAdmin}
                              onChange={(e) => setIsAdmin(e.target.checked)}
                           ></Form.Check>
                        </Form.Group>
                        <div className='d-flex align-items-center'>
                           <Switch
                              value={state}
                              onChange={handleChange}
                              color='secondary'
                              name='checkedB'
                              inputProps={{ 'aria-label': 'primary checkbox' }}
                           />
                           {state === true ? (
                              <p className='mb-0' style={{ opacity: '1' }}>
                                 <strong>?????i m???t kh???u</strong>
                                 <Image
                                    style={{ opacity: '1' }}
                                    src='https://img.icons8.com/fluent/32/000000/unlock-2.png'
                                 />
                              </p>
                           ) : (
                              <p className='mb-0' style={{ opacity: '0.7' }}>
                                 ?????i m???t kh???u
                                 <Image
                                    style={{ opacity: '1' }}
                                    src='https://img.icons8.com/fluent/32/000000/lock-2.png'
                                 />
                              </p>
                           )}
                        </div>
                        <Row>
                           <Col md={6}>
                              <Form.Group controlId='password' fluid>
                                 <Form.Label as='p' className='mb-1'>
                                    <strong>M???t kh???u m???i</strong>
                                 </Form.Label>
                                 {state === true ? (
                                    <>
                                       <Form.Control
                                          className='border-1 border-grey rounded-pill '
                                          type='password'
                                          placeholder='Nh???p m???t kh???u m???i'
                                          value={password}
                                          onChange={(e) =>
                                             setPassword(e.target.value)
                                          }
                                       ></Form.Control>
                                    </>
                                 ) : (
                                    <Form.Control
                                       className='border-1 border-grey rounded-pill '
                                       type='password'
                                       placeholder='Nh???p m???t kh???u m???i'
                                       value={password}
                                       onChange={(e) =>
                                          setPassword(e.target.value)
                                       }
                                       disabled
                                       // style={{ visibility: 'hidden' }}
                                    ></Form.Control>
                                 )}
                              </Form.Group>
                           </Col>
                           <Col md={6}>
                              <Form.Group controlId='password'>
                                 <Form.Label as='p' className='mb-1'>
                                    <strong>Nh???p l???i m???t kh???u</strong>
                                 </Form.Label>
                                 {state === true ? (
                                    <>
                                       <Form.Control
                                          className='border-1 border-grey rounded-pill'
                                          type='password'
                                          placeholder='Nh???p l???i m???t kh???u'
                                          value={confirmPassword}
                                          onChange={(e) =>
                                             setConfirmPassword(e.target.value)
                                          }
                                       ></Form.Control>
                                    </>
                                 ) : (
                                    <Form.Control
                                       className='border-1 border-grey rounded-pill'
                                       type='password'
                                       placeholder='Nh???p l???i m???t kh???u'
                                       value={confirmPassword}
                                       onChange={(e) =>
                                          setConfirmPassword(e.target.value)
                                       }
                                       disabled
                                       // style={{ visibility: 'hidden' }}
                                    ></Form.Control>
                                 )}
                              </Form.Group>
                           </Col>
                        </Row>
                        <div className='pl-3 pr-3 text-center'>
                           <Button
                              type='submit'
                              variant='outline-light'
                              className='rounded-pill btn_color_created'
                              style={{
                                 fontSize: '1rem',
                                 letterSpacing: '0.25rem',
                                 width: '15rem',
                              }}
                           >
                              C???p nh???t
                           </Button>
                        </div>
                     </Form>
                  )}
               </div>
            </Col>
         </Row>
      </>
   )
}

export default UserEditScreen
