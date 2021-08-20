import DateFnsUtils from '@date-io/date-fns'
import Grid from '@material-ui/core/Grid'
import {
   KeyboardDatePicker,
   MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getCodeDetails } from '../../actions/codeAction'
import { updateSale } from '../../actions/saleAction'
import Message from '../../components/Message'
import MessageSuccess from '../../components/MessageSuccess'
import Loader from '../../components/Loader'
import { CODE_UPDATE_RESET } from '../../constants/codeConstants'
import Header from './components/Header'
import SideBar from './components/SideBar'
import SkeletonEffect from '../../components/SkeletonEffect'

const CodeEditScreen = ({ match, history }) => {
   const catId = match.params.id

   const [name, setName] = useState('')
   const [discount, setDiscount] = useState('')
   const [selectedDate, setSelectedDate] = useState(
      new Date('2021-03-22T21:11:54')
   )

   const handleDateChange = (date) => {
      setSelectedDate(date)
   }

   const dispatch = useDispatch()

   const codeDetails = useSelector((state) => state.codeDetails)
   const { loading, error, code } = codeDetails

   const codeUpdate = useSelector((state) => state.codeUpdate)
   const {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
   } = codeUpdate

   const submitHandler = (e) => {
      e.preventDefault()
      dispatch(
         updateSale({
            _id: catId,
            name: name,
            discount: discount,
            date: selectedDate,
         })
      )
   }

   useEffect(() => {
      if (successUpdate) {
         dispatch({ type: CODE_UPDATE_RESET })
         history.push('/admin/salelist')
      } else {
         if (!code.name || code._id !== catId) {
            dispatch(getCodeDetails(catId))
         } else {
            setName(code.name)
            setDiscount(code.discount)
            setSelectedDate(code.date)
         }
      }
   }, [dispatch, history, catId, code, successUpdate])

   return (
      <>
         <Header />
         <Row style={{ backgroundColor: '#b68973' }}>
            <Col md={2} className='p-0'>
               <SideBar />
            </Col>
            <Col md={10} className='pl-0 mt-3'>
               {loadingUpdate && (
                  <MessageSuccess variant='Chỉnh sửa thành công'></MessageSuccess>
               )}
               {errorUpdate && <Message>{errorUpdate}</Message>}
               {loading ? (
                  <SkeletonEffect />
               ) : (
                  <Row className='justify-content-center'>
                     <Col md={6}>
                        <Form
                           onSubmit={submitHandler}
                           className='p-4 bg-light shadow card_color'
                           fluid
                        >
                           <h2 className='text-center mb-4'>
                              Chỉnh sửa mã giảm giá
                           </h2>
                           <Form.Group>
                              <Form.Label as='p' className='mb-1'>
                                 Mã giảm giá
                              </Form.Label>
                              <Form.Control
                                 className='border border-grey rounded-pill'
                                 type='name'
                                 size='normal'
                                 placeholder='Mã giảm giá'
                                 value={name}
                                 onChange={(e) => setName(e.target.value)}
                              ></Form.Control>
                           </Form.Group>
                           <Form.Group>
                              <Form.Label as='p' className='mb-1'>
                                 Số tiền giảm giá
                              </Form.Label>
                              <Form.Control
                                 className='border border-grey rounded-pill'
                                 type='number'
                                 size='normal'
                                 placeholder='Số tiền giảm giá'
                                 value={discount}
                                 onChange={(e) => setDiscount(e.target.value)}
                              ></Form.Control>
                           </Form.Group>
                           <Form.Group>
                              <Form.Label as='p' className='mb-1'>
                                 Ngày hết hạn
                              </Form.Label>
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
                           </Form.Group>
                           <div className='pl-3 pr-3 text-center'>
                              <Button
                                 type='submit'
                                 variant='outline-light'
                                 className='rounded-pill btn_color_created'
                                 style={{
                                    fontSize: '1rem',
                                    letterSpacing: '0.25rem',
                                    width: '20rem',
                                 }}
                              >
                                 Cập nhật
                              </Button>
                           </div>
                        </Form>
                     </Col>
                  </Row>
               )}
            </Col>
         </Row>
      </>
   )
}

export default CodeEditScreen
