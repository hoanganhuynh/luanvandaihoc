import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Image, Row } from 'react-bootstrap'
import Resizer from 'react-image-file-resizer'
import { useDispatch, useSelector } from 'react-redux'
import { listCategoriesAdm } from '../../actions/categoryAction'
import { deleteFileImages, uploadFileImages } from '../../actions/cloudinary'
import { createProduct, newProduct } from '../../actions/productActions'
import { listSupplierAdm } from '../../actions/supplierActions'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import MessageSuccess from '../../components/MessageSuccess'
import { PRODUCT_CREATE_RESET } from '../../constants/productConstants'
import Header from './components/Header'
import SideBar from './components/SideBar'
import { CloseOutlined } from '@ant-design/icons'
import { listSubCategoryAdm } from '../../actions/subCategoryAction'
import SkeletonEffect from '../../components/SkeletonEffect'

function formatPrice(n, currency) {
   return n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + currency
}

const ProductCreateScreen = () => {
   const [name, setName] = useState('')
   const [price, setPrice] = useState(0)
   const [images, setImages] = useState([])
   const [brand, setBrand] = useState('')
   const [categoryy, setCategory] = useState('')
   const [subCategoryy, setSubCategory] = useState('')
   const [countInStock, setCountInStock] = useState(0)
   const [description, setDescription] = useState('')
   const [mass, setMass] = useState('')

   const [supplierr, setSupplier] = useState('')
   const [uploading, setUploading] = useState(false)
   const [imagesPreview, setImagesPreview] = useState([])

   const uploadFile = (e) => {
      let files = e.target.files
      let allImages = []
      let preview = []
      if (files) {
         for (let i = 0; i < files.length; i++) {
            preview.push(files[i].name)
            Resizer.imageFileResizer(
               files[i],
               720,
               720,
               'JPEG',
               100,
               0,
               (uri) => {
                  try {
                     uploadFileImages({ image: uri }).then((res) => {
                        allImages.push(res.data)
                        setImages(allImages)
                     })
                  } catch (error) {
                     setUploading(false)
                  }
               }
            )
         }
         console.log(allImages)
      }
   }

   // const deleteFile = (e) => {
   //    dispatch(deleteFileImages(e))
   // }

   const dispatch = useDispatch()

   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin

   const productCreate = useSelector((state) => state.productCreate)
   const {
      loading: loadingCreate,
      error: errorCreate,
      success: successCreate,
   } = productCreate

   const categoriesList = useSelector((state) => state.categoriesList)
   const { category } = categoriesList

   const subCategoryList = useSelector((state) => state.subCategoryList)
   const { Sub } = subCategoryList

   const supplierListAdm = useSelector((state) => state.supplierListAdm)
   const { supplier } = supplierListAdm

   const submitHandler = (e) => {
      e.preventDefault()

      dispatch(
         createProduct({
            name,
            price,
            description,
            categoryy,
            supplierr,
            countInStock,
            mass,
            brand,
            images,
            subCategoryy,
         })
      )
   }

   useEffect(() => {
      if (successCreate) {
         dispatch({ type: PRODUCT_CREATE_RESET })
      } else {
         if (userInfo) {
            dispatch(listCategoriesAdm())
            dispatch(listSubCategoryAdm())
            dispatch(listSupplierAdm())
         }
      }
   }, [dispatch, userInfo, successCreate])
   return (
      <>
         <Header />
         <Row style={{ backgroundColor: '#fafafa' }}>
            <Col md={2} className='p-0 '>
               <SideBar />
            </Col>
            <Col md={10} className='pl-0 pr-4 '>
               <>
                  {/* {loadingCreate && (
            <Announcement variant='success'> Thêm thành công</Announcement>
          ) && <Loader />}
        {errorCreate && <Announcement>{errorCreate}</Announcement>} */}
                  {loadingCreate && (
                     <MessageSuccess variant='Thêm thành công'></MessageSuccess>
                  )}
                  {loadingCreate ? (
                     <SkeletonEffect />
                  ) : errorCreate ? (
                     <Message>{errorCreate}</Message>
                  ) : (
                     <>
                        <Form
                           onSubmit={submitHandler}
                           className='bg-light border-0 pt-3 pb-3'
                           fluid
                        >
                           <h2 className='text-center mb-4'>Thêm sản phẩm</h2>

                           <Form.Group controlId='name' className='pl-3 pr-3'>
                              <Form.Label as='p' className='mb-1'>
                                 Tên sản phẩm
                              </Form.Label>
                              <Form.Control
                                 className='border border-grey rounded-pill'
                                 type='name'
                                 placeholder='Nhập tên sản phẩm'
                                 value={name}
                                 onChange={(e) => setName(e.target.value)}
                              ></Form.Control>
                           </Form.Group>

                           <Form.Group controlId='image' className='pl-3 pr-3'>
                              <Form.Label as='p' className='mb-1'>
                                 Ảnh
                              </Form.Label>

                              <Row>
                                 <Col
                                    md={6}
                                    className='align-items-center d-flex'
                                 >
                                    <Form.File
                                       className='border border-grey'
                                       id='image-file'
                                       label='Choose File'
                                       custom
                                       onChange={uploadFile}
                                       multiple
                                    ></Form.File>
                                 </Col>
                                 <Col md={6}>
                                    <Row>
                                       {images &&
                                          images.map((img) => (
                                             <Col md={3}>
                                                <div>
                                                   <Button
                                                      className=''
                                                      style={{
                                                         // marginBottom: '-35%',
                                                         zIndex: '5',
                                                         color: 'black',
                                                      }}
                                                      size='sm'
                                                      variant='outline-light'
                                                      // onClick={deleteFile(
                                                      //    images.public_id
                                                      // )}
                                                   >
                                                      <CloseOutlined
                                                         style={{
                                                            fontSize: '1rem',
                                                         }}
                                                      />
                                                   </Button>

                                                   <Image
                                                      src={img.url}
                                                      className='rounded avatar_img'
                                                      fluid
                                                   />
                                                </div>
                                             </Col>
                                          ))}
                                    </Row>
                                 </Col>
                              </Row>
                              {uploading && <SkeletonEffect />}
                           </Form.Group>

                           <Row>
                              {/* <Col md={3}>
                                 <Form.Group
                                    controlId='brand'
                                    className='pl-3 pr-3'
                                 >
                                    <Form.Label
                                       as='p'
                                       className='mb-1 text-center'
                                    >
                                       Thể loại
                                    </Form.Label>
                                    <Form.Control
                                       className='border border-grey rounded-pill'
                                       type='text'
                                       placeholder='Enter brand'
                                       value={brand}
                                       onChange={(e) =>
                                          setBrand(e.target.value)
                                       }
                                    ></Form.Control>
                                 </Form.Group>
                              </Col> */}
                              <Col md={4}>
                                 <Form.Group
                                    controlId='countInStock'
                                    className='pl-3 pr-3'
                                 >
                                    <Form.Label
                                       as='p'
                                       className='mb-1 text-center'
                                    >
                                       Số lượng trong kho
                                    </Form.Label>
                                    <Form.Control
                                       className='border border-grey rounded-pill text-center'
                                       type='number'
                                       placeholder='Enter countInStock'
                                       value={countInStock}
                                       onChange={(e) =>
                                          setCountInStock(e.target.value)
                                       }
                                    ></Form.Control>
                                 </Form.Group>
                              </Col>
                              <Col md={4}>
                                 <Form.Group
                                    controlId='category'
                                    className='pl-3 pr-3'
                                 >
                                    <Form.Label
                                       as='p'
                                       className='mb-1 text-center'
                                    >
                                       Danh mục
                                    </Form.Label>
                                    <Form.Control
                                       className='border border-grey rounded-pill '
                                       type='text'
                                       as='select'
                                       placeholder='Enter category'
                                       value={categoryy}
                                       onChange={(e) =>
                                          setCategory(e.target.value)
                                       }
                                    >
                                       <option></option>
                                       {category &&
                                          category.map((cat, index) => (
                                             <option
                                                style={{ color: 'black' }}
                                                key={index}
                                                value={cat._id}
                                             >
                                                {cat.name}
                                             </option>
                                          ))}
                                    </Form.Control>
                                 </Form.Group>
                              </Col>
                              <Col md={4}>
                                 <Form.Group
                                    controlId='price'
                                    className='pl-3 pr-3'
                                 >
                                    <Form.Label
                                       as='p'
                                       className='mb-1 text-center'
                                    >
                                       Giá
                                    </Form.Label>
                                    <Form.Control
                                       className='border border-grey rounded-pill text-center'
                                       type='number'
                                       placeholder='Enter price'
                                       value={price}
                                       onChange={(e) =>
                                          setPrice(e.target.value)
                                       }
                                    ></Form.Control>
                                 </Form.Group>
                              </Col>
                           </Row>

                           <Row>
                              <Col md={4}>
                                 <Form.Group
                                    controlId='category'
                                    className='pl-3 pr-3'
                                 >
                                    <Form.Label
                                       as='p'
                                       className='mb-1 text-center'
                                    >
                                       Danh mục con
                                    </Form.Label>
                                    <Form.Control
                                       className='border border-grey rounded-pill '
                                       type='text'
                                       as='select'
                                       placeholder='Enter category'
                                       value={subCategoryy}
                                       onChange={(e) =>
                                          setSubCategory(e.target.value)
                                       }
                                    >
                                       <option></option>
                                       {Sub &&
                                          Sub.map((cat, index) => (
                                             <option
                                                style={{ color: 'black' }}
                                                key={index}
                                                value={cat._id}
                                             >
                                                {cat.name}
                                             </option>
                                          ))}
                                    </Form.Control>
                                 </Form.Group>
                              </Col>
                              <Col md={4}>
                                 <Form.Group
                                    controlId='countInStock'
                                    className='pl-3 pr-3'
                                 >
                                    <Form.Label
                                       as='p'
                                       className='mb-1 text-center'
                                    >
                                       Chiều Cao
                                    </Form.Label>
                                    <Form.Control
                                       className='border border-grey rounded-pill text-center'
                                       type='text'
                                       placeholder='Nhập chiều cao cm'
                                       value={mass}
                                       onChange={(e) => setMass(e.target.value)}
                                    ></Form.Control>
                                 </Form.Group>
                              </Col>
                              <Col md={4}>
                                 <Form.Group
                                    controlId='category'
                                    className='pl-3 pr-3'
                                 >
                                    <Form.Label
                                       as='p'
                                       className='mb-1 text-center'
                                    >
                                       Nhà cung cấp
                                    </Form.Label>
                                    <Form.Control
                                       className='border border-grey rounded-pill '
                                       type='text'
                                       as='select'
                                       placeholder='Enter category'
                                       value={supplierr}
                                       onChange={(e) =>
                                          setSupplier(e.target.value)
                                       }
                                    >
                                       <option></option>
                                       {supplier &&
                                          supplier.map((cat, index) => (
                                             <option
                                                style={{ color: 'black' }}
                                                key={index}
                                                value={cat._id}
                                             >
                                                {cat.name}
                                             </option>
                                          ))}
                                    </Form.Control>
                                 </Form.Group>
                              </Col>
                           </Row>

                           <Form.Group
                              controlId='description'
                              className='pl-3 pr-3'
                           >
                              <Form.Label as='p' className='mb-1 ml-5'>
                                 Nội dung
                              </Form.Label>
                              <Form.Control
                                 className='border border-grey rounded-pill'
                                 type='text'
                                 rows={3}
                                 as='textarea'
                                 placeholder='Enter description'
                                 value={description}
                                 onChange={(e) =>
                                    setDescription(e.target.value)
                                 }
                              ></Form.Control>
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
                                 Tạo
                              </Button>
                           </div>
                        </Form>
                     </>
                  )}
               </>
            </Col>
         </Row>
      </>
   )
}

export default ProductCreateScreen
