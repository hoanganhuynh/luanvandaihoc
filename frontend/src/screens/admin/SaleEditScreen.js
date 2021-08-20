import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from 'react-spinners/ClipLoader'
import {
   getCategoryDetails,
   updateCategory,
} from '../../actions/categoryAction'
import Message from '../../components/Message'
import SkeletonEffect from '../../components/SkeletonEffect'
import MessageSuccess from '../../components/MessageSuccess'
import { CATEGORY_UPDATE_RESET } from '../../constants/categoriesConstants'
import SideBar from './components/SideBar'
import Header from './components/Header'
import { getSaleDetails, updateSale } from '../../actions/saleAction'

const SaleEditScreen = ({ match, history }) => {
   const catId = match.params.id

   const [name, setName] = useState('')

   const dispatch = useDispatch()

   const saleDetails = useSelector((state) => state.saleDetails)
   const { loading, error, sale } = saleDetails

   const saleUpdate = useSelector((state) => state.saleUpdate)
   const {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
   } = saleUpdate

   const submitHandler = (e) => {
      e.preventDefault()
      dispatch(updateSale({ _id: catId, name }))
   }

   useEffect(() => {
      if (successUpdate) {
         dispatch({ type: CATEGORY_UPDATE_RESET })
         history.push('/admin/salelist')
      } else {
         if (!sale.name || sale._id !== catId) {
            dispatch(getSaleDetails(catId))
         } else {
            setName(sale.name)
         }
      }
   }, [dispatch, history, catId, sale, successUpdate])

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
                              Chỉnh sửa mục giảm giá
                           </h2>
                           <Form.Group>
                              <Container>
                                 <Form.Label
                                    as='p'
                                    className='mb-1'
                                    style={{ fontSize: '1.5rem' }}
                                 >
                                    Giá trị
                                 </Form.Label>
                                 <Form.Control
                                    style={{ fontSize: '1.2rem' }}
                                    className='border border-grey rounded-pill'
                                    type='name'
                                    size='normal'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                 ></Form.Control>
                              </Container>
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

export default SaleEditScreen
