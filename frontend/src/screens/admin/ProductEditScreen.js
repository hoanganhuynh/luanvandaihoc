import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listCategoriesAdm } from '../../actions/categoryAction'
import { listSupplierAdm } from '../../actions/supplierActions'
import { listSubCategory } from '../../actions/subCategoryAction'
import { listProductDetails, updateProduct } from '../../actions/productActions'
import SkeletonEffect from '../../components/SkeletonEffect'
import Message from '../../components/Message'
import MessageSuccess from '../../components/MessageSuccess'
import { PRODUCT_UPDATE_RESET } from '../../constants/productConstants'
import SideBar from './components/SideBar'
import Header from './components/Header'
import Resizer from 'react-image-file-resizer'
import { CloseOutlined } from '@ant-design/icons'
import { deleteFileImages, uploadFileImages } from '../../actions/cloudinary'

function ProductEditScreen({ match, history }) {
   const productId = match.params.id

   const [name, setName] = useState('')
   const [price, setPrice] = useState(0)
   const [images, setImages] = useState([])
   // const [brand, setBrand] = useState('')
   const [categoryy, setCategory] = useState('')
   const [subCategoryy, setSubCategory] = useState('')
   const [countInStock, setCountInStock] = useState(0)
   const [description, setDescription] = useState('')
   const [mass, setMass] = useState('')
   const [supplierr, setSupplier] = useState('')
   const [uploading, setUploading] = useState(false)
   const [oldImg, setOldImg] = useState([])

   

   const dispatch = useDispatch()

   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin

   const productDetails = useSelector((state) => state.productDetails)
   const { loading, error, product } = productDetails


   const categoriesList = useSelector((state) => state.categoriesList)
   const { category } = categoriesList
   
   const subCategoryList = useSelector((state) => state.subCategoryList)
   const { Sub } = subCategoryList
   

   const productUpdate = useSelector((state) => state.productUpdate)
   const {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
   } = productUpdate


   const supplierListAdm = useSelector((state) => state.supplierListAdm)
   const { supplier } = supplierListAdm

   console.log('oldimg', oldImg)
   console.log('product', product)

   const submitHandler = (e) => {
      e.preventDefault()
      //UPDATE PRODUCT
      dispatch(
         updateProduct({
            _id: productId,
            name,
            price,
            description,
            categoryy,
            supplierr,
            countInStock,
            mass,
            images,
            subCategoryy,
         })
      )
   }

   const uploadFile = (e) => {
      let files = e.target.files
      let allImages = []
      let preview = []
      setOldImg([])
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

   useEffect(() => {
      
      if (successUpdate) {
         dispatch({ type: PRODUCT_UPDATE_RESET })
         history.push('/admin/productlist')
      } else {
         if (!product.name || product._id !== productId) {
            if (userInfo) {
               dispatch(listProductDetails(productId))
               dispatch(listCategoriesAdm())
               dispatch(listSubCategory())
               dispatch(listSupplierAdm())
            }
         } else {
            setName(product.name)
            setPrice(product.price)
            // setImages(product.image)
            // setBrand(product.brand)
            setCategory(product.category)
            setSubCategory(product.subCategory)
            setCountInStock(product.countInStock)
            setDescription(product.description)
            setMass(product.mass)
            setSupplier(product.supplier)
            images?.length > 0 ? setOldImg([]) : setOldImg(product.images)
         }
      }
   }, [dispatch, userInfo, history, productId, product, successUpdate])

   return (
      <>
         <Header />
         <Row style={{ backgroundColor: '#fafafa' }}>
            <Col md={2} className='p-0'>
               <SideBar />
            </Col>
            <Col md={10} className='pl-0 mt-3'>
               <Container>
                  {loadingUpdate && (
                        <MessageSuccess variant='Đã cập nhật thành công'></MessageSuccess>
                     ) && <SkeletonEffect />}
                  {errorUpdate && <Message>{errorUpdate}</Message>}
                  {loading ? (
                     <SkeletonEffect />
                  ) : error ? (
                     <Message>{error}</Message>
                  ) : (
                     <>
                        <Form
                           onSubmit={submitHandler}
                           className='bg-light border-0 pt-3 pb-3'
                           fluid
                        >
                           <h2 className='text-center mb-4'>
                              Chỉnh sửa thông tin sản phẩm
                           </h2>

                           <Form.Group controlId='name' className='pl-3 pr-3'>
                              <Form.Label as='p' className='mb-1'>
                                 Tên sản phẩm
                              </Form.Label>
                              <Form.Control
                                 className='border border-grey rounded-pill'
                                 type='name'
                                 placeholder='Enter name'
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
                                       {oldImg &&
                                          oldImg.map((img) => (
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
                                       <option>Vui lòng chọn</option>
                                       {Sub &&
                                          Sub?.map((cat, index) => (
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
                                       Khối lượng
                                    </Form.Label>
                                    <Form.Control
                                       className='border border-grey rounded-pill text-center'
                                       type='text'
                                       placeholder='Enter countInStock'
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
                                 Lưu
                              </Button>
                           </div>
                        </Form>
                     </>
                  )}
               </Container>
            </Col>
         </Row>
      </>
   )
}

export default ProductEditScreen
