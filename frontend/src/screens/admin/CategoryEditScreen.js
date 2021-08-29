import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from 'react-spinners/ClipLoader'
import {
   getCategoryDetails,
   updateCategory,
} from '../../actions/categoryAction'
import Message from '../../components/Message'
import MessageSuccess from '../../components/MessageSuccess'
import { CATEGORY_UPDATE_RESET } from '../../constants/categoriesConstants'
import SideBar from './components/SideBar'
import Header from './components/Header'
import SkeletonEffect from '../../components/SkeletonEffect'

const CategoryEditScreen = ({ match, history }) => {
   const catId = match.params.id

   const [name, setName] = useState('')

   const dispatch = useDispatch()

   const categoryDetails = useSelector((state) => state.categoryDetails)
   const { loading, error, category } = categoryDetails

   const categoryUpdate = useSelector((state) => state.categoryUpdate)
   const {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
   } = categoryUpdate

   const submitHandler = (e) => {
      e.preventDefault()
      dispatch(updateCategory({ _id: catId, name }))
   }

   useEffect(() => {
      if (successUpdate) {
         dispatch({ type: CATEGORY_UPDATE_RESET })
         history.push('/admin/categorieslist')
      } else {
         if (!category.name || category._id !== catId) {
            dispatch(getCategoryDetails(catId))
         } else {
            setName(category.name)
         }
      }
   }, [dispatch, history, catId, category, successUpdate])

   return (
      <>
         <Header />
         <Row style={{ backgroundColor: '#fafafa' }}>
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
                              Chỉnh sửa danh mục
                           </h2>
                           <Form.Group>
                              <Container>
                                 <Form.Label
                                    as='p'
                                    className='mb-1'
                                    style={{ fontSize: '1.5rem' }}
                                 >
                                    Tên danh mục
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

export default CategoryEditScreen
