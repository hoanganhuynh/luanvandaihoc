import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from 'react-spinners/ClipLoader'
import {
   getCategoryDetails,
   listCategoriesAdm,
   updateCategory,
} from '../../actions/categoryAction'
import Message from '../../components/Message'
import MessageSuccess from '../../components/MessageSuccess'
import { CATEGORY_UPDATE_RESET } from '../../constants/categoriesConstants'
import SideBar from './components/SideBar'
import Header from './components/Header'
import {
   getSubCategoryDetails,
   updateSubCategory,
} from '../../actions/subCategoryAction'
import SkeletonEffect from '../../components/SkeletonEffect'

const SubCategoryEditScreen = ({ match, history }) => {
   const subId = match.params.id

   const [name, setName] = useState('')
   const [selectCategory, setSelectCategory] = useState('')

   const dispatch = useDispatch()

   const subCategoryDetails = useSelector((state) => state.subCategoryDetails)
   const { loading, error, subcat } = subCategoryDetails

   const subCategoryUpdate = useSelector((state) => state.subCategoryUpdate)
   const {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
   } = subCategoryUpdate

   const categoriesListAdm = useSelector((state) => state.categoriesListAdm)
   const { category } = categoriesListAdm

   const submitHandler = (e) => {
      e.preventDefault()
      dispatch(updateSubCategory({ _id: subId, name, selectCategory }))
   }

   useEffect(() => {
      if (successUpdate) {
         dispatch({ type: CATEGORY_UPDATE_RESET })
         history.push('/admin/subcategorieslist')
      } else {
         if (!subcat.name || subcat._id !== subId) {
            dispatch(getSubCategoryDetails(subId))
            dispatch(listCategoriesAdm())
         } else {
            setName(subcat.name)
            setSelectCategory(subcat.category)
         }
      }
   }, [dispatch, history, subId, subcat, successUpdate])

   return (
      <>
         <Header />
         <Row style={{ backgroundColor: '#fafafa' }}>
            <Col md={2} className='p-0'>
               <SideBar />
            </Col>
            <Col md={10} className='pl-0 mt-3'>
               {loadingUpdate && (
                  <MessageSuccess variant='Ch???nh s???a th??nh c??ng'></MessageSuccess>
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
                              Ch???nh s???a danh m???c con
                           </h2>
                           <Form.Group>
                              <Container>
                                 <Form.Label
                                    as='p'
                                    className='mb-1'
                                    style={{ fontSize: '1rem' }}
                                 >
                                    T??n danh m???c con
                                 </Form.Label>
                                 <Form.Control
                                    className='border border-grey rounded-pill'
                                    type='name'
                                    size='normal'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                 ></Form.Control>
                                 <Form.Group>
                                    <Form.Label
                                       as='p'
                                       className='mb-1'
                                       style={{ fontSize: '1rem' }}
                                    >
                                       T??n danh m???c
                                    </Form.Label>
                                    <Form.Control
                                       className='border border-grey rounded-pill'
                                       type='text'
                                       as='select'
                                       size='normal'
                                       placeholder='Enter name'
                                       value={selectCategory}
                                       onChange={(e) =>
                                          setSelectCategory(e.target.value)
                                       }
                                    >
                                       <option>Vui l??ng ch???n danh m???c</option>

                                       {category &&
                                          category?.map((cat, index) => (
                                             <option
                                                key={index}
                                                value={cat._id}
                                             >
                                                {cat.name}
                                             </option>
                                          ))}
                                    </Form.Control>
                                 </Form.Group>
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
                                 C???p nh???t
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

export default SubCategoryEditScreen
