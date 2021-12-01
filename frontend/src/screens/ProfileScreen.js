import DateFnsUtils from '@date-io/date-fns'
import Avatar from '@material-ui/core/Avatar'
import { deepOrange } from '@material-ui/core/colors'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import { makeStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import {
   KeyboardDatePicker,
   MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Image, Row } from 'react-bootstrap'
import Resizer from 'react-image-file-resizer'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { uploadFileAvatar } from '../actions/cloudinary'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer.js'
import Header from '../components/Header.js'
import Message from '../components/Message'
import SkeletonEffect from '../components/SkeletonEffect'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import '../toast.css'

const useStyles = makeStyles((theme) => ({
   root: {
      display: 'flex',
   },
   orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
      width: theme.spacing(38.75),
      height: theme.spacing(40),
      fontSize: '15rem',
   },
}))

function ProfileScreen({ location, history }) {
   const classes = useStyles()
   
   // yeah

   const [state, setState] = useState(false)

   const handleChange = () => {
      setState(!state)
   }

   const [selectedDate, setSelectedDate] = useState(
      new Date('2021-03-22T21:11:54')
   )

   const handleDateChange = (date) => {
      setSelectedDate(date)
   }

   // console.log('user', user)

   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [avatar, setAvatar] = useState(null)
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [message, setMessage] = useState(null)
   const [sex, setSex] = useState('')
   const [thanhPho, setThanhPho] = useState('')
   const [huyen, setHuyen] = useState('')
   const [xa, setXa] = useState('')
   const [diaDiem, setDiadiem] = useState('')
   const [diaChi, setDiachi] = useState('')
   const [numberPhone, setNumberPhone] = useState('')
   const [uploading, setUploading] = useState(false)
   const address = { thanhPho, huyen, xa, diaChi, diaDiem }

   const dispatch = useDispatch()

   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin

   const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
   const { loading: loadingUpdate, success } = userUpdateProfile

   const userDetails = useSelector((state) => state.userDetails)
   const { loading, error, user } = userDetails

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

   const submitHandler = (e) => {
      e.preventDefault()
      error &&
         toast.error(
            <div>
               <ErrorOutlineIcon className='pr-1' fontSize='large' /> {error}
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

      if (password !== confirmPassword) {
         toast.error(
            <div>
               <ErrorOutlineIcon className='pr-1' fontSize='large' /> Password
               is not match
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
      } else {
         // if (numberPhone.length === 14 || numberPhone.length === 10) {
         dispatch(
            updateUserProfile({
               id: user._id,
               email,
               name,
               avatar,
               password,
               sex,
               selectedDate,
            })
         )
         toast.success(
            <div>
               <CheckCircleOutlineIcon className='pr-1' fontSize='large' />
               Hồ sơ đã được cập nhật
            </div>,
            {
               className: 'Toastify__toast--success',
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
            } catch (error) {
               setUploading(false)
            }
         })
      }
   }

   useEffect(() => {
      if (!userInfo) {
         history.push('/login')
      } else {
         if (!user || !user.name || success) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET })
            dispatch(getUserDetails('profile'))
         } else {
            setName(user.name)
            setEmail(user.email)
            setAvatar(user.avatar)
            // setAddress(user.address)
            {
               user.address?.map(
                  (ad) =>
                     ad.role === true &&
                     (setThanhPho(ad.thanhPho),
                     setHuyen(ad.huyen),
                     setXa(ad.xa),
                     setDiadiem(ad.diaDiem),
                     setDiachi(ad.diaChi),
                     setNumberPhone(ad.numberPhone))
               )
            }
            setSelectedDate(user.birthDay)
            setSex(user.sex)
         }
      }
      window.scrollTo(0, 0)
   }, [dispatch, history, success, user])

   return (
      <>
         <Header />
         {message && <Announcement variant='danger'>{message}</Announcement>}
         {error && <Announcement variant='danger'>{error}</Announcement>}

         {loading ? (
            <SkeletonEffect />
         ) : error ? (
            <Message variant='danger'>{error}</Message>
         ) : (
            <div className='border-0'>
               <Row className='justify-content-center  m-4 '>
                  <Col
                     md={4}
                     className='pt-5 shadow'
                     
                  >
                     <div
                        className='text-center mt-5 m-auto'
                        style={{
                           
                           borderRadius: '50%',
                           width: '20rem',
                           height: '20.6rem',
                        }}
                     >
                        <div className='text-center mb-3 avatar_container'>
                           {user.avatar?.url ? (
                              <>
                                 <Image
                                    style={{
                                       width: '10rem',
                                       height: '10rem',
                                    }}
                                    src={
                                       avatar ? avatar?.url : user.avatar?.url
                                    }
                                    className='rounded-circle avatar_img'
                                    fluid
                                 />

                                 <div className='avatar_upload'>
                                    <div className='avatar_edit'>
                                       {uploading && <SkeletonEffect />}
                                       <Form.Group>
                                          <Image
                                             className='avatar_icon'
                                             src='https://img.icons8.com/fluent/40/000000/camera.png'
                                          />
                                          <Form.File
                                             id='image-file'
                                             custom
                                             onChange={uploadFile}
                                             className='avatar_file'
                                          ></Form.File>
                                       </Form.Group>
                                    </div>
                                 </div>
                              </>
                           ) : (
                              <>
                                 <Avatar className={classes.orange}>
                                    {uploading && <SkeletonEffect />}
                                    {userInfo.name.substring(0, 1)}
                                 </Avatar>

                                 <div className='avatar_upload'>
                                    <div className='avatar_edit'>
                                       {uploading && <SkeletonEffect />}
                                       <Form.Group>
                                          <Image
                                             className='avatar_icon'
                                             src='https://img.icons8.com/fluent/40/000000/camera.png'
                                          />
                                          <Form.File
                                             id='image-file'
                                             custom
                                             onChange={uploadFile}
                                             className='avatar_file'
                                          ></Form.File>
                                       </Form.Group>
                                    </div>
                                 </div>
                              </>
                           )}
                        </div>
                        <div className='text-center mt-5'>
                           <Link
                              href='/myorders'
                              style={{
                                 fontSize: '0.8rem',
                                 letterSpacing: '0.05rem',
                              }}
                              className='text-decoration-none shadow'
                           >
                              <Button
                                 
                                 variant='outline-light'
                                 className='rounded-pill btn_color_created'
                                 style={{
                                    fontSize: '1rem',
                                    letterSpacing: '0.25rem',
                                 }}
                              >
                                 ĐƠN HÀNG CỦA TÔI
                              </Button>
                           </Link>
                        </div>
                     </div>
                  </Col>
                  <Col
                     md={8}
                     className='pt-4 pb-4  bg-light shadow border-0'
                     
                  >
                     <h2 className='text-center'>Thông tin cá nhân</h2>
                     <Form onSubmit={submitHandler} className='pl-4 pr-4 pt-3'>
                        <Row>
                           <Col md={6}>
                              <Form.Group controlId='name'>
                                 <Form.Label as='p' className='mb-1'>
                                    <strong>Họ và tên</strong>
                                 </Form.Label>
                                 <Form.Control
                                    className='border-1 border-grey rounded-pill'
                                    type='name'
                                    placeholder='Nhập họ và tên'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                 ></Form.Control>
                              </Form.Group>
                           </Col>

                           <Col md={6}>
                              <Form.Group controlId='email'>
                                 <Form.Label as='p' className='mb-1'>
                                    <strong>Địa chỉ email</strong>
                                 </Form.Label>
                                 <Form.Control
                                    className='border-1 border-grey rounded-pill'
                                    type='email'
                                    placeholder='Nhập địa chỉ email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                 ></Form.Control>
                              </Form.Group>
                           </Col>
                        </Row>
                        <Form.Group>
                           <Row>
                              <Col md={6}>
                                 <strong>Ngày sinh</strong>
                                 <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid container justify='space-between'>
                                       <KeyboardDatePicker
                                          className='m-0'
                                          margin='normal'
                                          id='date-picker-dialog'
                                          format='MM/dd/yyyy'
                                          value={selectedDate}
                                          onChange={handleDateChange}
                                          KeyboardButtonProps={{
                                             'aria-label': 'change date',
                                          }}
                                       />
                                    </Grid>
                                 </MuiPickersUtilsProvider>
                              </Col>
                              <Col md={6}>
                                 <strong>Giới tính:</strong>
                                 <RadioGroup
                                    value={sex}
                                    onChange={(e) => setSex(e.target.value)}
                                 >
                                    <div className='d-flex justify-content-evenly align-items-center'>
                                       <FormControlLabel
                                          value='Nam'
                                          control={<Radio size='small' />}
                                          label='Nam'
                                          size='medium'
                                       />
                                       <FormControlLabel
                                          value='Nữ'
                                          control={<Radio size='small' />}
                                          label='Nữ'
                                       />
                                    </div>
                                 </RadioGroup>
                              </Col>
                           </Row>
                        </Form.Group>
                        <Form.Group>
                           <div
                              className='rounded p-3'
                              style={{
                                 border: '0.14rem dotted grey',
                              }}
                           >
                              <Row className='mb-2'>
                                 <Col md={3}>
                                    <strong>Số điện thoại</strong>
                                 </Col>
                                 <Col md={9} style={{ fontSize: '0.9rem' }}>
                                    {formatPhoneNumber(numberPhone)}
                                 </Col>
                              </Row>
                              <Row>
                                 <Col md={3}>
                                    <strong>Địa chỉ liên hệ</strong>
                                 </Col>
                                 <Col md={9} style={{ fontSize: '0.9rem' }}>
                                    {diaDiem} {' - '}
                                    {diaChi} {' - '} {xa} {' - '} {huyen}{' '}
                                    {' - '}
                                    {thanhPho}.
                                 </Col>
                              </Row>
                              <div className='text-end'>
                                 <strong>
                                    <Link
                                       href='/profile/address'
                                       color='secondary'
                                    >
                                       Thay đổi
                                    </Link>
                                 </strong>
                              </div>
                           </div>
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
                                 <strong>Đổi mật khẩu</strong>
                                 <Image
                                    style={{ opacity: '1' }}
                                    src='https://img.icons8.com/fluent/32/000000/unlock-2.png'
                                 />
                              </p>
                           ) : (
                              <p className='mb-0' style={{ opacity: '0.7' }}>
                                 Đổi mật khẩu
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
                                    <strong>Mật khẩu mới</strong>
                                 </Form.Label>
                                 {state === true ? (
                                    <>
                                       <Form.Control
                                          className='border-1 border-grey rounded-pill '
                                          type='password'
                                          placeholder='Nhập mật khẩu mới'
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
                                       placeholder='Nhập mật khẩu mới'
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
                                    <strong>Nhập lại mật khẩu</strong>
                                 </Form.Label>
                                 {state === true ? (
                                    <>
                                       <Form.Control
                                          className='border-1 border-grey rounded-pill'
                                          type='password'
                                          placeholder='Nhập lại mật khẩu'
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
                                       placeholder='Nhập lại mật khẩu'
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
                        <div className='d-flex justify-content-center'>
                           <Button
                              type='submit'
                              variant='outline-light'
                              className='rounded-pill btn_color_created'
                              style={{
                                 fontSize: '1rem',
                                 letterSpacing: '0.25rem',
                                 width: '10rem',
                              }}
                           >
                              Lưu
                           </Button>
                        </div>
                        <ToastContainer />
                     </Form>
                  </Col>
               </Row>
            </div>
         )}
         <Footer />
      </>
   )
}

export default ProfileScreen
